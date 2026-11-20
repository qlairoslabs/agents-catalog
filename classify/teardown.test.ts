// Needs podman and the classification image; skipped when either is missing.
import { expect, test } from "bun:test";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { DEFAULT_OPTIONS, removeContainer } from "./model";

const podman = !!Bun.which("podman")
    && Bun.spawnSync(["podman", "image", "exists", DEFAULT_OPTIONS.image]).exitCode === 0;
const exists = (name: string) => Bun.spawnSync(["podman", "container", "exists", name]).exitCode === 0;

async function until(check: () => boolean, ms: number): Promise<boolean> {
    const end = Date.now() + ms;
    while (Date.now() < end) { if (check()) return true; await Bun.sleep(200); }
    return check();
}

function relayed(name: string) {
    // A container that ignores SIGTERM and keeps working after stdin closes.
    return Bun.spawn([process.execPath, join(import.meta.dir, "acp-relay.ts"),
        "podman", "run", "--rm", "-i", "--pull=never", "--network=none", "--name", name, "--entrypoint", "sh",
        DEFAULT_OPTIONS.image, "-c", "trap '' TERM; while true; do sleep 1; done"], { stdin: "pipe", stdout: "pipe", stderr: "ignore" });
}

test.skipIf(!podman)("SIGTERM to the relay removes its container", async () => {
    const name = `classify-test-${randomUUID()}`;
    const relay = relayed(name);
    try {
        expect(await until(() => exists(name), 30_000)).toBe(true);
        relay.kill("SIGTERM");
        await relay.exited;
        expect(await until(() => !exists(name), 10_000)).toBe(true);
    } finally { Bun.spawnSync(["podman", "rm", "-f", "-t", "0", name]); }
}, 60_000);

test.skipIf(!podman)("closing the client's side ends the run and removes the container", async () => {
    const name = `classify-test-${randomUUID()}`;
    const relay = relayed(name);
    try {
        expect(await until(() => exists(name), 30_000)).toBe(true);
        relay.stdin.end();
        await relay.exited;
        expect(await until(() => !exists(name), 10_000)).toBe(true);
    } finally { Bun.spawnSync(["podman", "rm", "-f", "-t", "0", name]); }
}, 60_000);

test.skipIf(!podman)("after SIGKILL to the relay, removeContainer still removes it and confirms", async () => {
    const name = `classify-test-${randomUUID()}`;
    const relay = relayed(name);
    try {
        expect(await until(() => exists(name), 30_000)).toBe(true);
        relay.kill("SIGKILL");
        await relay.exited;
        await removeContainer(name);
        expect(exists(name)).toBe(false);
    } finally { Bun.spawnSync(["podman", "rm", "-f", "-t", "0", name]); }
}, 60_000);
