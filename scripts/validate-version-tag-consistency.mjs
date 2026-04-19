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

function getReleaseChannel(version) {
  if (/-beta\./.test(version)) {
    return "beta";
  }

  if (/-rc\./.test(version)) {
    return "rc";
  }

  return "latest";
}

function getExpectedInstallCommand(channel) {
  if (channel === "beta") {
    return "npm install fikir-css@beta";
  }

  if (channel === "rc") {
    return "npm install fikir-css@rc";
  }

  return "npm install fikir-css";
}

function getExpectedExampleDependency(version) {
  return version.includes("-") ? version : `^${version}`;
}

function extractMatch(text, regex, label, path) {
  const match = text.match(regex);
  assert.ok(match, `${label} not found in ${path.replace(`${rootDir}/`, "")}`);
  return match[1];
}

async function readText(relativePath) {
  return readFile(resolve(rootDir, relativePath), "utf8");
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
  const channel = getReleaseChannel(version);
  const installCommand = getExpectedInstallCommand(channel);
  const expectedExampleDependency = getExpectedExampleDependency(version);

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

  const readme = await readText("README.md");
  const siteIndex = await readText("site/index.html");
  const playgroundIndex = await readText("playground/index.html");
  const starterConsumerIndex = await readText("examples/starter-consumer/index.html");
  const starterConsumerReadme = await readText("examples/starter-consumer/README.md");
  const reactExampleReadme = await readText("examples/react-vite/README.md");
  const reactExamplePackage = JSON.parse(await readText("examples/react-vite/package.json"));

  assert.match(readme, new RegExp(`\\*\\*v${version.replace(/\./g, "\\.")}\\*\\*`), "README version badge is out of sync");
  assert.equal(
    extractMatch(readme, /### Option 2 — npm[\s\S]*?```bash\s*[\r\n]+([^`\r\n]+)[\r\n]+```/, "README npm install snippet", resolve(rootDir, "README.md")),
    installCommand,
    `README npm install snippet must be "${installCommand}"`
  );

  assert.equal(
    extractMatch(siteIndex, /<code id="npm-snippet">([^<]+)<\/code>/, "site npm install snippet", resolve(rootDir, "site/index.html")),
    installCommand,
    `site/index.html npm install snippet must be "${installCommand}"`
  );
  assert.equal(
    extractMatch(siteIndex, /<span class="badge badge-neutral" style="font-size:.65rem">(v[^<]+)<\/span>/, "site version badge", resolve(rootDir, "site/index.html")),
    `v${version}`,
    "site/index.html version badge is out of sync"
  );

  assert.equal(
    extractMatch(playgroundIndex, /<span class="demo-logo-version badge badge-neutral">(v[^<]+)<\/span>/, "playground version badge", resolve(rootDir, "playground/index.html")),
    `v${version}`,
    "playground/index.html version badge is out of sync"
  );

  assert.equal(
    extractMatch(starterConsumerIndex, /<span class="badge badge-neutral">(v[^<]+)<\/span>/, "starter consumer version badge", resolve(rootDir, "examples/starter-consumer/index.html")),
    `v${version}`,
    "examples/starter-consumer/index.html version badge is out of sync"
  );
  assert.match(
    starterConsumerReadme,
    new RegExp(`^${installCommand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"),
    `examples/starter-consumer/README.md must include "${installCommand}"`
  );

  assert.equal(
    reactExamplePackage.dependencies?.["fikir-css"],
    expectedExampleDependency,
    `examples/react-vite/package.json must depend on "${expectedExampleDependency}"`
  );
  assert.match(
    reactExampleReadme,
    new RegExp(`npm install \\.\\./\\.\\./fikir-css-${version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.tgz`),
    `examples/react-vite/README.md must reference fikir-css-${version}.tgz`
  );

  console.log(`version/tag consistency passed for ${version}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
