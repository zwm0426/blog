import { withBase } from '../../site.config.mjs';

// Keep Markdown and literal HTML links/images portable between /blog and a domain root.
export default function rehypeBasePaths() {
  return (tree) => {
    function visit(node) {
      if (node.properties) {
        for (const key of ['href', 'src', 'poster']) {
          const value = node.properties[key];
          if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
            node.properties[key] = withBase(value);
          }
        }
      }
      for (const child of node.children || []) visit(child);
    }
    visit(tree);
  };
}
