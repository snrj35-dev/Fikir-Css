import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import { namingContract } from "../../contracts/naming.contract.mjs";
import { recipesContract } from "../../contracts/recipes.contract.mjs";
import { resolveBadge, resolveBtn, resolveCard } from "../../packages/tooling/resolve-classes.mjs";

const rootDir = resolve(process.cwd());
const styleContractPath = resolve(rootDir, "docs/contracts/style-variant-contract.md");

test("style variant contract: canonical doc defines shared vocabulary and family matrix", async () => {
  const doc = await readFile(styleContractPath, "utf8");

  assert.ok(doc.includes("## Global Vocabulary"));
  assert.ok(doc.includes("- `solid`"));
  assert.ok(doc.includes("- `soft`"));
  assert.ok(doc.includes("- `outline`"));
  assert.ok(doc.includes("- `ghost`"));
  assert.ok(doc.includes("- `plain`"));
  assert.ok(doc.includes("### Button"));
  assert.ok(doc.includes("### Badge"));
  assert.ok(doc.includes("### Alert"));
  assert.ok(doc.includes("### Result"));
  assert.ok(doc.includes("### Toast"));
});

test("style variant contract: naming contract exposes official class selectors", () => {
  const requiredKeys = [
    "component.btnSoft",
    "component.btnGhost",
    "component.btnPlain",
    "component.badgeSolid",
    "component.badgeSoft",
    "component.badgeOutline",
    "component.badgePlain",
    "component.cardFlat",
    "component.cardSubtle",
    "component.cardInteractive",
    "component.surfaceFlat",
    "component.surfaceSubtle",
    "component.surfaceElevated",
    "component.surfaceInteractive"
  ];

  for (const key of requiredKeys) {
    assert.ok(namingContract.selectors[key], `Missing style selector in naming contract: ${key}`);
  }
});

test("style variant contract: recipe variant axes match the official family subsets", () => {
  assert.deepEqual(
    Object.keys(recipesContract.resolvers.button.variants.variant),
    ["solid", "soft", "outline", "ghost", "plain"]
  );

  assert.deepEqual(
    Object.keys(recipesContract.resolvers.badge.variants.variant),
    ["solid", "soft", "outline", "plain"]
  );

  assert.deepEqual(
    Object.keys(recipesContract.resolvers.card.variants.variant),
    ["flat", "plain", "subtle", "elevated", "interactive"]
  );

  assert.deepEqual(recipesContract.resolvers.badge.defaults, {
    variant: "soft",
    tone: "neutral"
  });
});

test("style variant contract: tooling resolvers emit the normalized public surface", () => {
  assert.equal(resolveBtn(), "btn btn-solid btn-primary btn-md");
  assert.equal(resolveBtn({ variant: "ghost", tone: "danger", size: "sm" }), "btn btn-ghost btn-danger btn-sm");
  assert.equal(resolveBadge({ tone: "success" }), "badge badge-soft badge-success");
  assert.equal(resolveBadge({ variant: "outline", tone: "primary" }), "badge badge-outline badge-primary");
  assert.equal(resolveCard(), "card card-flat card-p-md");
  assert.equal(resolveCard({ variant: "interactive", padding: "lg" }), "card card-interactive card-p-lg");
});
