import { buildPortfolioTree } from './src/utils/content.js';
import { portfolioData } from './src/data/portfolio.jsx';
import fs from 'fs';

fs.writeFileSync('debug-old.json', JSON.stringify(portfolioData.pt.root, null, 2));
fs.writeFileSync('debug-new.json', JSON.stringify(buildPortfolioTree().pt.root, null, 2));
