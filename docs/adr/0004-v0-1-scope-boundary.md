# ADR-0004: v0.1 Scope Boundary

## Status
Accepted (v0.1)

## Context
Erken aşamada çok geniş kapsam, kalite ve tutarlılığı düşürür.

## Decision
v0.1 sadece Foundation kapsamını içerir:
- Tokens
- Reset + Base
- Temel layouts
- Temel utilities
- 5 semantic component
- Basit recipe API

Kapsam dışı:
- Tam component library
- Karmaşık compiler
- Gerçek static extraction engine
- Tam framework sitesi

## Consequences
- Teslimat kısa sürede doğrulanabilir olur.
- Mimari iskelet bozulmadan v0.2+ genişleme yapılabilir.

## Assumption
- Kullanıcılar v0.1'i "production-capable foundation" olarak, "feature-complete" değil olarak değerlendirir.
