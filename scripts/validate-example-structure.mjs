/**
 * validate-example-structure.mjs — M19.1 (P1)
 * Verifies that each framework example folder has the required files
 * and that package.json declares a valid fikir-css dependency.
 */
import { readFile, access } from "node:fs/promises";
import { resolve, join } from "node:path";

const ROOT = resolve(process.cwd());

const examples = [
  {
    dir: "examples/react-vite",
    required: ["package.json", "src/main.jsx", "src/App.jsx", "index.html", "README.md"],
  },
  {
    dir: "examples/vue-vite",
    required: ["package.json", "src/main.js", "src/App.vue", "index.html", "README.md"],
  },
  {
    dir: "examples/svelte-vite",
    required: ["package.json", "src/main.js", "src/App.svelte", "index.html", "README.md"],
  },
  {
    dir: "examples/starter-consumer",
    required: ["package.json", "index.html", "README.md"],
  },
];

let failed = false;

for (const example of examples) {
  const absDir = resolve(ROOT, example.dir);

  // Check required files exist
  for (const rel of example.required) {
    const abs = join(absDir, rel);
    try {
      await access(abs);
    } catch {
      console.error(`FAIL [${example.dir}]: missing required file: ${rel}`);
      failed = true;
    }
  }

  // Check package.json has fikir-css dependency
  const pkgPath = join(absDir, "package.json");
  try {
    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
    if (!deps["fikir-css"]) {
      console.error(`FAIL [${example.dir}]: package.json does not list fikir-css as a dependency`);
      failed = true;
    }
  } catch {
    // already reported above
  }
}

if (failed) {
  console.error("\nExample structure validation failed.");
  process.exit(1);
} else {
  console.log(`Example structure OK (${examples.length} examples validated)`);
}
