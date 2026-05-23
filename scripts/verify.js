import { buildPortfolioTree } from '../src/utils/content.js';
import { portfolioData } from '../src/data/portfolio.jsx';

const newTree = buildPortfolioTree();

function normalizeExpectedObject(obj) {
  if (obj.type === 'directory') {
    // Convert children to an array of normalized objects, sorted by their internal 'title' or 'name' to ignore key mismatches
    const childrenValues = Object.values(obj.children || {}).map(normalizeExpectedObject);
    childrenValues.sort((a, b) => {
      const aVal = a.title || a.name || 'a';
      const bVal = b.title || b.name || 'b';
      return aVal.localeCompare(bVal);
    });
    return { type: 'directory', children: childrenValues };
  } else if (obj.type === 'file') {
    return {
      type: 'file',
      title: obj.title,
      content: obj.content?.trim(),
      learnings: obj.learnings || undefined,
      tech: obj.tech || undefined,
      url: obj.url || undefined
    };
  }
}

const ptOld = normalizeExpectedObject(portfolioData.pt.root);
const ptNew = normalizeExpectedObject(newTree.pt.root);
const enOld = normalizeExpectedObject(portfolioData.en.root);
const enNew = normalizeExpectedObject(newTree.en.root);

const stripUndef = (o) => JSON.parse(JSON.stringify(o));

const isPtEqual = JSON.stringify(stripUndef(ptOld)) === JSON.stringify(stripUndef(ptNew));
const isEnEqual = JSON.stringify(stripUndef(enOld)) === JSON.stringify(stripUndef(enNew));

if (!isPtEqual || !isEnEqual) {
    console.error("Mismatch found!");
    process.exit(1);
} else {
    console.log("No structural differences found.");
}