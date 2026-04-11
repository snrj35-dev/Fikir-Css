import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const rootDir = resolve(process.cwd());

async function runNpm(args, cwd) {
  return execFileAsync("npm", args, {
    cwd,
    maxBuffer: 20 * 1024 * 1024
  });
}

test("package smoke install: packed tarball can be installed and contains publishable outputs", async () => {
  const tmpRoot = await mkdtemp(resolve(tmpdir(), "fikir-css-package-smoke-"));

  try {
    const packageJson = JSON.parse(await readFile(resolve(rootDir, "package.json"), "utf8"));
    const packageName = packageJson.name;

    const packDir = resolve(tmpRoot, "pack");
    await mkdir(packDir, { recursive: true });

    const { stdout: packStdout } = await runNpm(["pack", "--json", "--pack-destination", packDir], rootDir);
    const packOutput = JSON.parse(packStdout);

    assert.ok(Array.isArray(packOutput) && packOutput.length > 0, "npm pack returned no artifacts");

    const tarballPath = resolve(packDir, packOutput[0].filename);
    await access(tarballPath, constants.F_OK);

    const consumerDir = resolve(tmpRoot, "consumer");
    await mkdir(consumerDir, { recursive: true });

    await writeFile(
      resolve(consumerDir, "package.json"),
      JSON.stringify(
        {
          name: "fikir-css-package-smoke-consumer",
          private: true,
          version: "0.0.0"
        },
        null,
        2
      )
    );

    await runNpm(["install", "--no-package-lock", tarballPath], consumerDir);

    const installedPackageDir = resolve(consumerDir, "node_modules", packageName);
    const requiredPaths = [
      "dist/fikir.css",
      "dist/contracts/selectors.json",
      "dist/contracts/alias-migration.json",
      "dist/contracts/size-report.json",
      "README.md",
      "LICENSE"
    ];

    for (const relativePath of requiredPaths) {
      await access(resolve(installedPackageDir, relativePath), constants.F_OK);
    }

    const installedPackageJson = JSON.parse(
      await readFile(resolve(installedPackageDir, "package.json"), "utf8")
    );

    assert.equal(installedPackageJson.style, "./dist/fikir.css");
    assert.ok(installedPackageJson.exports?.["./contracts/selectors"]);
    assert.ok(installedPackageJson.exports?.["./contracts/alias-migration"]);
    assert.ok(installedPackageJson.exports?.["./contracts/size-report"]);
  } finally {
    await rm(tmpRoot, { recursive: true, force: true });
  }
});
