# ADR-0003: Low Runtime Delivery

## Status
Accepted (v0.1)

## Context
Framework runtime'da CSS üretirse App Router / Server Components senaryolarında maliyet ve karmaşıklık artar.

## Decision
- Dağıtım modeli statik CSS dosyasıdır (`dist/fikir.css`).
- Recipe API class string resolver olarak kalır.
- Runtime style injection yapılmaz.

## Consequences
- Runtime maliyeti düşük kalır.
- SSR/RSC senaryolarıyla daha uyumlu temel elde edilir.
- Gelişmiş extraction engine sonraki sürümlere bırakılır.

## Assumption
- v0.1 için concat tabanlı build yaklaşımı yeterlidir.
