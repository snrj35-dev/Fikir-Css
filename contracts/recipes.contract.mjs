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
        ["border", "1px solid var(--btn-border-color, transparent)"],
        ["background", "var(--btn-bg, transparent)"],
        ["color", "var(--btn-fg, var(--color-fg-default))"],
        ["cursor", "pointer"],
        ["font-weight", "600"],
        ["text-decoration", "var(--btn-text-decoration, none)"],
        ["text-underline-offset", "0.2em"],
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
      declarations: []
    },
    buttonSoft: {
      selector: "component.btnSoft",
      declarations: []
    },
    buttonOutline: {
      selector: "component.btnOutline",
      declarations: []
    },
    buttonGhost: {
      selector: "component.btnGhost",
      declarations: []
    },
    buttonPlain: {
      selector: "component.btnPlain",
      declarations: []
    },
    buttonPrimary: {
      selector: "component.btnPrimary",
      declarations: []
    },
    buttonNeutral: {
      selector: "component.btnNeutral",
      declarations: []
    },
    buttonDanger: {
      selector: "component.btnDanger",
      declarations: []
    },
    cardBase: {
      selector: "component.card",
      declarations: [
        ["display", "block"],
        ["background", "var(--card-bg, var(--color-bg-surface))"],
        ["color", "var(--color-fg-default)"],
        ["border", "1px solid var(--card-border-color, var(--color-border-subtle))"],
        ["border-radius", "var(--radius-lg)"],
        ["box-shadow", "var(--card-shadow, none)"],
        ["cursor", "var(--card-cursor, default)"],
        ["transition", "background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease"]
      ]
    },
    cardFlat: {
      selector: "component.cardFlat",
      declarations: [
        ["--card-bg", "var(--color-bg-surface)"],
        ["--card-border-color", "var(--color-border-subtle)"],
        ["--card-shadow", "none"]
      ]
    },
    cardPlain: {
      selector: "component.cardPlain",
      declarations: [
        ["--card-bg", "var(--color-bg-surface)"],
        ["--card-border-color", "var(--color-border-subtle)"],
        ["--card-shadow", "none"]
      ]
    },
    cardSubtle: {
      selector: "component.cardSubtle",
      declarations: [
        ["--card-bg", "var(--color-bg-default)"],
        ["--card-border-color", "var(--color-border-subtle)"],
        ["--card-shadow", "none"]
      ]
    },
    cardElevated: {
      selector: "component.cardElevated",
      declarations: [
        ["--card-bg", "var(--color-bg-surface)"],
        ["--card-border-color", "var(--color-border-subtle)"],
        ["--card-shadow", "var(--shadow-sm)"]
      ]
    },
    cardInteractive: {
      selector: "component.cardInteractive",
      declarations: [
        ["--card-bg", "var(--color-bg-surface)"],
        ["--card-border-color", "var(--color-border-subtle)"],
        ["--card-shadow", "none"],
        ["--card-hover-bg", "color-mix(in oklch, var(--color-accent) 6%, var(--color-bg-surface))"],
        ["--card-hover-border-color", "color-mix(in oklch, var(--color-accent) 24%, var(--color-border-subtle))"],
        ["--card-hover-shadow", "var(--shadow-sm)"],
        ["--card-hover-transform", "translateY(-1px)"],
        ["--card-cursor", "pointer"]
      ]
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
        ["border-color", "color-mix(in oklch, var(--color-danger) 45%, var(--color-bg-surface))"],
        ["border-left-width", "3px"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertWarning: {
      selector: "component.alertWarning",
      declarations: [
        ["background", "var(--color-warning-subtle)"],
        ["border-color", "var(--color-warning)"],
        ["border-left-width", "3px"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertSuccess: {
      selector: "component.alertSuccess",
      declarations: [
        ["background", "var(--color-success-subtle)"],
        ["border-color", "var(--color-success)"],
        ["border-left-width", "3px"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertInfo: {
      selector: "component.alertInfo",
      declarations: [
        ["background", "var(--color-info-subtle)"],
        ["border-color", "var(--color-info)"],
        ["border-left-width", "3px"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    alertNeutral: {
      selector: "component.alertNeutral",
      declarations: [
        ["background", "var(--color-neutral-subtle)"],
        ["border-color", "var(--color-border-subtle)"],
        ["color", "var(--color-fg-default)"]
      ]
    },
    badgeBase: {
      selector: "component.badge",
      declarations: [
        ["display", "inline-flex"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["gap", "var(--space-1)"],
        ["border-radius", "var(--radius-sm)"],
        ["padding", "var(--space-1) var(--space-2)"],
        ["font-size", "var(--font-size-xs)"],
        ["font-weight", "600"],
        ["line-height", "1.2"],
        ["border", "1px solid var(--badge-border-color, transparent)"],
        ["background", "var(--badge-bg, transparent)"],
        ["color", "var(--badge-fg, var(--color-fg-default))"]
      ]
    },
    badgeSolid: {
      selector: "component.badgeSolid",
      declarations: []
    },
    badgeSoft: {
      selector: "component.badgeSoft",
      declarations: []
    },
    badgeOutline: {
      selector: "component.badgeOutline",
      declarations: []
    },
    badgePlain: {
      selector: "component.badgePlain",
      declarations: []
    },
    badgeNeutral: {
      selector: "component.badgeNeutral",
      declarations: []
    },
    badgePrimary: {
      selector: "component.badgePrimary",
      declarations: []
    },
    badgeDanger: {
      selector: "component.badgeDanger",
      declarations: []
    },
    badgeWarning: {
      selector: "component.badgeWarning",
      declarations: []
    },
    badgeSuccess: {
      selector: "component.badgeSuccess",
      declarations: []
    },
    badgeInfo: {
      selector: "component.badgeInfo",
      declarations: []
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
          soft: ["component.btnSoft"],
          outline: ["component.btnOutline"],
          ghost: ["component.btnGhost"],
          plain: ["component.btnPlain"]
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
      defaults: { variant: "flat", padding: "md" },
      base: ["component.card"],
      variants: {
        variant: {
          flat: ["component.cardFlat"],
          plain: ["component.cardPlain"],
          subtle: ["component.cardSubtle"],
          elevated: ["component.cardElevated"],
          interactive: ["component.cardInteractive"]
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
      defaults: { variant: "soft", tone: "neutral" },
      base: ["component.badge"],
      variants: {
        variant: {
          solid: ["component.badgeSolid"],
          soft: ["component.badgeSoft"],
          outline: ["component.badgeOutline"],
          plain: ["component.badgePlain"]
        },
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
    },

    // M16+ data-pattern resolvers — selector is [data-pattern="<base>"]
    coachmark: {
      selectorType: "data-pattern",
      defaults: { tone: "info" },
      base: ["pattern.coachmark"],
      variants: {
        tone: {
          info: [],
          warning: [],
          success: [],
          danger: [],
          neutral: []
        }
      }
    },
    authScreen: {
      selectorType: "data-pattern",
      defaults: { variant: "centered" },
      base: ["pattern.authScreen"],
      variants: {
        variant: {
          centered: [],
          split: []
        }
      }
    },
    emptySearchState: {
      selectorType: "data-pattern",
      defaults: { variant: "no-results" },
      base: ["pattern.emptySearchState"],
      variants: {
        variant: {
          "first-use": [],
          "no-results": [],
          "filtered-empty": []
        }
      }
    },
    statGroup: {
      selectorType: "data-pattern",
      defaults: { variant: "default" },
      base: ["pattern.statGroup"],
      variants: {
        variant: {
          default: [],
          compact: [],
          divided: []
        }
      }
    },
    timeRangePicker: {
      selectorType: "data-pattern",
      defaults: { variant: "inline" },
      base: ["pattern.timeRangePicker"],
      variants: {
        variant: {
          inline: [],
          block: []
        }
      }
    },
    filterBar: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.filterBar"],
      variants: {}
    },
    dataTableToolbar: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.dataTableToolbar"],
      variants: {}
    },
    commandBar: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.commandBar"],
      variants: {}
    },
    copyButton: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.copyButton"],
      variants: {}
    },
    passwordInput: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.passwordInput"],
      variants: {}
    },
    searchResultItem: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.searchResultItem"],
      variants: {}
    },
    onboardingChecklist: {
      selectorType: "data-pattern",
      defaults: {},
      base: ["pattern.onboardingChecklist"],
      variants: {}
    }
  }
};
