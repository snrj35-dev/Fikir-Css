# ADR-0002: Naming Prefix Strategy

## Status
Accepted (v0.1)

## Context
`btn-primary` ve `bg-primary-500` gibi adlar büyük ekiplerde zihinsel karışıklık oluşturabilir.

## Decision
Config tabanlı, opsiyonel prefix sistemi tanımlanır:
- `utilityPrefix`: utility sınıf isimlerine uygulanır.
- `componentPrefix`: semantic component isimlerine uygulanır.

Varsayılan v0.1:
- `utilityPrefix = ""`
- `componentPrefix = ""`

## Consequences
- Küçük ekiplerde sade kullanım korunur.
- Büyük ekipler prefix açarak ad alanlarını ayrıştırabilir.

## Assumption
- Prefix geçişi v0.1'de manuel veya proje scriptleriyle yapılacaktır.
