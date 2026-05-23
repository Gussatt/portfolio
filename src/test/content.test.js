import { describe, it, expect } from 'vitest';
import { buildPortfolioTree } from '../utils/content';
import path from 'path';

describe('Content Utility', () => {
  it('should build the tree from content directory', () => {
    // Override the content directory path for testing to use the real one we just made
    const rootDir = path.join(process.cwd(), 'content');
    const tree = buildPortfolioTree(rootDir);
    
    // Check that both languages exist
    expect(tree).toHaveProperty('pt');
    expect(tree).toHaveProperty('en');
    
    // Check the structure of the 'pt' root
    expect(tree.pt.root.name).toBe('~');
    expect(tree.pt.root.type).toBe('directory');
    
    // Check the about file
    const ptAbout = tree.pt.root.children.about;
    expect(ptAbout.name).toBe('about.md');
    expect(ptAbout.type).toBe('file');
    expect(ptAbout.title).toBe('Oi, eu sou o Gustavo');
    expect(ptAbout.tech).toContain('HTML');
  });
});