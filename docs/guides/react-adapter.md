# React Adapter Guidance

> Created: 2026-04-12
> Scope: M3 — recipe + headless usage in React

## Installation

```bash
npm install fikir-css
```

```tsx
// src/main.tsx
import "fikir-css/css";
```

## Using Semantic Components

Fikir CSS classes map directly to HTML class attributes in JSX:

```tsx
export function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      Save
    </button>
  );
}
```

## Using Recipe Resolvers

```tsx
import { resolveBtn } from "fikir-css/tooling";

export function Button({
  variant = "neutral",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type="button" className={resolveBtn({ variant, size })} {...props}>
      {children}
    </button>
  );
}
```

## Headless Pattern with useState

```tsx
import { useState } from "react";

export function Modal({ title, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        Open
      </button>
      <div
        className="modal"
        data-open={String(open)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-dialog">
          <header className="modal-header">
            <h2 id="modal-title" className="modal-title">{title}</h2>
            <button
              type="button"
              className="icon-button"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );
}
```

## Using `resolveClasses` for Class Conflict Resolution

```tsx
import { resolveClasses } from "fikir-css/tooling";

export function Card({ className, children }: CardProps) {
  return (
    <div className={resolveClasses("card", className)}>
      {children}
    </div>
  );
}
```

## Segmented Control in React

```tsx
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div className="segmented-control" role="group" aria-label={name}>
      {options.map((opt) => (
        <div key={opt.value} className="segmented-control-item">
          <input
            type="radio"
            id={`${name}-${opt.value}`}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="segmented-control-input"
          />
          <label htmlFor={`${name}-${opt.value}`} className="segmented-control-label">
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  );
}
```

## SSR Compatibility

Fikir CSS is plain static CSS — no SSR hydration issues. Just ensure the stylesheet is included in your `<head>` in your server-rendered HTML.

## TypeScript

Recipe resolver types are available from `fikir-css/tooling`. The `resolveClasses` utility is typed via its JSDoc and ships with a `.d.ts` declaration file.
