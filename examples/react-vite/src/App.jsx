import { useState, useEffect, useRef } from "react";
import { resolveBtn, resolveCard, resolveAlert, resolveBadge } from "fikir-css/tooling";
import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

// ── Theme toggle ────────────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState("light");
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };
  return [theme, toggle];
}

// ── Density toggle ──────────────────────────────────────────────────────────────────
function useDensity() {
  const [density, setDensity] = useState("comfortable");
  const toggle = () => {
    const next = density === "comfortable" ? "compact" : "comfortable";
    if (next === "compact") {
      document.documentElement.setAttribute("data-density", "compact");
    } else {
      document.documentElement.removeAttribute("data-density");
    }
    setDensity(next);
  };
  return [density, toggle];
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

// ── Modal component ───────────────────────────────────────────────────────────────────
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

  return (
    <div
      ref={modalRef}
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
  const [density, toggleDensity] = useDensity();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="surface" style={{ minHeight: "100vh", padding: "var(--space-6)" }}>
      <div className="container stack" style={{ "--stack-gap": "var(--space-6)" }}>

        {/* Header */}
        <header className="cluster" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="heading-2">Fikir CSS × React</h1>
          <div className="cluster" style={{ gap: "var(--space-2)" }}>
            <Button variant="outline" tone="neutral" onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </Button>
            <Button variant="outline" tone="neutral" onClick={toggleDensity}>
              {density === "comfortable" ? "⬛ Compact" : "⬜ Comfortable"}
            </Button>
          </div>
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

        {/* Result */}
        <Card>
          <h2 className="heading-3">Result</h2>
          <div className="cluster" style={{ gap: "var(--space-3)", flexWrap: "wrap", alignItems: "start" }}>
            <div className="result" data-result-tone="success" data-style="soft">
              <p className="result-media">✅</p>
              <p className="result-title">Payment successful</p>
              <p className="result-description">Your order has been placed and will ship shortly.</p>
              <div className="result-actions">
                <Button size="sm">View order</Button>
                <Button variant="outline" tone="neutral" size="sm">Back home</Button>
              </div>
            </div>
            <div className="result" data-result-tone="danger" data-style="soft">
              <p className="result-media">❌</p>
              <p className="result-title">Upload failed</p>
              <p className="result-description">The file exceeds the maximum allowed size.</p>
              <div className="result-actions">
                <Button tone="danger" size="sm">Try again</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Data grid */}
        <Card>
          <h2 className="heading-3">Data Grid</h2>
          <div className="data-grid" style={{ "--data-grid-columns": 4 }}>
            <div className="data-grid-head">
              <div className="data-grid-row">
                <div className="data-grid-cell">Name</div>
                <div className="data-grid-cell">Status</div>
                <div className="data-grid-cell">Role</div>
                <div className="data-grid-cell">Joined</div>
              </div>
            </div>
            <div className="data-grid-body">
              {[
                { name: "Alice Chen", status: "Active", role: "Admin", joined: "2024-01" },
                { name: "Bob Müller", status: "Pending", role: "Editor", joined: "2024-03" },
                { name: "Carol Smith", status: "Active", role: "Viewer", joined: "2025-07" },
              ].map((row, i) => (
                <div key={i} className="data-grid-row">
                  <div className="data-grid-cell">{row.name}</div>
                  <div className="data-grid-cell">
                    <Badge tone={row.status === "Active" ? "primary" : "neutral"}>{row.status}</Badge>
                  </div>
                  <div className="data-grid-cell">{row.role}</div>
                  <div className="data-grid-cell">{row.joined}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Settings panel */}
        <Card>
          <h2 className="heading-3">Settings Panel</h2>
          <div className="settings-panel" style={{ minBlockSize: "16rem", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <div className="settings-panel-sidebar">
              <nav className="settings-panel-nav">
                <button className="settings-panel-nav-item" type="button" data-active="true">General</button>
                <button className="settings-panel-nav-item" type="button">Security</button>
                <button className="settings-panel-nav-item" type="button">Notifications</button>
              </nav>
            </div>
            <div className="settings-panel-content">
              <div className="settings-panel-section">
                <p className="settings-panel-section-title">Appearance</p>
                <div className="settings-panel-row">
                  <div className="settings-panel-row-label">
                    <strong>Theme</strong>
                    <span>Choose light or dark interface</span>
                  </div>
                  <div className="settings-panel-row-control">
                    <Button variant="outline" tone="neutral" size="sm" onClick={toggleTheme}>
                      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </Button>
                  </div>
                </div>
                <div className="settings-panel-row">
                  <div className="settings-panel-row-label">
                    <strong>Density</strong>
                    <span>Adjust spacing throughout the UI</span>
                  </div>
                  <div className="settings-panel-row-control">
                    <Button variant="outline" tone="neutral" size="sm" onClick={toggleDensity}>
                      {density === "comfortable" ? "⬛ Compact" : "⬜ Comfortable"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* App shell */}
        <Card>
          <h2 className="heading-3">App Shell</h2>
          <div className="app-shell" style={{ minBlockSize: "12rem" }}>
            <header className="app-shell-topbar">
              <strong>Workspace</strong>
              <div className="cluster" style={{ gap: "var(--space-2)" }}>
                <Badge tone="neutral">Team</Badge>
                <Button variant="ghost" tone="neutral" size="sm">Settings</Button>
              </div>
            </header>
            <div className="app-shell-content">
              <aside className="app-shell-sidebar">
                <nav>
                  <div className="stack" style={{ "--stack-gap": "var(--space-1)" }}>
                    <a href="#" aria-current="page" style={{ display: "block", padding: "var(--space-2) var(--space-3)", fontSize: "var(--font-size-sm)" }}>Overview</a>
                    <a href="#" style={{ display: "block", padding: "var(--space-2) var(--space-3)", fontSize: "var(--font-size-sm)" }}>Projects</a>
                    <a href="#" style={{ display: "block", padding: "var(--space-2) var(--space-3)", fontSize: "var(--font-size-sm)" }}>Members</a>
                  </div>
                </nav>
              </aside>
              <main className="app-shell-main">
                <p className="heading-3" style={{ marginBlockEnd: "var(--space-3)" }}>Active Sprint</p>
                <Alert title="On track">3 of 8 tasks completed this sprint.</Alert>
              </main>
            </div>
          </div>
        </Card>

      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm action">
        <p>This is a Fikir CSS modal driven by <code>data-open</code>. No JS animation library needed.</p>
      </Modal>
    </div>
  );
}
