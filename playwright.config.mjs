import { defineConfig, devices } from "@playwright/test";
import { resolve } from "node:path";

const fixtureBase = `file://${resolve(process.cwd(), "tests/browser/fixtures")}`;

export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "./tests/browser/results",
  reporter: [
    ["dot"],
    ["html", { outputFolder: "tests/browser/report", open: "never" }],
  ],
  use: {
    baseURL: fixtureBase,
    headless: true,
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
