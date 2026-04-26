/**
 * anatomy-drift-baseline.mjs
 *
 * Known CSS components that do not yet have an anatomy.json entry.
 * These are pre-existing omissions tracked here to prevent false positives
 * in the CI drift detection step. Remove entries from this list as you
 * add them to anatomy.contract.mjs.
 *
 * @see scripts/detect-css-anatomy-drift.mjs
 */
export const anatomyDriftBaseline = new Set([
]);
