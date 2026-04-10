export default {
  layers: ["reset", "base", "layouts", "recipes", "components", "utilities"],
  naming: {
    mode: "plain",
    utilityPrefix: "u",
    componentPrefix: "comp"
  },
  build: {
    cssOutFile: "dist/fikir.css",
    selectorsManifestOutFile: "dist/contracts/selectors.json",
    sizeReportOutFile: "dist/contracts/size-report.json"
  }
};
