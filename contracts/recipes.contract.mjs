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
        ["border-radius", "var(--radius-lg)"]
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
    }
  }
};
