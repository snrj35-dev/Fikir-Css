import { useState } from "react";
import { resolveBtn, resolveCard, resolveAlert, resolveBadge } from "fikir-css/tooling";

// ── Theme toggle ────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState("light");
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };
  return [theme, toggle];
}

// ── Button component ────────────────────────────────────────────────────────
function Button({ variant = "solid", tone = "primary", size = "md", children, ...props }) {
  return (
    <button type="button" className={resolveBtn({ variant, tone, size })} {...props}>
      {children}
    </button>
  );
}

// ── Card component ──────────────────────────────────────────────────────────
function Card({ variant = "elevated", padding = "md", children, className = "" }) {
  return (
    <article className={`${resolveCard({ variant, padding })} stack ${className}`}>
      {children}
    </article>
  );
}

// ── Alert component ─────────────────────────────────────────────────────────
function Alert({ tone = "default", title, children }) {
  return (
    <div className={resolveAlert({ tone })} role="alert">
      {title && <p className="alert-title">{title}</p>}
      {children && <p className="alert-description">{children}</p>}
    </div>
  );
}

// ── Badge component ─────────────────────────────────────────────────────────
function Badge({ tone = "neutral", children }) {
  return <span className={resolveBadge({ tone })}>{children}</span>;
}

// ── Modal component ─────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  return (
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
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="modal-body">{children}</div>
        <footer className="modal-footer">
          <Button variant="outline" tone="neutral" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Confirm</Button>
        </footer>
      </div>
    </div>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="surface" style={{ minHeight: "100vh", padding: "var(--space-6)" }}>
      <div className="container stack" style={{ "--stack-gap": "var(--space-6)" }}>

        {/* Header */}
        <header className="cluster" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="heading-2">Fikir CSS × React</h1>
          <Button variant="outline" tone="neutral" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </Button>
        </header>

        {/* Buttons */}
        <Card>
          <h2 className="heading-3">Buttons — <code>resolveBtn()</code></h2>
          <div className="cluster" style={{ gap: "var(--space-2)", flexWrap: "wrap" }}>
            <Button>Primary</Button>
            <Button tone="neutral">Neutral</Button>
            <Button tone="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>

        {/* Badges */}
        <Card>
          <h2 className="heading-3">Badges — <code>resolveBadge()</code></h2>
          <div className="cluster" style={{ gap: "var(--space-2)" }}>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="danger">Danger</Badge>
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="heading-3">Alerts — <code>resolveAlert()</code></h2>
          <div className="stack">
            <Alert title="Info">Default alert with no tone modifier.</Alert>
            <Alert tone="danger" title="Error">
              Something went wrong. Please try again.
            </Alert>
          </div>
        </Card>

        {/* Form */}
        <Card>
          <h2 className="heading-3">Form — <code>resolveInput()</code> (implicit)</h2>
          <form
            className="stack"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          >
            <div className="field">
              <label className="label" htmlFor="demo-name">Name</label>
              <input
                id="demo-name"
                className="input"
                type="text"
                placeholder="Your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="helper-text">Enter your display name.</p>
            </div>
            {submitted && (
              <Alert tone="default" title="Submitted">
                Hello, {inputValue || "stranger"}!
              </Alert>
            )}
            <div className="cluster" style={{ gap: "var(--space-2)" }}>
              <Button>Submit</Button>
              <Button
                variant="outline"
                tone="neutral"
                type="button"
                onClick={() => { setInputValue(""); setSubmitted(false); }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {/* Modal trigger */}
        <Card>
          <h2 className="heading-3">Modal — <code>data-open</code> driven</h2>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        </Card>

      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm action">
        <p>This is a Fikir CSS modal driven by <code>data-open</code>. No JS animation library needed.</p>
      </Modal>
    </div>
  );
}
