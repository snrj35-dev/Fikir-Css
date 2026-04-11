import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());

async function exists(path) {
  await access(path, constants.F_OK);
}

function getExpectedTag(version) {
  return `v${version}`;
}

function parseGitHubTagRef() {
  const refType = process.env.GITHUB_REF_TYPE;
  const refName = process.env.GITHUB_REF_NAME;

  if (refType === "tag" && refName) {
    return refName;
  }

  return null;
}

async function main() {
  const packageJsonPath = resolve(rootDir, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  const version = packageJson.version;

  assert.equal(typeof version, "string", "package.json#version must be a string");
  assert.match(version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/, "package version is not semver-like");

  const expectedTag = getExpectedTag(version);
  const explicitTag = process.env.RELEASE_TAG;
  const ciTag = parseGitHubTagRef();

  if (explicitTag) {
    assert.equal(explicitTag, expectedTag, `RELEASE_TAG mismatch: expected ${expectedTag}, got ${explicitTag}`);
  }

  if (ciTag) {
    assert.equal(ciTag, expectedTag, `GitHub tag mismatch: expected ${expectedTag}, got ${ciTag}`);
  }

  const [major, minor] = version.split(".");
  const candidateReleaseNotes = [
    resolve(rootDir, `docs/release/v${version}-release-notes.md`),
    resolve(rootDir, `docs/release/v${major}.${minor}-release-notes.md`)
  ];

  let releaseNoteFound = false;
  for (const candidate of candidateReleaseNotes) {
    try {
      await exists(candidate);
      releaseNoteFound = true;
      break;
    } catch {
      // continue
    }
  }

  assert.ok(
    releaseNoteFound,
    `Release notes not found for version ${version}. Expected one of: ${candidateReleaseNotes
      .map((path) => path.replace(`${rootDir}/`, ""))
      .join(", ")}`
  );

  console.log(`version/tag consistency passed for ${version}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
