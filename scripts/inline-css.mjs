import { readFile, writeFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist/index.html');
let html = await readFile(output, 'utf8');
const match = html.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^\"]+\.css)">/);

if (!match) {
  throw new Error('A folha de estilos da build não foi encontrada.');
}

const cssPath = resolve('dist', match[1].slice(1));
const css = await readFile(cssPath, 'utf8');
html = html.replace(match[0], `<style data-aust-styles>${css}</style>`);

await writeFile(output, html);
await unlink(cssPath);
