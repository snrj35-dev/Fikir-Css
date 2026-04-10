# Naming Contract (v0.2)

## Purpose
Selector isimlendirmesini tek kaynakta toplamak.

Kaynak dosya:
- `contracts/naming.contract.mjs`

## Structure
`namingContract` iki ana bölüm içerir:
- `defaults`: `mode`, `utilityPrefix`, `componentPrefix`
- `selectors`: key -> `{ domain, base }`

Örnek:
- `component.btn` -> `{ domain: "component", base: "btn" }`
- `utility.bgPrimary500` -> `{ domain: "utility", base: "bg-primary-500" }`

## Resolution Rules
Build aşamasında selector adı şu kurallarla çözülür:
1. `mode !== "prefixed"` ise canonical `base` döner.
2. `mode === "prefixed"` ve `domain === "utility"` ise `utilityPrefix + base`.
3. `mode === "prefixed"` ve `domain === "component"` ise `componentPrefix + base`.
4. `domain === "recipe"` (varsa) prefixlenmeden kalır.

## Produced Artifacts
- `dist/contracts/selectors.json`: efektif selector map
- `dist/contracts/alias-migration.json`: alias -> canonical eşlemesi

## Validation Expectations
- Contract key'leri unique olmalı.
- Prefix çözümlemesi deterministic olmalı.
- Çözümlenen selector adları boş olmamalı.
