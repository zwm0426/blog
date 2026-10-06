import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { siteConfig, withBase } from '../site.config.mjs';

const origin = new URL(siteConfig.site).origin;
const base = withBase('/');
const files = await readdir('dist', { recursive: true });
let checked = 0;

async function checkUrl(value, source) {
  if (!value || /^(?:#|mailto:|tel:|data:)/i.test(value)) return;
  const relativePage = source.endsWith('index.html') ? source.slice(0, -10) : source;
  const url = new URL(value.replaceAll('&amp;', '&'), new URL(relativePage, `${origin}${base}`));
  if (url.origin !== origin) return;
  assert.ok(url.pathname.startsWith(base), `${source}: URL is missing ${base}: ${value}`);
  const relative = decodeURIComponent(url.pathname.slice(base.length));
  let target = join('dist', relative);
  try {
    if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
    assert.ok((await stat(target)).isFile());
  } catch {
    assert.fail(`${source}: missing target for ${value} (${target})`);
  }
  checked++;
}

for (const file of files.filter((name) => /\.(html|xml)$/.test(name))) {
  const content = await readFile(join('dist', file), 'utf8');
  if (file.endsWith('.html')) {
    assert.match(content, /<html[^>]+lang="zh-CN"/);
    assert.match(content, /<link[^>]+rel="canonical"/);
    for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) await checkUrl(match[1], file);
    for (const match of content.matchAll(/<meta[^>]+property="og:(?:url|image)"[^>]+content="([^"]+)"/g)) await checkUrl(match[1], file);
  } else {
    for (const match of content.matchAll(/<(?:link|loc)>([^<]+)<\/(?:link|loc)>/g)) await checkUrl(match[1], file);
  }
}
assert.ok(checked > 0, 'No built links were checked. Run npm run build first.');
console.log(`Verified ${checked} local URLs in HTML, RSS and sitemap; all resolve under ${base}.`);
