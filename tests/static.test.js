import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile,readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
test('production build is browser-only with relative assets and no runtime APIs',async()=>{
 execFileSync(process.execPath,['scripts/build.mjs']);
 const files=await readdir('dist');assert.deepEqual(files.sort(),['app.js','content.js','dialogue.js','game.js','index.html','style.css','world-data.js','world.js']);
 const html=await readFile('dist/index.html','utf8');assert.match(html,/src="\.\/app.js"/);assert.match(html,/href="\.\/style.css"/);
 for(const file of files){const source=await readFile(`dist/${file}`,'utf8');assert.doesNotMatch(source,/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/);assert.doesNotMatch(source,/from\s+['"](?:https?:|node:)/);}
});
