/**
 * resolveClasses — class conflict resolution utility (M2 prototype)
 *
 * Merges class name strings, deduplicating utility classes that share the same
 * CSS property group. Last occurrence wins (matches CSS cascade behavior for
 * same-layer declarations in DOM order).
 *
 * This is a heuristic utility. It does not parse CSS at runtime.
 * Property group detection is prefix-based.
 */

const PROPERTY_GROUP_PREFIXES = [
  "p-", "px-", "py-", "pt-", "pr-", "pb-", "pl-",
  "m-", "mx-", "my-", "mt-", "mr-", "mb-", "ml-",
  "gap-", "gap-x-", "gap-y-",
  "text-", "font-",
  "bg-",
  "border-",
  "rounded-",
  "shadow-",
  "ring-",
  "opacity-",
  "w-", "h-", "min-w-", "max-w-", "min-h-", "max-h-",
  "flex-", "grid-", "col-", "row-",
  "z-",
  "leading-", "tracking-",
  "overflow-",
  "cursor-",
];

function getPropertyGroup(cls) {
  for (const prefix of PROPERTY_GROUP_PREFIXES) {
    if (cls.startsWith(prefix)) return prefix;
  }
  return null;
}

/**
 * @param {...string} inputs - Space-separated class strings
 * @returns {string} Deduplicated, conflict-resolved class string
 */
export function resolveClasses(...inputs) {
  const all = inputs.flatMap((s) => (s ? s.trim().split(/\s+/) : []));
  const seen = new Map();
  const result = [];

  for (const cls of all) {
    if (!cls) continue;
    const group = getPropertyGroup(cls);

    if (group) {
      const prev = seen.get(group);
      if (prev !== undefined) {
        result.splice(result.indexOf(prev), 1);
      }
      seen.set(group, cls);
    }

    if (!result.includes(cls)) {
      result.push(cls);
    }
  }

  return result.join(" ");
}

export default resolveClasses;

// ─── Recipe resolvers ────────────────────────────────────────────────────────
// Each resolver maps typed props → a canonical class string from naming.contract.mjs.
// "Last write wins" for conflicting variant axes (mirrors CSS cascade behavior).

/**
 * @param {{ variant?: 'solid'|'outline', tone?: 'primary'|'neutral'|'danger', size?: 'sm'|'md'|'lg' }} [opts]
 * @returns {string}
 */
export function resolveBtn({ variant = "solid", tone = "primary", size = "md" } = {}) {
  const cls = ["btn"];
  if (variant === "solid") cls.push("btn-solid");
  if (variant === "outline") cls.push("btn-outline");
  if (tone === "primary") cls.push("btn-primary");
  if (tone === "neutral") cls.push("btn-neutral");
  if (tone === "danger") cls.push("btn-danger");
  if (size === "sm") cls.push("btn-sm");
  if (size === "md") cls.push("btn-md");
  if (size === "lg") cls.push("btn-lg");
  return cls.join(" ");
}

/**
 * @param {{ variant?: 'plain'|'elevated', padding?: 'sm'|'md'|'lg' }} [opts]
 * @returns {string}
 */
export function resolveCard({ variant = "plain", padding = "md" } = {}) {
  const cls = ["card"];
  if (variant === "elevated") cls.push("card-elevated");
  if (padding === "sm") cls.push("card-p-sm");
  if (padding === "lg") cls.push("card-p-lg");
  if (padding === "md") cls.push("card-p-md");
  return cls.join(" ");
}

/**
 * @returns {string}
 */
export function resolveInput() {
  return "input";
}

/**
 * @param {{ tone?: 'default'|'danger' }} [opts]
 * @returns {string}
 */
export function resolveAlert({ tone = "default" } = {}) {
  const cls = ["alert"];
  if (tone === "danger") cls.push("alert-danger");
  if (tone === "warning") cls.push("alert-warning");
  if (tone === "success") cls.push("alert-success");
  if (tone === "info") cls.push("alert-info");
  if (tone === "neutral") cls.push("alert-neutral");
  return cls.join(" ");
}

/**
 * @param {{ tone?: 'neutral'|'primary'|'danger'|'warning'|'success'|'info' }} [opts]
 * @returns {string}
 */
export function resolveBadge({ tone = "neutral" } = {}) {
  const cls = ["badge"];
  if (tone === "neutral") cls.push("badge-neutral");
  if (tone === "primary") cls.push("badge-primary");
  if (tone === "danger") cls.push("badge-danger");
  if (tone === "warning") cls.push("badge-warning");
  if (tone === "success") cls.push("badge-success");
  if (tone === "info") cls.push("badge-info");
  return cls.join(" ");
}

/**
 * Returns base modal class. Toggle `data-open` attribute in JS to open/close.
 * @returns {string}
 */
export function resolveModal() {
  return "modal";
}

/**
 * Returns base tabs class.
 * @returns {string}
 */
export function resolveTabs() {
  return "tabs";
}
