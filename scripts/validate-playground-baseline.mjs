import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const baselineFiles = [
  "playground/screenshots/playground-light.png",
  "playground/screenshots/playground-dark.png",
  "playground/screenshots/sections/supported-foundation-light.png",
  "playground/screenshots/sections/supported-foundation-dark.png",
  "playground/screenshots/sections/supported-forms-light.png",
  "playground/screenshots/sections/supported-forms-dark.png",
  "playground/screenshots/sections/supported-toast-light.png",
  "playground/screenshots/sections/supported-toast-dark.png",
  "playground/screenshots/sections/supported-pagination-table-light.png",
  "playground/screenshots/sections/supported-pagination-table-dark.png",
  "playground/screenshots/sections/supported-data-display-light.png",
  "playground/screenshots/sections/supported-data-display-dark.png"
];

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

async function validatePngFile(relativePath) {
  const filePath = resolve(rootDir, relativePath);
  const fileStat = await stat(filePath);

  if (fileStat.size < 10_000) {
    throw new Error(`${relativePath}: file is unexpectedly small (${fileStat.size} bytes)`);
  }

  const content = await readFile(filePath);
  const signature = content.subarray(0, pngSignature.length);

  if (!signature.equals(pngSignature)) {
    throw new Error(`${relativePath}: invalid PNG signature`);
  }
}

async function main() {
  for (const relativePath of baselineFiles) {
    await validatePngFile(relativePath);
  }

  console.log("playground baseline screenshots are valid");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
