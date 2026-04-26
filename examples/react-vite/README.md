# Fikir CSS × React Vite Example

A working React 18 + Vite example demonstrating Fikir CSS integration.

## What it shows

- CSS import via `import "fikir-css/css"` (no stylesheet link needed)
- `resolveBtn`, `resolveCard`, `resolveAlert`, `resolveBadge` — typed recipe resolvers
- `createFocusTrap` + `bindOverlayKeyboard` from `fikir-css/helpers` in a modal
- Dark/light **theme toggle** via `data-theme` on `<html>`
- Compact/comfortable **density toggle** via `data-density` on `<html>`
- Modal driven by `data-open` — no JS animation library needed

## Run in 30 seconds

```bash
npm install
npm run dev
# → http://localhost:5173
```

Or install from local tarball (monorepo development):

```bash
# From repo root first:
npm run build && npm pack
# Then in this folder:
npm install ../../fikir-css-1.1.0.tgz
npm run dev
```

## Key patterns

### CSS + compact density import

```js
import "fikir-css/css";
import "fikir-css/themes/compact"; // opt-in: enables data-density="compact"
```

### Recipe resolvers

```js
import { resolveBtn, resolveCard, resolveBadge, resolveAlert } from "fikir-css/tooling";

const cls = resolveBtn({ variant: "solid", tone: "primary", size: "sm" });
// → "btn btn-solid btn-primary btn-sm"
```

### Theme & density toggle hooks

```js
function useTheme() {
  const [theme, setTheme] = useState("light");
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };
  return [theme, toggle];
}

function useDensity() {
  const [density, setDensity] = useState("comfortable");
  const toggle = () => {
    const next = density === "comfortable" ? "compact" : "comfortable";
    next === "compact"
      ? document.documentElement.setAttribute("data-density", "compact")
      : document.documentElement.removeAttribute("data-density");
    setDensity(next);
  };
  return [density, toggle];
}
```

### Modal with focus trap + keyboard binding

```jsx
import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

function Modal({ open, onClose, title, children }) {
  const modalRef = useRef(null);
  const trapRef = useRef(null);
  const kbdRef = useRef(null);

  useEffect(() => {
    trapRef.current = createFocusTrap(modalRef.current);
    return () => { kbdRef.current?.destroy(); };
  }, []);

  useEffect(() => {
    if (open) {
      trapRef.current?.activate();
      kbdRef.current = bindOverlayKeyboard(modalRef.current, { onClose });
    } else {
      trapRef.current?.deactivate();
      kbdRef.current?.destroy();
      kbdRef.current = null;
    }
  }, [open, onClose]);

  // Always in DOM — CSS shows/hides via data-open
  return (
    <div ref={modalRef} className="modal" data-open={String(open)}
      role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-dialog">…</div>
    </div>
  );
}
```
