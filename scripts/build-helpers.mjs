import fs from 'fs/promises';
import path from 'path';

const inputPath = path.resolve('packages/helpers/index.mjs');
const outputPath = path.resolve('dist/fikir-helpers.js');

async function buildHelpers() {
  const content = await fs.readFile(inputPath, 'utf8');
  // Remove imports if any (there are none in this file, but just in case)
  // Convert export function X to function X
  let iife = content.replace(/export function/g, 'function');
  
  // Create an object to return
  const exportsMatches = [...content.matchAll(/export function (\w+)/g)].map(m => m[1]);
  const returnStatement = `return { ${exportsMatches.join(', ')} };`;
  
  const finalCode = `/**
 * Fikir CSS — Standalone JS Helpers
 * Vanilla-JS utilities for accessible overlay behavior.
 */
window.Fikir = (function() {
${iife}
  ${returnStatement}
})();
`;
  await fs.writeFile(outputPath, finalCode, 'utf8');
  console.log(`[build-helpers] Wrote standalone helpers to ${outputPath}`);
}

buildHelpers().catch(console.error);
