#!/usr/bin/env bash
# ops/weekly-run.sh: the weekly catalogue build, end to end (PROCESS.md, "Running the
# weekly build"). Portable: everything machine-specific is a setting below, so the same
# script runs on a maintainer's machine under a timer or in a CI job.
#
# Steps: update the checkout, isolation canary, build, label new listings, classify
# new or changed tools, rebuild with the labels, safety verdict, record labels on main,
# release the build to `weekly-build`, dispatch `publish`. Any failed step or a
# "do not publish" verdict stops the run; the last signed catalogue stays live.
set -euo pipefail

# ---- settings (environment) ------------------------------------------------------
: "${CATALOG_CHECKOUT:?a git checkout of agents-catalog, on main}"
: "${CATALOG_CACHE:?a directory kept between runs (crawl checkpoints, signal cache, evidence)}"
: "${CATALOG_WORK:?a directory for the outputs and logs of each run}"
CATALOG_GITHUB_REPO="${CATALOG_GITHUB_REPO:-qlairoslabs/agents-catalog}"
CATALOG_PREVIOUS_INDEX="${CATALOG_PREVIOUS_INDEX:-https://raw.githubusercontent.com/$CATALOG_GITHUB_REPO/published/index.json}"
CATALOG_PUBLISH="${CATALOG_PUBLISH:-1}"            # 0: build and release, but do not dispatch publish
CATALOG_MAX_DROP_FRACTION="${CATALOG_MAX_DROP_FRACTION:-0.05}"
CLASSIFY_LABEL_MODEL="${CLASSIFY_LABEL_MODEL:-haiku}"
CLASSIFY_RECHECK_MODEL="${CLASSIFY_RECHECK_MODEL:-sonnet}"
CLASSIFY_EFFECTS_MODEL="${CLASSIFY_EFFECTS_MODEL:-sonnet}"
export CLASSIFY_IMAGE="${CLASSIFY_IMAGE:-}"       # the classification container image (classify/model.ts)
[ -n "$CLASSIFY_IMAGE" ] || unset CLASSIFY_IMAGE

# The identity of the commits the job makes (labels on main, the release branch).
export GIT_AUTHOR_NAME="${CATALOG_GIT_NAME:-agents-catalog weekly}" GIT_COMMITTER_NAME="${CATALOG_GIT_NAME:-agents-catalog weekly}"
export GIT_AUTHOR_EMAIL="${CATALOG_GIT_EMAIL:-weekly@users.noreply.github.com}" GIT_COMMITTER_EMAIL="${CATALOG_GIT_EMAIL:-weekly@users.noreply.github.com}"

RUN_ID="${CATALOG_RUN_ID:-$(date -u +%Y-%m-%d)}"
RUN="$CATALOG_WORK/$RUN_ID"
mkdir -p "$RUN" "$CATALOG_CACHE"
exec > >(tee -a "$RUN/run.log") 2>&1
step() { echo; echo "== $(date -u +%H:%M:%S) $*"; }
fail() { echo "STOPPED: $*"; echo "stopped" > "$RUN/result"; exit 1; }

# One run at a time.
exec 9>"$CATALOG_WORK/.lock"
flock -n 9 || fail "another run holds $CATALOG_WORK/.lock"

verdict_ok() { bun -e 'const v = await Bun.file(process.argv[1]).json(); if (v.publish !== true) { console.log("verdict:", JSON.stringify(v.reasons ?? v)); process.exit(1); }' "$1"; }

cd "$CATALOG_CHECKOUT"

step "update the checkout"
git fetch -q origin
git checkout -q main
git merge -q --ff-only origin/main || fail "local main has diverged from origin/main"
bun install --frozen-lockfile >/dev/null

step "isolation canary"
bun classify/canary.ts || fail "the canary did not pass; nothing is classified"

# A restarted run reuses a finished pre-labeling build only if its verdict allowed
# publishing; otherwise that output is set aside and built again in a fresh folder.
# The build refuses an existing output folder, so every build gets a new one.
fresh() { local base="$1" n=1; while [ -e "$base.$n" ]; do n=$((n + 1)); done; echo "$base.$n"; }

step "build, before labeling"
if [ -d "$RUN/untagged" ] && [ -f "$RUN/verdict-untagged.json" ] && verdict_ok "$RUN/verdict-untagged.json" >/dev/null 2>&1; then
    echo "reusing the finished build in $RUN/untagged"
else
    [ -e "$RUN/untagged" ] && mv "$RUN/untagged" "$(fresh "$RUN/untagged.failed")"
    [ -e "$RUN/verdict-untagged.json" ] && mv "$RUN/verdict-untagged.json" "$(fresh "$RUN/verdict-untagged.failed")"
    bun weekly.ts build --cache "$CATALOG_CACHE" --run-id "$RUN_ID" --output "$RUN/untagged" \
        --previous-index "$CATALOG_PREVIOUS_INDEX" --verdict "$RUN/verdict-untagged.json" \
        --classification-added facets/classification-added.json --tags tags \
        --max-drop-fraction "$CATALOG_MAX_DROP_FRACTION"
    verdict_ok "$RUN/verdict-untagged.json" || fail "the build's safety verdict refused it"
fi

step "label new listings"
bun weekly.ts needs-labels --parts "$RUN/untagged" --classification-added facets/classification-added.json > "$RUN/needs-labels.jsonl"
echo "$(wc -l < "$RUN/needs-labels.jsonl") listings to label"
if [ -s "$RUN/needs-labels.jsonl" ]; then
    bun classify/label.ts "$RUN/needs-labels.jsonl" --model="$CLASSIFY_LABEL_MODEL" --recheck="$CLASSIFY_RECHECK_MODEL" \
        || echo "some listings could not be labeled; they publish as Unclassified and are tried next week"
fi

step "classify new or changed tools"
bun classify/run.ts "$RUN/untagged" --model="$CLASSIFY_EFFECTS_MODEL" \
    || echo "some entries could not be classified; their tools count as able to change things until next week"

step "build, with the labels"
TAGGED="$(fresh "$RUN/tagged")"; VERDICT="$TAGGED.verdict.json"
bun weekly.ts build --cache "$CATALOG_CACHE" --run-id "$RUN_ID" --output "$TAGGED" \
    --previous-index "$CATALOG_PREVIOUS_INDEX" --verdict "$VERDICT" \
    --classification-added facets/classification-added.json --tags tags \
    --max-drop-fraction "$CATALOG_MAX_DROP_FRACTION"
verdict_ok "$VERDICT" || fail "the labeled build's safety verdict refused it"
bun build.ts validate "$TAGGED" || fail "validation failed"

step "record this week's labels on main"
git add tags facets/classification-added.json
if ! git diff --cached --quiet; then
    git commit -q -m "Weekly labels, run $RUN_ID"
    git push -q origin HEAD:main || { git pull -q --rebase origin main && git push -q origin HEAD:main; } \
        || fail "could not record the labels on main"
fi

step "release the build"
SHA="$(bun weekly.ts release --parts "$TAGGED" --verdict "$VERDICT" --remote origin --branch weekly-build | tail -1)"
[[ "$SHA" =~ ^[0-9a-f]{40}$ ]] || fail "release did not return a commit SHA"
echo "$SHA" > "$RUN/build-sha"

if [ "$CATALOG_PUBLISH" = 1 ]; then
    step "dispatch publish for $SHA"
    gh workflow run publish --repo "$CATALOG_GITHUB_REPO" --ref main -f build="$SHA" || fail "could not dispatch publish"
fi
if [ "$CATALOG_PUBLISH" = 1 ]; then echo "publish-dispatched $SHA" > "$RUN/result"; else echo "released $SHA (publish not dispatched)" > "$RUN/result"; fi
step "done"
