export const recipesContract = {
  layer: {
    buttonBase: {
      selector: "component.btn",
      declarations: [
        ["display", "inline-flex"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["gap", "var(--space-2)"],
        ["border-radius", "var(--radius-md)"],
        ["border", "1px solid transparent"],
        ["cursor", "pointer"],
        ["font-weight", "600"],
        ["transition", "background-color 120ms ease, color 120ms ease, border-color 120ms ease"]
      ]
    },
    buttonSm: {
      selector: "component.btnSm",
      declarations: [["padding", "var(--space-2) var(--space-3)"], ["font-size", "var(--font-size-sm)"]]
    },
    buttonMd: {
      selector: "component.btnMd",
      declarations: [["padding", "var(--space-2) var(--space-4)"], ["font-size", "var(--font-size-md)"]]
    },
    buttonLg: {
      selector: "component.btnLg",
      declarations: [["padding", "var(--space-3) var(--space-4)"], ["font-size", "var(--font-size-lg)"]]
    },
    buttonSolid: {
      selector: "component.btnSolid",
      declarations: [["background", "var(--color-primary-500)"], ["color", "var(--color-gray-50)"]]
    },
    buttonOutline: {
      selector: "component.btnOutline",
      declarations: [
        ["border-color", "var(--color-border-subtle)"],
        ["color", "var(--color-fg-default)"],
        ["background", "transparent"]
      ]
    },
    buttonPrimary: {
      selector: "component.btnPrimary",
      declarations: [["background", "var(--color-primary-500)"], ["color", "var(--color-gray-50)"]]
    },
    buttonNeutral: {
      selector: "component.btnNeutral",
      declarations: [
        ["background", "var(--color-bg-surface)"],
        ["color", "var(--color-fg-default)"],
        ["border-color", "var(--color-border-subtle)"]
      ]
    },
    buttonDanger: {
      selector: "component.btnDanger",
      declarations: [["background", "var(--color-danger)"], ["color", "var(--color-gray-50)"]]
    },
    cardBase: {
      selector: "component.card",
      declarations: [
        ["display", "block"],
        ["background", "var(--color-bg-surface)"],
        ["color", "var(--color-fg-default)"],
        ["border", "1px solid var(--color-border-subtle)"],
        ["border-radius", "var(--radius-lg)"],
        ["box-shadow", "var(--shadow-sm)"]
      ]
    },
    cardPlain: {
      selector: "component.cardPlain",
      declarations: [["box-shadow", "none"]]
    },
    cardElevated: {
      selector: "component.cardElevated",
      declarations: [["box-shadow", "var(--shadow-sm)"]]
    },
    cardPSm: {
      selector: "component.cardPSm",
      declarations: [["padding", "var(--space-3)"]]
    },
    cardPMd: {
      selector: "component.cardPMd",
      declarations: [["padding", "var(--space-4)"]]
    },
    cardPLg: {
      selector: "component.cardPLg",
      declarations: [["padding", "var(--space-6)"]]
    },
    inputBase: {
      selector: "component.input",
      declarations: [
        ["display", "block"],
        ["width", "100%"],
        ["border", "1px solid var(--color-border-subtle)"],
        ["border-radius", "var(--radius-md)"],
        ["padding", "var(--space-2) var(--space-3)"],
        ["background", "var(--color-bg-default)"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertBase: {
      selector: "component.alert",
      declarations: [
        ["display", "flex"],
        ["gap", "var(--space-3)"],
        ["padding", "var(--space-3) var(--space-4)"],
        ["border-radius", "var(--radius-md)"],
        ["border", "1px solid var(--color-border-subtle)"]
      ]
    },
    alertDanger: {
      selector: "component.alertDanger",
      declarations: [
        ["background", "var(--color-danger-subtle)"],
        ["border-color", "var(--color-danger)"],
        ["color", "var(--color-danger)"]
      ]
    },
    alertWarning: {
      selector: "component.alertWarning",
      declarations: [
        ["background", "var(--color-warning-subtle)"],
        ["border-color", "color-mix(in oklch, var(--color-warning) 50%, var(--color-bg-surface))"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertSuccess: {
      selector: "component.alertSuccess",
      declarations: [
        ["background", "var(--color-success-subtle)"],
        ["border-color", "color-mix(in oklch, var(--color-success) 50%, var(--color-bg-surface))"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertInfo: {
      selector: "component.alertInfo",
      declarations: [
        ["background", "var(--color-info-subtle)"],
        ["border-color", "color-mix(in oklch, var(--color-info) 50%, var(--color-bg-surface))"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertNeutral: {
      selector: "component.alertNeutral",
      declarations: [
        ["background", "var(--color-bg-surface)"],
        ["border-color", "var(--color-border-subtle)"],
        ["color", "var(--color-fg-muted)"]
      ]
    },
    badgeBase: {
      selector: "component.badge",
      declarations: [
        ["display", "inline-flex"],
        ["align-items", "center"],
        ["border-radius", "var(--radius-sm)"],
        ["padding", "var(--space-1) var(--space-2)"],
        ["font-size", "var(--font-size-xs)"],
        ["font-weight", "600"]
      ]
    },
    badgeNeutral: {
      selector: "component.badgeNeutral",
      declarations: [
        ["background", "var(--color-bg-surface)"],
        ["border", "1px solid var(--color-border-subtle)"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    badgePrimary: {
      selector: "component.badgePrimary",
      declarations: [
        ["background", "var(--color-primary-500)"],
        ["color", "var(--color-gray-50)"]
      ]
    },
    badgeDanger: {
      selector: "component.badgeDanger",
      declarations: [
        ["background", "var(--color-danger)"],
        ["color", "var(--color-gray-50)"]
      ]
    },
    badgeWarning: {
      selector: "component.badgeWarning",
      declarations: [
        ["background", "var(--color-warning)"],
        ["color", "var(--color-gray-900)"]
      ]
    },
    badgeSuccess: {
      selector: "component.badgeSuccess",
      declarations: [
        ["background", "var(--color-success)"],
        ["color", "var(--color-gray-50)"]
      ]
    },
    badgeInfo: {
      selector: "component.badgeInfo",
      declarations: [
        ["background", "var(--color-primary-500)"],
        ["color", "var(--color-gray-50)"]
      ]
    },
    modalBase: {
      selector: "component.modal",
      declarations: [
        ["position", "fixed"],
        ["inset", "0"],
        ["z-index", "40"],
        ["display", "flex"],
        ["align-items", "center"],
        ["justify-content", "center"]
      ]
    },
    tabsBase: {
      selector: "component.tabs",
      declarations: [
        ["display", "flex"],
        ["flex-direction", "column"],
        ["gap", "var(--space-2)"]
      ]
    }
  },
  resolvers: {
    button: {
      defaults: { variant: "solid", tone: "primary", size: "md" },
      base: ["component.btn"],
      variants: {
        variant: {
          solid: ["component.btnSolid"],
          outline: ["component.btnOutline"]
        },
        tone: {
          primary: ["component.btnPrimary"],
          neutral: ["component.btnNeutral"],
          danger: ["component.btnDanger"]
        },
        size: {
          sm: ["component.btnSm"],
          md: ["component.btnMd"],
          lg: ["component.btnLg"]
        }
      }
    },
    card: {
      defaults: { variant: "plain", padding: "md" },
      base: ["component.card"],
      variants: {
        variant: {
          plain: ["component.cardPlain"],
          elevated: ["component.cardElevated"]
        },
        padding: {
          sm: ["component.cardPSm"],
          md: ["component.cardPMd"],
          lg: ["component.cardPLg"]
        }
      }
    },
    input: {
      defaults: {},
      base: ["component.input"],
      variants: {}
    },
    alert: {
      defaults: { tone: "default" },
      base: ["component.alert"],
      variants: {
        tone: {
          default: [],
          danger: ["component.alertDanger"],
          warning: ["component.alertWarning"],
          success: ["component.alertSuccess"],
          info: ["component.alertInfo"],
          neutral: ["component.alertNeutral"]
        }
      }
    },
    badge: {
      defaults: { tone: "neutral" },
      base: ["component.badge"],
      variants: {
        tone: {
          neutral: ["component.badgeNeutral"],
          primary: ["component.badgePrimary"],
          danger: ["component.badgeDanger"],
          warning: ["component.badgeWarning"],
          success: ["component.badgeSuccess"],
          info: ["component.badgeInfo"]
        }
      }
    },
    modal: {
      defaults: { open: false },
      base: ["component.modal"],
      variants: {
        open: {
          true: [],
          false: []
        }
      }
    },
    tabs: {
      defaults: {},
      base: ["component.tabs"],
      variants: {}
    }
  }
};
