// Change these two values when moving the archive to another host.
export const siteConfig = {
  site: 'https://zwm0426.github.io',
  base: '/blog',
  title: '一些小事 · Small Histories',
  description: '关于去过的地方、做过的东西，以及一些不想忘记的瞬间。',
  author: 'Weiming',
};

/** Prefix a local path once; preserve external URLs, anchors and query strings. */
export function withBase(path = '/') {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;
  const base = siteConfig.base.replace(/\/$/, '');
  const normalized = `/${path.replace(/^\/+/, '')}`;
  if (base && (normalized === base || normalized.startsWith(`${base}/`))) return normalized;
  return `${base}${normalized}`;
}
