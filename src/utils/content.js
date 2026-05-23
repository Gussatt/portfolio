import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function buildNode(dirPath, isRoot = false) {
  const node = {
    name: isRoot ? '~' : path.basename(dirPath),
    type: 'directory',
    children: {}
  };

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      node.children[item] = buildNode(itemPath);
    } else if (item.endsWith('.md')) {
      const fileContents = fs.readFileSync(itemPath, 'utf8');
      const { data, content } = matter(fileContents);
      const nameWithoutExt = item.replace(/\.md$/, '');
      
      node.children[nameWithoutExt] = {
        name: item,
        type: 'file',
        content: content.trim(),
        ...data
      };
    }
  }

  return node;
}

export function buildPortfolioTree(contentDir = path.join(process.cwd(), 'content')) {
  if (!fs.existsSync(contentDir)) {
    return { pt: { root: { name: '~', type: 'directory', children: {} } }, en: { root: { name: '~', type: 'directory', children: {} } } };
  }

  const langs = fs.readdirSync(contentDir).filter(item => {
    return fs.statSync(path.join(contentDir, item)).isDirectory();
  });

  const tree = {};
  for (const lang of langs) {
    const langDir = path.join(contentDir, lang);
    tree[lang] = {
      root: buildNode(langDir, true)
    };
  }

  return tree;
}