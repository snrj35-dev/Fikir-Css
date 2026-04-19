/**
 * inline-notice-tone-contract.test.mjs — Inline notice tone contract (M16.7)
 *
 * Validates that inline notice HTML structures in playground satisfy
 * tone and accessibility contracts. These are structural tests; full
 * browser behavior requires browser-level runner.
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const settingsPath = resolve(
  process.cwd(),
  "playground/settings-example.html"
);
const resultPath = resolve(process.cwd(), "playground/result-status-example.html");

async function getSettingsHtml() {
  return readFile(settingsPath, "utf8");
}

async function getResultHtml() {
  return readFile(resultPath, "utf8");
}

test("inline-notice: root class exists", async () => {
  const html = await getSettingsHtml();
  assert.ok(
    html.includes("inline-notice"),
    "Settings example should contain inline-notice component"
  );
});

test("inline-notice: success tone variant present", async () => {
  const html = await getSettingsHtml();
  assert.ok(
    html.includes('data-tone="success"'),
    "Should include success tone variant"
  );
});

test("inline-notice: warning tone variant present", async () => {
  const html = await getResultHtml();
  assert.ok(
    html.includes('data-tone="warning"'),
    "Result example should include warning tone variant"
  );
});

test("inline-notice: danger tone variant present", async () => {
  const html = await getResultHtml();
  assert.ok(
    html.includes('data-tone="danger"'),
    "Result example should include danger tone variant"
  );
});

test("inline-notice: info tone variant present", async () => {
  const html = await getResultHtml();
  assert.ok(
    html.includes('data-tone="info"'),
    "Result example should include info tone variant"
  );
});

test("inline-notice: icon slot present", async () => {
  const html = await getSettingsHtml();
  if (!html.includes("inline-notice")) return;
  assert.ok(
    html.includes("inline-notice-icon"),
    "Notice should have icon slot"
  );
});

test("inline-notice: title slot present", async () => {
  const html = await getSettingsHtml();
  if (!html.includes("inline-notice")) return;
  assert.ok(
    html.includes("inline-notice-title"),
    "Notice should have title slot"
  );
});

test("inline-notice: body slot present", async () => {
  const html = await getSettingsHtml();
  if (!html.includes("inline-notice")) return;
  assert.ok(
    html.includes("inline-notice-body"),
    "Notice should have body slot"
  );
});

test("inline-notice: close button has aria-label", async () => {
  const html = await getSettingsHtml();
  if (!html.includes("inline-notice-close")) return;
  assert.ok(
    html.includes('aria-label="Dismiss'),
    "Close button should have descriptive aria-label"
  );
});

test("inline-notice: icon marked as aria-hidden", async () => {
  const html = await getSettingsHtml();
  if (!html.includes("inline-notice-icon")) return;
  assert.ok(
    html.includes('aria-hidden="true"'),
    "Icon should be marked as aria-hidden"
  );
});

test("inline-notice: success tone has proper role and aria-live", async () => {
  const html = await getSettingsHtml();
  if (!html.includes('data-tone="success"')) return;
  // Check for role="status" and aria-live="polite" near success tone
  const successMatch = html.match(
    /data-tone="success"[^>]*role="([^"]*)"[^>]*aria-live="([^"]*)"/
  );
  assert.ok(
    successMatch && successMatch[1] === "status" && successMatch[2] === "polite",
    "Success notice should have role='status' and aria-live='polite'"
  );
});

test("inline-notice: warning tone has proper role and aria-live", async () => {
  const html = await getResultHtml();
  if (!html.includes('data-tone="warning"')) return;
  // Check for role="alert" and aria-live="assertive" near warning tone
  const warningMatch = html.match(
    /data-tone="warning"[^>]*role="([^"]*)"[^>]*aria-live="([^"]*)"/
  );
  assert.ok(
    warningMatch && warningMatch[1] === "alert" && warningMatch[2] === "assertive",
    "Warning notice should have role='alert' and aria-live='assertive'"
  );
});

test("inline-notice: danger tone has proper role and aria-live", async () => {
  const html = await getResultHtml();
  if (!html.includes('data-tone="danger"')) return;
  // Check for role="alert" and aria-live="assertive" near danger tone
  const dangerMatch = html.match(
    /data-tone="danger"[^>]*role="([^"]*)"[^>]*aria-live="([^"]*)"/
  );
  assert.ok(
    dangerMatch && dangerMatch[1] === "alert" && dangerMatch[2] === "assertive",
    "Danger notice should have role='alert' and aria-live='assertive'"
  );
});

test("inline-notice: info tone has proper role and aria-live", async () => {
  const html = await getResultHtml();
  if (!html.includes('data-tone="info"')) return;
  // Check for role="status" and aria-live="polite" near info tone
  const infoMatch = html.match(
    /data-tone="info"[^>]*role="([^"]*)"[^>]*aria-live="([^"]*)"/
  );
  assert.ok(
    infoMatch && infoMatch[1] === "status" && infoMatch[2] === "polite",
    "Info notice should have role='status' and aria-live='polite'"
  );
});

test("inline-notice: content wrapper present", async () => {
  const html = await getSettingsHtml();
  if (!html.includes("inline-notice")) return;
  assert.ok(
    html.includes("inline-notice-content"),
    "Notice should have content wrapper"
  );
});
