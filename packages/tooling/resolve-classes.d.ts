/**
 * Fikir CSS — Tooling type declarations
 *
 * Import: import { resolveBtn, resolveClasses } from "fikir-css/tooling"
 */

export type BtnVariant = "solid" | "outline";
export type BtnTone = "primary" | "neutral" | "danger";
export type BtnSize = "sm" | "md" | "lg";
export interface BtnOptions {
  variant?: BtnVariant;
  tone?: BtnTone;
  size?: BtnSize;
}

export type CardVariant = "plain" | "elevated";
export type CardPadding = "sm" | "md" | "lg";
export interface CardOptions {
  variant?: CardVariant;
  padding?: CardPadding;
}

export type AlertTone = "default" | "danger" | "warning" | "success" | "info" | "neutral";
export interface AlertOptions {
  tone?: AlertTone;
}

export type BadgeTone = "neutral" | "primary" | "danger" | "warning" | "success" | "info";
export interface BadgeOptions {
  tone?: BadgeTone;
}

/**
 * Merge class name strings, deduplicating utility classes that share the same
 * CSS property group. Last occurrence wins.
 */
export function resolveClasses(...inputs: string[]): string;

/** Returns a canonical button class string for the given options. */
export function resolveBtn(opts?: BtnOptions): string;

/** Returns a canonical card class string for the given options. */
export function resolveCard(opts?: CardOptions): string;

/** Returns the base input class string. */
export function resolveInput(): string;

/** Returns a canonical alert class string for the given tone. */
export function resolveAlert(opts?: AlertOptions): string;

/** Returns a canonical badge class string for the given tone. */
export function resolveBadge(opts?: BadgeOptions): string;

/** Returns the base modal class string. Toggle `data-open` in JS. */
export function resolveModal(): string;

/** Returns the base tabs class string. */
export function resolveTabs(): string;

export default resolveClasses;
