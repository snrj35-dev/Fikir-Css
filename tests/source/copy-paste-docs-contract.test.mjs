import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());

const docs = [
  {
    path: "docs/components/split-button.md",
    requiredHeadings: [
      "## When to use",
      "## Canonical anatomy",
      "## Basic usage",
      "## CSS custom properties",
      "## Accessibility checklist",
      "## Tokens used",
      "## AI / machine-readable notes",
      "## Related"
    ],
    forbidden: []
  },
  {
    path: "docs/components/time-picker.md",
    requiredHeadings: [
      "## When to use",
      "## Canonical anatomy",
      "## Basic usage",
      "## CSS custom properties",
      "## Accessibility checklist",
      "## Tokens used",
      "## AI / machine-readable notes",
      "## Related components"
    ],
    forbidden: ['data-open="false"']
  },
  {
    path: "docs/components/date-time-picker.md",
    requiredHeadings: [
      "## When to use",
      "## Canonical anatomy",
      "## Basic usage",
      "## CSS custom properties",
      "## Accessibility checklist",
      "## Tokens used",
      "## AI / machine-readable notes",
      "## Related components"
    ],
    forbidden: ['data-open="false"']
  }
];

for (const doc of docs) {
  test(`copy-paste docs contract: ${doc.path} keeps canonical sections`, async () => {
    const content = await readFile(resolve(rootDir, doc.path), "utf8");

    for (const heading of doc.requiredHeadings) {
      assert.ok(content.includes(heading), `${doc.path} is missing required heading ${heading}`);
    }

    for (const forbidden of doc.forbidden) {
      assert.equal(content.includes(forbidden), false, `${doc.path} still includes forbidden token ${forbidden}`);
    }
  });
}
