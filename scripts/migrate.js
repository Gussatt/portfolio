import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { portfolioData } from './src/data/portfolio.jsx';

function migrateNode(node, basePath) {
  if (node.type === 'directory') {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    if (node.children) {
      for (const [key, child] of Object.entries(node.children)) {
        if (node.name === '~') {
          // children of root go directly in lang path
           migrateNode(child, basePath);
        } else {
          migrateNode(child, path.join(basePath, node.name));
        }
      }
    }
  } else if (node.type === 'file') {
    // If we're an immediate child of root, base path is just the language folder.
    // If not, we should be in a subfolder like experience/
    
    // We only create md files for those not 'about.md' since we already manually made those in Task 1
    if (node.name === 'about.md') return;

    const { name, type, content, ...metadata } = node;
    
    // Ensure parent dir exists
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }
    
    const filePath = path.join(basePath, node.name.endsWith('.md') ? node.name : `${node.name}.md`);
    const fileContent = matter.stringify(content, metadata);
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }
}

for (const lang of Object.keys(portfolioData)) {
  const rootDir = path.join(process.cwd(), 'content', lang);
  migrateNode(portfolioData[lang].root, rootDir);
}
console.log('Migration complete.');