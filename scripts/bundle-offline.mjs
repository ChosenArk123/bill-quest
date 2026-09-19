import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';

const jsFiles = ['dialogue.js', 'content.js', 'world-data.js', 'world.js', 'game.js', 'app.js'];

let combinedJs = '(() => {\n';
for (const file of jsFiles) {
  let code = await readFile(resolve('src', file), 'utf8');
  // Strip import statements
  code = code.replace(/^\s*import\s+[^;]+;\s*$/gm, '');
  // Strip export statements (e.g. export const, export function, export default)
  code = code.replace(/^\s*export\s+(?:default\s+)?/gm, '');
  combinedJs += `// --- ${file} ---\n${code}\n`;
}
combinedJs += '})();\n';

// Verify JS syntax
try {
  new vm.Script(combinedJs);
  console.log('JavaScript bundle syntax verified: OK');
} catch (err) {
  console.error('Syntax error in combined JS:', err);
  process.exit(1);
}

const html = await readFile(resolve('src', 'index.html'), 'utf8');
const css = await readFile(resolve('src', 'style.css'), 'utf8');

// Build standalone HTML
let standalone = html;
// Inline CSS
standalone = standalone.replace(
  '<link rel="stylesheet" href="./style.css">',
  `<style>\n${css}\n</style>`
);
// Replace module script with inline bundled script
standalone = standalone.replace(
  '<script type="module" src="./app.js"></script>',
  `<script>\n${combinedJs}\n</script>`
);

await writeFile(resolve('play_offline.html'), standalone, 'utf8');
await writeFile(resolve('bill-quest.html'), standalone, 'utf8');

console.log(`Standalone offline bundle generated:`);
console.log(` - play_offline.html (${(standalone.length / 1024).toFixed(1)} KB)`);
console.log(` - bill-quest.html   (${(standalone.length / 1024).toFixed(1)} KB)`);
