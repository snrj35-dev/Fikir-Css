# Starter Consumer Example

This folder demonstrates minimal package consumption for Fikir CSS.

## Install from local tarball
From repo root:

```bash
npm pack
```

From this folder:

```bash
# From npm (once published):
npm install fikir-css

# Or from local tarball:
npm install ../../fikir-css-<version>.tgz
```

## Use in plain HTML
Use the stylesheet from installed package:

```html
<link rel="stylesheet" href="./node_modules/fikir-css/dist/fikir.css" />
```

See `index.html` for a minimal example using canonical classes.
