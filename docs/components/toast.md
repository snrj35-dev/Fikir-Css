# Toast

> Support level: **Supported** | Surface key: `component.toast` | Canonical: `.comp-toast`

## When to use

Temporary notification message that appears and auto-dismisses. Non-blocking feedback for user actions.

- ✓ Confirmation messages (saved, deleted, sent)
- ✓ Error notifications
- ✓ Info updates (network status, background tasks)
- ✓ Auto-dismiss after user action
- ✗ Critical errors requiring action (use modal)
- ✗ Persistent alerts (use alert component)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-toast` | Toast container | n/a |
| `comp-toast-success` | Success state (green) | Composable |
| `comp-toast-error` | Error state (red) | Composable |
| `comp-toast-info` | Info state (blue) | Composable |
| `comp-toast-warning` | Warning state (yellow) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Visible | Show immediately | Toast fades in |
| Active | Counting down | User can see message |
| Dismissing | Timeout or close | Fade-out animation |
| Hidden | Auto-dismissed | Removed from DOM |

## Basic usage

```html
<!-- Success toast -->
<div class="comp-toast comp-toast-success" role="status" aria-live="polite" style="position: fixed; bottom: 1rem; right: 1rem; background: var(--color-success); color: white; padding: 1rem; border-radius: 0.5rem;">
  ✓ Changes saved successfully
  <button type="button" class="comp-icon-button" style="margin-left: 1rem;" aria-label="Dismiss">
    ✕
  </button>
</div>

<!-- Error toast -->
<div class="comp-toast comp-toast-error" role="alert" style="position: fixed; bottom: 1rem; right: 1rem; background: var(--color-danger); color: white; padding: 1rem; border-radius: 0.5rem;">
  ✕ Failed to save changes
</div>

<!-- Toast with action -->
<div class="comp-toast comp-toast-info" role="status" aria-live="polite">
  <span>Document uploaded</span>
  <button type="button" class="comp-button" style="margin-left: 1rem;">View</button>
</div>
```

## Toast container (for multiple toasts)

```html
<div id="toast-container" style="position: fixed; bottom: 1rem; right: 1rem; display: flex; flex-direction: column; gap: 0.5rem; z-index: 9999;">
  <!-- Toasts inserted here -->
</div>

<script>
  function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `comp-toast comp-toast-${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => toast.remove(), duration);
  }
  
  // Usage: showToast('Saved!', 'success');
</script>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="status"` or `role="alert"`
- [x] **Live region:** `aria-live="polite"` for automatic announcement
- [x] **Closable:** Optional close button for user control
- [x] **Auto-dismiss:** Default 3–5 seconds; user can extend
- [x] **Screen reader:** Message announced immediately
- [x] **Non-blocking:** Doesn't interrupt user workflow

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role` | Always | `"status"` (normal) or `"alert"` (error) |
| `aria-live` | Always | `"polite"` (normal) or `"assertive"` (urgent) |

## Toast types and timing

| Type | Role | Duration | Use case |
|------|------|----------|----------|
| Success | status | 3s | Confirmation |
| Error | alert | 5s | Error message |
| Info | status | 3s | Info update |
| Warning | status | 4s | Warning |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-success` | Success background | Green |
| `--color-danger` | Error background | Red |
| `--color-info` | Info background | Blue |
| `--color-warning` | Warning background | Yellow |

## AI / machine-readable notes

- **Selector pattern:** `comp-toast` base + type modifier (success, error, info, warning)
- **Role:** Use `role="alert"` for errors, `role="status"` for non-critical
- **Live region:** `aria-live="polite"` for announcement
- **Duration:** 3–5 seconds typical; user can dismiss early
- **Copy-paste use:** Update message text and type class

## Related patterns

- **Alert:** Persistent notification (not auto-dismiss)
- **Modal:** Critical feedback requiring user action
- **Result:** Large status display (not auto-dismiss)
