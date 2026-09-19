// Development/preview utility only. Never included in the production build.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const name = decodeURIComponent(url.pathname).replace(/^\/bill-quest\//, '/');
    const path = resolve(root, `.${name.endsWith('/') ? name + 'index.html' : name}`);
    if (!path.startsWith(root + sep)) throw Error('Invalid path');
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:4173/ and /bill-quest/'));
