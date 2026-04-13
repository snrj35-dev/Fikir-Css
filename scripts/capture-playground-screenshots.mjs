import { access, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

const rootDir = resolve(process.cwd());
const firefoxBinary = process.env.FIREFOX_BIN || "firefox";
const viewport = process.env.SCREENSHOT_VIEWPORT || "1440,2200";

const screenshotJobs = [
  {
    source: "playground/index.html",
    theme: "light",
    output: "playground/screenshots/playground-light.png"
  },
  {
    source: "playground/index.html",
    theme: "dark",
    output: "playground/screenshots/playground-dark.png"
  },
  {
    source: "playground/templates/app-shell-starter.html",
    theme: "light",
    output: "playground/screenshots/templates/app-shell-light.png"
  },
  {
    source: "playground/templates/app-shell-starter.html",
    theme: "dark",
    output: "playground/screenshots/templates/app-shell-dark.png"
  },
  {
    source: "playground/templates/settings-starter.html",
    theme: "light",
    output: "playground/screenshots/templates/settings-light.png"
  },
  {
    source: "playground/templates/settings-starter.html",
    theme: "dark",
    output: "playground/screenshots/templates/settings-dark.png"
  },
  {
    source: "playground/templates/data-workflow-starter.html",
    theme: "light",
    output: "playground/screenshots/templates/data-workflow-light.png"
  },
  {
    source: "playground/templates/data-workflow-starter.html",
    theme: "dark",
    output: "playground/screenshots/templates/data-workflow-dark.png"
  }
];

function injectDarkTheme(html) {
  if (html.includes('data-theme="light"')) {
    return html.replace('data-theme="light"', 'data-theme="dark"');
  }

  return html.replace(/<html(\s[^>]*)?>/, (match, attrs = "") => {
    if (attrs.includes("data-theme=")) {
      return match;
    }

    return `<html${attrs} data-theme="dark">`;
  });
}

async function capturePng(inputHtmlPath, outputPngPath) {
  await mkdir(dirname(outputPngPath), { recursive: true });

  const profileDir = await mkdtemp(resolve(tmpdir(), "fikir-fx-profile-"));

  try {
    const args = [
      "--headless",
      "--profile",
      profileDir,
      "--screenshot",
      outputPngPath,
      "--window-size",
      viewport,
      `file://${inputHtmlPath}`
    ];

    const result = spawnSync(firefoxBinary, args, { encoding: "utf8" });

    if (result.error) {
      throw result.error;
    }

    if (result.status !== 0) {
      throw new Error(`Screenshot failed for ${outputPngPath}: ${result.stderr || result.stdout}`);
    }
  } finally {
    await rm(profileDir, { recursive: true, force: true });
  }
}

async function sourceExists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function main() {
  const tempDir = await mkdtemp(resolve(tmpdir(), "fikir-playground-capture-"));

  try {
    for (const job of screenshotJobs) {
      const sourcePath = resolve(rootDir, job.source);
      const outputPath = resolve(rootDir, job.output);

      if (!(await sourceExists(sourcePath))) {
        console.log(`skipped (source not found): ${job.source}`);
        continue;
      }

      let captureSourcePath = sourcePath;

      if (job.theme === "dark") {
        const sourceHtml = await readFile(sourcePath, "utf8");
        const darkHtml = injectDarkTheme(sourceHtml);
        const tempHtmlPath = resolve(tempDir, `${job.output.replace(/[^a-z0-9]/gi, "-")}.html`);

        await writeFile(tempHtmlPath, darkHtml, "utf8");
        captureSourcePath = tempHtmlPath;
      }

      await capturePng(captureSourcePath, outputPath);
      console.log(`captured ${job.output}`);
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  if (error?.code === "ENOENT") {
    console.error("firefox binary not found. Install Firefox or set FIREFOX_BIN.");
    process.exitCode = 1;
    return;
  }

  console.error(error.message);
  process.exitCode = 1;
});
