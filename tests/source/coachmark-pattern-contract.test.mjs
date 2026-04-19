/**
 * coachmark-pattern-contract.test.mjs — Coachmark pattern contract (M16.10)
 *
 * Validates that coachmark HTML structures in playground satisfy
 * pattern, accessibility, and variant contracts. These are structural tests;
 * full browser behavior (keyboard dismiss, focus management) requires
 * browser-level runner.
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const coachmarkPath = resolve(
  process.cwd(),
  "playground/coachmark-example.html"
);

async function getCoachmarkHtml() {
  return readFile(coachmarkPath, "utf8");
}

test("coachmark: pattern identifier is present", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-pattern="coachmark"'),
    "Coachmark example should contain data-pattern='coachmark'"
  );
});

test("coachmark: info variant exists", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-variant="info"'),
    "Should include info variant"
  );
});

test("coachmark: tip variant exists", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-variant="tip"'),
    "Should include tip variant"
  );
});

test("coachmark: warning variant exists", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-variant="warning"'),
    "Should include warning variant"
  );
});

test("coachmark: danger variant exists", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-variant="danger"'),
    "Should include danger variant"
  );
});

test("coachmark: success variant exists", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-variant="success"'),
    "Should include success variant"
  );
});

test("coachmark: neutral variant exists", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-variant="neutral"'),
    "Should include neutral variant"
  );
});

test("coachmark: icon slot present", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-slot="icon"'),
    "Pattern should have icon slot"
  );
});

test("coachmark: title slot present", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-slot="title"'),
    "Pattern should have title slot"
  );
});

test("coachmark: description slot present", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-slot="description"'),
    "Pattern should have description slot"
  );
});

test("coachmark: action slot present", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-slot="action"'),
    "Pattern should have action slot (primary button)"
  );
});

test("coachmark: icon has aria-hidden", async () => {
  const html = await getCoachmarkHtml();
  // Count occurrences of aria-hidden within coachmark context
  const coachmarkSections = html.match(
    /data-pattern="coachmark"[\s\S]*?<\/div>\s*<\/div>/g
  );
  assert.ok(
    coachmarkSections && coachmarkSections.length > 0,
    "Should have coachmark sections"
  );
  coachmarkSections.forEach((section) => {
    if (section.includes('data-slot="icon"')) {
      assert.ok(
        section.includes('aria-hidden="true"'),
        "Icon should be marked as aria-hidden"
      );
    }
  });
});

test("coachmark: data-active attribute is used for visibility", async () => {
  const html = await getCoachmarkHtml();
  assert.ok(
    html.includes('data-active="true"') || html.includes('data-active="false"'),
    "Coachmarks should use data-active for visibility state"
  );
});

test("coachmark: position variants are defined", async () => {
  const html = await getCoachmarkHtml();
  const hasPositions = ["top", "bottom", "start", "end"].some((pos) =>
    html.includes(`data-position="${pos}"`)
  );
  assert.ok(
    hasPositions,
    "Should include at least one position variant (top/bottom/start/end)"
  );
});

test("coachmark: role attribute is semantic", async () => {
  const html = await getCoachmarkHtml();
  const coachmarkSections = html.match(
    /data-pattern="coachmark"[\s\S]*?role="[^"]*"/
  );
  assert.ok(
    coachmarkSections && coachmarkSections.length > 0,
    "Coachmarks should have role attribute (tooltip or dialog)"
  );
});

test("coachmark: aria-label is provided", async () => {
  const html = await getCoachmarkHtml();
  const coachmarkSections = html.match(
    /data-pattern="coachmark"[\s\S]*?aria-label="[^"]*"/
  );
  assert.ok(
    coachmarkSections && coachmarkSections.length > 0,
    "Coachmarks should have aria-label for accessibility"
  );
});

test("coachmark: density variants are used", async () => {
  const html = await getCoachmarkHtml();
  const hasDensity = ["compact", "comfortable", "default"].some((d) =>
    html.includes(`data-density="${d}"`)
  );
  assert.ok(
    hasDensity,
    "Example should demonstrate density variants (compact/comfortable/default)"
  );
});

test("coachmark: action buttons are present", async () => {
  const html = await getCoachmarkHtml();
  // Extract individual coachmark sections
  const coachmarkSections = html.match(
    /data-pattern="coachmark"[\s\S]*?<\/div>\s*<\/div>/g
  ) || [];

  assert.ok(
    coachmarkSections.length > 0,
    "Should have coachmark sections"
  );

  // Check that most coachmarks have data-slot="action"
  const withActions = coachmarkSections.filter((section) =>
    section.includes('data-slot="action"')
  );

  assert.ok(
    withActions.length >= coachmarkSections.length * 0.8,
    "Most coachmarks (80%+) should include action slots"
  );
});

test("coachmark: no semantic class surface (data-* only)", async () => {
  const html = await getCoachmarkHtml();
  // Verify no new classes like "coachmark-info" or "coachmark-warning" are used
  assert.ok(
    !html.includes("coachmark-info") &&
      !html.includes("coachmark-warning") &&
      !html.includes("coachmark-success") &&
      !html.includes("coachmark-danger"),
    "Coachmark should not use semantic class variants; use data-variant instead"
  );
});
