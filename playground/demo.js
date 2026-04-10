(function () {
  const html = document.documentElement;
  const buildWarning = document.getElementById("build-warning");
  const toggleButton = document.getElementById("theme-toggle");
  const recipeCode = document.getElementById("recipe-code");
  const recipeButton = document.getElementById("recipe-button");
  const frameworkLink = document.getElementById("fikir-css-bundle");

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
})();
