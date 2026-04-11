import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const playgroundIndexPath = resolve(rootDir, "playground/index.html");
const playgroundDemoCssPath = resolve(rootDir, "playground/demo.css");

test("fluid token pilot showcase: playground index includes section and comparison markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("42) Fluid Token Pilot (`clamp`) Comparison"));
  assert.ok(html.includes('class="demo-fluid-fixed-title"'));
  assert.ok(html.includes('class="demo-fluid-clamp-title"'));
  assert.ok(html.includes("Uses `clamp()` for responsive title sizing and spacing progression."));
});

test("fluid token pilot showcase: demo css includes clamp markers for type and spacing", async () => {
  const css = await readFile(playgroundDemoCssPath, "utf8");

  assert.ok(css.includes(".demo-fluid-clamp-title {"));
  assert.ok(css.includes("font-size: clamp("));
  assert.ok(css.includes(".demo-fluid-clamp-space {"));
  assert.ok(css.includes("margin-block-start: clamp("));
});
