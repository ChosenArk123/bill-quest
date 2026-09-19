import { mkdir, rm, cp, readdir, readFile } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('src', 'dist', { recursive: true });
const files = await readdir('dist');
for (const file of files) {
  if (!/\.(html|css|js|svg|png|woff2?)$/.test(file)) throw Error(`Non-browser artifact: ${file}`);
}
const html = await readFile('dist/index.html', 'utf8');
if (/(?:src|href)="https?:/.test(html)) throw Error('Runtime HTML cannot require remote resources');
console.log(`Static release built: dist/ (${files.length} browser files). No runtime server dependencies.`);
