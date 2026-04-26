# GitHub Copilot Instructions for Fikir CSS

When working on this repository, please follow these core principles:

## 1. Contract-Driven UI
- NEVER assume a class name is the final selector.
- ALWAYS reference `dist/contracts/selectors.json` for the actual generated selectors.
- State is controlled via `data-*` attributes (e.g., `data-open="true"`, `data-variant="primary"`), NOT class modifiers.

## 2. Token-First Design
- Use Fikir CSS design tokens for all styles: `--color-*`, `--space-*`, `--radius-*`, `--font-size-*`.
- Avoid hardcoded values to ensure dark mode and high-contrast theme compatibility.

## 3. Atomic Layouts
- Use layout primitives: `stack`, `cluster`, `grid`, `center`, `container`.
- Avoid custom flex/grid logic unless the primitives are insufficient.

## 4. No Legacy Prefixes
- DO NOT use `comp-` prefixes for component classes. Use the plain semantic names defined in the contracts.

For a full machine-readable skill definition, refer to [SKILL.md](../SKILL.md).
