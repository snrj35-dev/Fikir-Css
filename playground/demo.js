(function () {
  const html = document.documentElement;
  const buildWarning = document.getElementById("build-warning");
  const toggleButton = document.getElementById("theme-toggle");
  const recipeCode = document.getElementById("recipe-code");
  const recipeButton = document.getElementById("recipe-button");
  const frameworkLink = document.getElementById("fikir-css-bundle");
  const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
  const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
  const toastShowButtons = document.querySelectorAll("[data-toast-show]");
  const toastHideButtons = document.querySelectorAll("[data-toast-hide]");
  const tooltipTargets = document.querySelectorAll("[data-tooltip-target]");
  const popoverToggleButtons = document.querySelectorAll("[data-popover-toggle]");
  const popoverCloseButtons = document.querySelectorAll("[data-popover-close]");
  const dropdownToggleButtons = document.querySelectorAll("[data-dropdown-toggle]");
  const dropdownCloseButtons = document.querySelectorAll("[data-dropdown-close]");
  const drawerOpenButtons = document.querySelectorAll("[data-drawer-open]");
  const drawerCloseButtons = document.querySelectorAll("[data-drawer-close]");
  const tabsRoots = document.querySelectorAll("[data-tabs-root]");
  const accordionTriggers = document.querySelectorAll("[data-accordion-trigger]");
  const sectionHeadings = document.querySelectorAll("section.section.stack > h2");
  const modalReturnFocusMap = new Map();
  const modalFocusableSelector = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled]):not([type=\"hidden\"])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex=\"-1\"])"
  ].join(", ");

  const resolverExample = {
    importLine: 'import { buttonRecipe } from "../packages/recipes/button.ts";',
    callLine: 'buttonRecipe({ variant: "outline", tone: "danger", size: "sm" })',
    output: "btn btn-outline btn-danger btn-sm"
  };

  if (recipeCode) {
    recipeCode.textContent = [
      resolverExample.importLine,
      "",
      `const className = ${resolverExample.callLine};`,
      `// => \"${resolverExample.output}\"`
    ].join("\n");
  }

  if (recipeButton) {
    recipeButton.className = resolverExample.output;
    recipeButton.textContent = resolverExample.output;
  }

  const tokenProbe = getComputedStyle(html).getPropertyValue("--space-4").trim();
  const bundleProbablyMissing = !frameworkLink || !frameworkLink.sheet || !tokenProbe;
  if (buildWarning && bundleProbablyMissing) {
    buildWarning.hidden = false;
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const current = html.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      toggleButton.textContent = next === "light" ? "Switch to dark" : "Switch to light";
    });
  }

  const supportedSectionNumbers = new Set(["6", "7", "10", "11", "16", "18", "26"]);
  const showcaseSectionNumbers = new Set([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "14.1",
    "20.1",
    "25.1",
    "27",
    "27.1",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "41",
    "42"
  ]);

  for (const heading of sectionHeadings) {
    const headingText = heading.textContent || "";
    const match = headingText.match(/^(\d+(?:\.\d+)?)\)/);
    if (!match) continue;

    const sectionNumber = match[1];
    let supportLevel = "experimental";

    if (supportedSectionNumbers.has(sectionNumber)) {
      supportLevel = "supported";
    } else if (showcaseSectionNumbers.has(sectionNumber)) {
      supportLevel = "showcase";
    }

    const pill = document.createElement("span");
    pill.className = "support-pill";
    pill.setAttribute("data-support-level", supportLevel);
    pill.textContent = supportLevel;
    heading.append(pill);
  }

  function getFocusableElements(scope) {
    if (!scope) return [];
    return Array.from(scope.querySelectorAll(modalFocusableSelector));
  }

  function focusModalSurface(modal) {
    const dialog = modal.querySelector(".modal-dialog");
    if (!dialog) return;

    const focusables = getFocusableElements(dialog);
    const focusTarget = focusables[0] || dialog;

    if (focusTarget === dialog && !dialog.hasAttribute("tabindex")) {
      dialog.setAttribute("tabindex", "-1");
    }

    window.requestAnimationFrame(function () {
      if (typeof focusTarget.focus === "function") {
        focusTarget.focus();
      }
    });
  }

  function setModalOpen(modalId, isOpen, options) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.setAttribute("data-open", isOpen ? "true" : "false");
    modal.setAttribute("aria-hidden", isOpen ? "false" : "true");

    if (isOpen) {
      if (options?.trigger) {
        modalReturnFocusMap.set(modalId, options.trigger);
      }

      focusModalSurface(modal);
      return;
    }

    const returnTarget = modalReturnFocusMap.get(modalId);
    if (returnTarget && returnTarget.isConnected && typeof returnTarget.focus === "function") {
      window.requestAnimationFrame(function () {
        returnTarget.focus();
      });
    }
  }

  for (const button of modalOpenButtons) {
    button.addEventListener("click", function () {
      const modalId = button.getAttribute("data-modal-open");
      if (!modalId) return;
      setModalOpen(modalId, true, { trigger: button });
    });
  }

  for (const button of modalCloseButtons) {
    button.addEventListener("click", function () {
      const modalId = button.getAttribute("data-modal-close");
      if (!modalId) return;
      setModalOpen(modalId, false);
    });
  }

  function setToastOpen(toastId, isOpen) {
    const toast = document.getElementById(toastId);
    if (!toast) return;
    toast.setAttribute("data-open", isOpen ? "true" : "false");
  }

  for (const button of toastShowButtons) {
    button.addEventListener("click", function () {
      const toastId = button.getAttribute("data-toast-show");
      if (!toastId) return;
      setToastOpen(toastId, true);
    });
  }

  for (const button of toastHideButtons) {
    button.addEventListener("click", function () {
      const toastId = button.getAttribute("data-toast-hide");
      if (!toastId) return;
      setToastOpen(toastId, false);
    });
  }

  function setTooltipOpen(wrapper, isOpen) {
    if (!wrapper) return;
    wrapper.setAttribute("data-open", isOpen ? "true" : "false");
  }

  for (const wrapper of tooltipTargets) {
    const trigger = wrapper.querySelector("button, [tabindex]");
    if (!trigger) continue;

    trigger.addEventListener("mouseenter", function () {
      setTooltipOpen(wrapper, true);
    });

    trigger.addEventListener("mouseleave", function () {
      setTooltipOpen(wrapper, false);
    });

    trigger.addEventListener("focus", function () {
      setTooltipOpen(wrapper, true);
    });

    trigger.addEventListener("blur", function () {
      setTooltipOpen(wrapper, false);
    });
  }

  function setPopoverOpen(popoverId, isOpen) {
    const popover = document.getElementById(popoverId);
    if (!popover) return;

    popover.setAttribute("data-open", isOpen ? "true" : "false");

    const trigger = document.querySelector(`[data-popover-toggle="${popoverId}"]`);
    if (trigger) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  for (const button of popoverToggleButtons) {
    button.addEventListener("click", function () {
      const popoverId = button.getAttribute("data-popover-toggle");
      if (!popoverId) return;

      const popover = document.getElementById(popoverId);
      const isOpen = popover?.getAttribute("data-open") === "true";
      setPopoverOpen(popoverId, !isOpen);
    });
  }

  for (const button of popoverCloseButtons) {
    button.addEventListener("click", function () {
      const popoverId = button.getAttribute("data-popover-close");
      if (!popoverId) return;
      setPopoverOpen(popoverId, false);
    });
  }

  function setDropdownOpen(dropdownId, isOpen) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    dropdown.setAttribute("data-open", isOpen ? "true" : "false");

    const trigger = document.querySelector(`[data-dropdown-toggle="${dropdownId}"]`);
    if (trigger) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  for (const button of dropdownToggleButtons) {
    button.addEventListener("click", function () {
      const dropdownId = button.getAttribute("data-dropdown-toggle");
      if (!dropdownId) return;

      const dropdown = document.getElementById(dropdownId);
      const isOpen = dropdown?.getAttribute("data-open") === "true";
      setDropdownOpen(dropdownId, !isOpen);
    });
  }

  for (const button of dropdownCloseButtons) {
    button.addEventListener("click", function () {
      const dropdownId = button.getAttribute("data-dropdown-close");
      if (!dropdownId) return;
      setDropdownOpen(dropdownId, false);
    });
  }

  function setDrawerOpen(drawerId, isOpen) {
    const drawer = document.getElementById(drawerId);
    if (!drawer) return;

    drawer.setAttribute("data-open", isOpen ? "true" : "false");
    drawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  for (const button of drawerOpenButtons) {
    button.addEventListener("click", function () {
      const drawerId = button.getAttribute("data-drawer-open");
      if (!drawerId) return;
      setDrawerOpen(drawerId, true);
    });
  }

  for (const button of drawerCloseButtons) {
    button.addEventListener("click", function () {
      const drawerId = button.getAttribute("data-drawer-close");
      if (!drawerId) return;
      setDrawerOpen(drawerId, false);
    });
  }

  for (const root of tabsRoots) {
    const triggers = root.querySelectorAll("[data-tabs-trigger]");
    const panels = root.querySelectorAll("[data-tabs-panel]");

    for (const trigger of triggers) {
      trigger.addEventListener("click", function () {
        const target = trigger.getAttribute("data-tabs-trigger");
        if (!target) return;

        for (const current of triggers) {
          current.setAttribute("data-active", current === trigger ? "true" : "false");
        }

        for (const panel of panels) {
          const panelKey = panel.getAttribute("data-tabs-panel");
          panel.setAttribute("data-active", panelKey === target ? "true" : "false");
        }
      });
    }
  }

  for (const trigger of accordionTriggers) {
    trigger.addEventListener("click", function () {
      const item = trigger.closest(".accordion-item");
      if (!item) return;
      const isOpen = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", isOpen ? "false" : "true");
    });
  }

  window.addEventListener("click", function (event) {
    for (const popover of document.querySelectorAll(".popover[data-open=\"true\"]")) {
      if (popover.contains(event.target)) continue;
      if (popover.id) {
        setPopoverOpen(popover.id, false);
      }
    }

    for (const dropdown of document.querySelectorAll(".dropdown-menu[data-open=\"true\"]")) {
      if (dropdown.contains(event.target)) continue;
      if (dropdown.id) {
        setDropdownOpen(dropdown.id, false);
      }
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    for (const modal of document.querySelectorAll('.modal[data-open="true"]')) {
      if (modal.id) {
        setModalOpen(modal.id, false);
      }
    }

    for (const popover of document.querySelectorAll(".popover[data-open=\"true\"]")) {
      if (popover.id) {
        setPopoverOpen(popover.id, false);
      }
    }

    for (const dropdown of document.querySelectorAll(".dropdown-menu[data-open=\"true\"]")) {
      if (dropdown.id) {
        setDropdownOpen(dropdown.id, false);
      }
    }

    for (const drawer of document.querySelectorAll('.drawer[data-open="true"]')) {
      if (drawer.id) {
        setDrawerOpen(drawer.id, false);
      }
    }
  });
})();
