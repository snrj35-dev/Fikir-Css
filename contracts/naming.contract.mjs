export const namingContract = {
  defaults: {
    mode: "plain",
    utilityPrefix: "u",
    componentPrefix: "comp"
  },
  selectors: {
    // Recipes / Components shared class surface
    "component.btn": { domain: "component", base: "btn" },
    "component.btnSm": { domain: "component", base: "btn-sm" },
    "component.btnMd": { domain: "component", base: "btn-md" },
    "component.btnLg": { domain: "component", base: "btn-lg" },
    "component.btnSolid": { domain: "component", base: "btn-solid" },
    "component.btnOutline": { domain: "component", base: "btn-outline" },
    "component.btnPrimary": { domain: "component", base: "btn-primary" },
    "component.btnNeutral": { domain: "component", base: "btn-neutral" },
    "component.btnDanger": { domain: "component", base: "btn-danger" },

    "component.card": { domain: "component", base: "card" },
    "component.cardPlain": { domain: "component", base: "card-plain" },
    "component.cardElevated": { domain: "component", base: "card-elevated" },
    "component.cardPSm": { domain: "component", base: "card-p-sm" },
    "component.cardPMd": { domain: "component", base: "card-p-md" },
    "component.cardPLg": { domain: "component", base: "card-p-lg" },

    // Non-recipe semantic components
    "component.input": { domain: "component", base: "input" },
    "component.badge": { domain: "component", base: "badge" },
    "component.alert": { domain: "component", base: "alert" },
    "component.alertDanger": { domain: "component", base: "alert-danger" },

    // Utilities
    "utility.p0": { domain: "utility", base: "p-0" },
    "utility.p2": { domain: "utility", base: "p-2" },
    "utility.p4": { domain: "utility", base: "p-4" },
    "utility.px4": { domain: "utility", base: "px-4" },
    "utility.py2": { domain: "utility", base: "py-2" },
    "utility.gap2": { domain: "utility", base: "gap-2" },
    "utility.gap4": { domain: "utility", base: "gap-4" },
    "utility.mt0": { domain: "utility", base: "mt-0" },
    "utility.forceMt0": { domain: "utility", base: "force-mt-0" },

    "utility.textXs": { domain: "utility", base: "text-xs" },
    "utility.textSm": { domain: "utility", base: "text-sm" },
    "utility.textMd": { domain: "utility", base: "text-md" },
    "utility.textLg": { domain: "utility", base: "text-lg" },
    "utility.fontMedium": { domain: "utility", base: "font-medium" },
    "utility.fontSemibold": { domain: "utility", base: "font-semibold" },

    "utility.bgPrimary500": { domain: "utility", base: "bg-primary-500" },
    "utility.bgPrimary600": { domain: "utility", base: "bg-primary-600" },
    "utility.bgSurface": { domain: "utility", base: "bg-surface" },
    "utility.bgRed500": { domain: "utility", base: "bg-red-500" },
    "utility.textWhite": { domain: "utility", base: "text-white" },
    "utility.textFgDefault": { domain: "utility", base: "text-fg-default" },
    "utility.borderSubtle": { domain: "utility", base: "border-subtle" },
    "utility.forceBgRed500": { domain: "utility", base: "force-bg-red-500" },

    "utility.flex": { domain: "utility", base: "flex" },
    "utility.inlineFlex": { domain: "utility", base: "inline-flex" },
    "utility.itemsCenter": { domain: "utility", base: "items-center" },
    "utility.justifyBetween": { domain: "utility", base: "justify-between" },
    "utility.wFull": { domain: "utility", base: "w-full" },

    "utility.hoverBgPrimary600": { domain: "utility", base: "hover:bg-primary-600" },
    "utility.focusVisibleRingPrimary": { domain: "utility", base: "focus-visible:ring-primary" },
    "utility.disabledOpacity50": { domain: "utility", base: "disabled:opacity-50" },
    "utility.ariaInvalidRingDanger": { domain: "utility", base: "aria-invalid:ring-danger" },
    "utility.dataOpenShadowLg": { domain: "utility", base: "data-open:shadow-lg" },

    "utility.roundedMd": { domain: "utility", base: "rounded-md" },
    "utility.roundedLg": { domain: "utility", base: "rounded-lg" },
    "utility.shadowSm": { domain: "utility", base: "shadow-sm" },
    "utility.shadowMd": { domain: "utility", base: "shadow-md" }
  }
};
