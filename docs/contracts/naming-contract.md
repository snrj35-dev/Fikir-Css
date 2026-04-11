# Naming Contract (v0.2)

İlgili dokümanlar:
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `docs/contracts/recipe-contract.md`

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
- `component.inputGroup` -> `{ domain: "component", base: "input-group" }`
- `utility.bgPrimary500` -> `{ domain: "utility", base: "bg-primary-500" }`

## Resolution Rules
Build aşamasında selector adı şu kurallarla çözülür:
1. `mode !== "prefixed"` ise canonical `base` döner.
2. `mode === "prefixed"` ve `domain === "utility"` ise `utilityPrefix + base`.
3. `mode === "prefixed"` ve `domain === "component"` ise `componentPrefix + base`.

## Produced Artifacts
- `dist/contracts/selectors.json`: efektif selector map
- `dist/contracts/alias-migration.json`: alias -> canonical eşlemesi

## Validation Expectations
- Contract key'leri unique olmalı.
- Prefix çözümlemesi deterministic olmalı.
- Çözümlenen selector adları boş olmamalı.
