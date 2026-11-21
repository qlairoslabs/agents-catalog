// sign/check-index.ts
// Checks a written index.json with the build's own index validator before it is
// signed, and that it names the given parts commit.
//
//   bun sign/check-index.ts <dir> <parts-commit>

import { join } from "node:path";
import { validateIndexBytes } from "../validate";

const [dir, commit] = process.argv.slice(2);
if (!dir || !commit || !/^[0-9a-f]{40}$/.test(commit)) { console.error("usage: bun sign/check-index.ts <dir> <parts-commit>"); process.exit(2); }
const bytes = new Uint8Array(await Bun.file(join(dir, "index.json")).arrayBuffer());
const index = validateIndexBytes(bytes) as any;
if (index?.commit !== commit) { console.error(`index names commit ${index?.commit}, expected ${commit}`); process.exit(1); }
console.log(`index valid: sequence ${index.sequence}, commit ${commit}`);
