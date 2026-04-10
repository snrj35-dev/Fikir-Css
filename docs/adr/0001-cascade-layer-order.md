# ADR-0001: Cascade Layer Order

## Status
Accepted (v0.1)

## Context
Utility ve semantic sınıflar bir arada kullanıldığında override davranışı belirsizleşebilir.

## Decision
Global layer sırası sabitlenir:
```css
@layer reset, base, layouts, recipes, components, utilities;
```

## Consequences
- Override davranışı öngörülebilir olur.
- Specificity savaşı yerine katman hiyerarşisi kullanılır.
- Utilities bilinçli olarak semantic sınıfların üzerine çıkabilir.

## Assumption
- Ürün ekipleri utility override davranışını istenen bir özellik olarak kabul eder.
