/**
 * Fikir CSS — Overlay JS Helpers
 *
 * Vanilla-JS utilities for accessible overlay behavior.
 * No framework dependency. Tree-shakeable named exports.
 *
 * Import: import { createFocusTrap, bindOverlayKeyboard, createRovingTabindex } from "fikir-css/helpers"
 */

const FOCUSABLE =
  'a[href],area[href],input:not([disabled]),select:not([disabled]),' +
  'textarea:not([disabled]),button:not([disabled]),iframe,object,embed,' +
  '[contenteditable],[tabindex]:not([tabindex="-1"])';

/**
 * Returns all currently focusable descendants of `container`.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.closest('[hidden]') && el.offsetParent !== null
  );
}

// ─── createFocusTrap ──────────────────────────────────────────────────────────

/**
 * Trap keyboard focus inside `container`.
 *
 * @param {HTMLElement} container - The element that should trap focus.
 * @returns {{ activate: (returnTarget?: HTMLElement | null) => void, deactivate: () => void }}
 *
 * @example
 * const trap = createFocusTrap(document.getElementById('my-modal'));
 * // When opening:
 * trap.activate(document.querySelector('#open-btn'));
 * // When closing:
 * trap.deactivate();
 */
export function createFocusTrap(container) {
  /** @type {HTMLElement|null} */
  let returnTarget = null;

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    const focusable = getFocusable(container);
    if (focusable.length === 0) { e.preventDefault(); return; }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return {
    /**
     * Start trapping focus. Moves focus to the first focusable child.
     * @param {HTMLElement|null} [triggerEl] - Element to return focus to on deactivate.
     */
    activate(triggerEl = null) {
      returnTarget = triggerEl ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      container.addEventListener('keydown', handleKeydown);
      const focusable = getFocusable(container);
      if (focusable.length > 0) focusable[0].focus();
    },

    /**
     * Stop trapping focus and return focus to the trigger element.
     */
    deactivate() {
      container.removeEventListener('keydown', handleKeydown);
      if (returnTarget && typeof returnTarget.focus === 'function') {
        returnTarget.focus();
      }
      returnTarget = null;
    },
  };
}

// ─── bindOverlayKeyboard ──────────────────────────────────────────────────────

/**
 * Bind Escape key and backdrop-click dismiss behavior to an overlay element.
 *
 * The overlay element is expected to be the full-screen backdrop wrapper
 * (e.g. `.modal`). Clicking the wrapper itself (not its dialog child) triggers
 * `onClose`. Pressing Escape anywhere triggers `onClose`.
 *
 * @param {HTMLElement} overlayEl - The backdrop/overlay wrapper element.
 * @param {{ onClose: () => void, closeOnBackdrop?: boolean }} options
 * @returns {{ destroy: () => void }} - Call `destroy()` to remove all listeners.
 *
 * @example
 * const { destroy } = bindOverlayKeyboard(
 *   document.getElementById('my-modal'),
 *   { onClose: () => modal.setAttribute('data-open', 'false') }
 * );
 */
export function bindOverlayKeyboard(overlayEl, { onClose, closeOnBackdrop = true }) {
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }
  }

  function handleBackdropClick(e) {
    if (closeOnBackdrop && e.target === overlayEl) {
      onClose();
    }
  }

  document.addEventListener('keydown', handleKeydown);
  overlayEl.addEventListener('click', handleBackdropClick);

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeydown);
      overlayEl.removeEventListener('click', handleBackdropClick);
    },
  };
}

// ─── createRovingTabindex ─────────────────────────────────────────────────────

/**
 * Implement roving tabindex keyboard navigation inside a container.
 *
 * Arrow keys move focus between items. Home/End jump to first/last.
 * Only the currently focused item has tabindex="0"; the rest get tabindex="-1".
 *
 * @param {HTMLElement} container - The container element.
 * @param {{
 *   itemSelector?: string,
 *   orientation?: 'vertical' | 'horizontal' | 'both',
 *   wrap?: boolean
 * }} [options]
 * @returns {{ destroy: () => void }}
 *
 * @example
 * const nav = createRovingTabindex(document.querySelector('.tabs-list'), {
 *   itemSelector: '[role="tab"]',
 *   orientation: 'horizontal',
 * });
 */
export function createRovingTabindex(container, {
  itemSelector = '[role="tab"],[role="menuitem"],[role="option"],[role="treeitem"],button,a[href]',
  orientation = 'both',
  wrap = true,
} = {}) {
  function getItems() {
    return Array.from(container.querySelectorAll(itemSelector)).filter(
      (el) => !el.closest('[hidden]') && !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  function setActive(items, index) {
    items.forEach((el, i) => {
      el.setAttribute('tabindex', i === index ? '0' : '-1');
    });
    items[index].focus();
  }

  function handleKeydown(e) {
    const items = getItems();
    if (items.length === 0) return;

    const current = items.indexOf(document.activeElement);
    if (current === -1) return;

    const isVertical = orientation === 'vertical' || orientation === 'both';
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';

    let next = current;

    if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
      e.preventDefault();
      next = wrap ? (current + 1) % items.length : Math.min(current + 1, items.length - 1);
    } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
      e.preventDefault();
      next = wrap ? (current - 1 + items.length) % items.length : Math.max(current - 1, 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = items.length - 1;
    } else {
      return;
    }

    setActive(items, next);
  }

  // Initialise tabindex state
  const initial = getItems();
  initial.forEach((el, i) => el.setAttribute('tabindex', i === 0 ? '0' : '-1'));

  container.addEventListener('keydown', handleKeydown);

  return {
    destroy() {
      container.removeEventListener('keydown', handleKeydown);
      getItems().forEach((el) => el.removeAttribute('tabindex'));
    },
  };
}
