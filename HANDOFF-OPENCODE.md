# OpenCode Agent Handoff: Portfolio Content Management Migration

## Context
This is a Next.js (App Router) portfolio project. Currently, all the portfolio content (experiences, projects, about me) is stored in a single, large, hardcoded JavaScript object inside `src/data/portfolio.jsx`. 

The current data structure contains both Portuguese (`pt`) and English (`en`) localized content within the same file, making it cumbersome to maintain and scale.

## The Goal
We are migrating away from the hardcoded JS object. The new architecture moves all content into individual Markdown files. These files will use YAML frontmatter for metadata (like title, tech stack, and learnings) and standard Markdown for the description body. 

These files will be stored in a new `content/` directory at the project root, strictly organized by language (e.g., `content/en/`, `content/pt/`). A new server-side utility will parse these Markdown files at request time and reconstruct the exact JSON tree structure the frontend currently expects.

## Instructions for OpenCode
1. Please read through the implementation plan below.
2. Execute the plan strictly task by task.
3. Follow the outlined steps for each task, including running tests, installing dependencies, and verifying behavior.
4. Commit your changes after successfully completing each task, using the provided commit messages.
5. **CRITICAL:** Do not modify the existing UI components (specifically `src/components/SidebarTree.jsx`). The goal is to change the underlying data source while keeping the UI completely intact and unaware of the structural change. The output of the new `buildPortfolioTree` utility must perfectly match the schema of the old hardcoded object.

---

# Portfolio Content Management Implementation Plan

**Goal:** Transition the portfolio content management from a hardcoded JavaScript object to individual Markdown files parsed with gray-matter.

**Architecture:** We will create a `content/` directory at the root, storing `.md` files grouped by language (`en`, `pt`). A server-side utility `src/utils/content.js` will read these files, parse the YAML frontmatter, and reconstruct the exact JSON tree currently exported by `src/data/portfolio.jsx`. Finally, we will refactor `src/app/page.jsx` to be a Server Component that reads this data and passes it to a new `src/app/PortfolioClient.jsx` component.

**Tech Stack:** Next.js (App Router), `gray-matter`, `fs`, `path`.

---

### Task 1: Install Dependencies and Create File Structure

**Files:**
- Modify: `package.json`
- Create: `content/en/about.md`
- Create: `content/pt/about.md`

**Step 1: Install gray-matter**

Run: `npm install gray-matter`

**Step 2: Create basic markdown content files**

Create `content/pt/about.md`:
```yaml
---
title: "Oi, eu sou o Gustavo"
learnings: 
  - "Suporte Técnico Especializado"
  - "Customer Experience (CX)"
  - "Martech & SaaS B2B"
  - "Suporte Bilíngue (PT/EN)"
tech: 
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "React.js"
  - "Zendesk"
---
Prazer! Eu sou o Gustavo, um cara simples que gosta de mexer com muita coisa, ama tecnologia e consegue se interessar por muita coisa diferente. Atualmente sou um Technical Support Engineer na Braze e nas horas vagas estudo o que me dá vontade!
```

Create `content/en/about.md`:
```yaml
---
title: "Hi, I'm Gustavo"
learnings: 
  - "Technical Support Specialist"
  - "Customer Experience (CX)"
  - "Martech & B2B SaaS"
  - "Bilingual Support (PT/EN)"
tech: 
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "React.js"
  - "Zendesk"
---
Nice to meet you! I'm Gustavo, a simple guy who likes to tinker with a lot of things, loves technology, and can get interested in many different topics. I'm currently a Technical Support Engineer at Braze, and in my spare time, I study whatever I feel like!
```

**Step 3: Commit**

```bash
git add package.json package-lock.json content/
git commit -m "chore: install gray-matter and setup base content structure"
```

---

### Task 2: Create the Content Utility and Tests

**Files:**
- Create: `src/utils/content.js`
- Create: `src/test/content.test.js`

**Step 1: Write the failing test**

Create `src/test/content.test.js`:
```javascript
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
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/content.test.js`
Expected: FAIL with "buildPortfolioTree is not defined" or similar.

**Step 3: Write implementation**

Create `src/utils/content.js`:
```javascript
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
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/content.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/utils/content.js src/test/content.test.js
git commit -m "feat: add utility to parse markdown content files"
```

---

### Task 3: Migrate Remaining Content

**Files:**
- Modify: `content/` (add remaining files)

**Step 1: Create all remaining markdown files**

Write scripts or manually create the remaining files in `content/pt/experience/`, `content/pt/education/`, `content/pt/projects/` and their `en` counterparts based strictly on the contents of `src/data/portfolio.jsx`. Ensure the folder structure perfectly mirrors the nested children.

For example, `content/pt/experience/braze-support-engineer.md` must have:
```yaml
---
title: "Technical Support Engineer @ Braze"
learnings: 
  - "Resolução de Incidentes Nível 3"
  - "Automação de Fluxos com IA"
  - "Navegação em Codebase"
  - "Ferramentas de Diagnóstico"
tech: 
  - "Ruby on Rails"
  - "Troubleshooting"
  - "Customer Experience"
---
Responsável por assumir e resolver incidentes complexos de Nível 3...
```

**Step 2: Verify Utility Parser against old data**

Create a temporary script `scripts/verify.js` to ensure `buildPortfolioTree()` output structurally matches `src/data/portfolio.jsx` output.

Run: `node scripts/verify.js`
Expected: No structural differences found.

**Step 3: Commit**

```bash
git add content/ scripts/verify.js
git commit -m "chore: migrate all remaining portfolio content to markdown files"
```

---

### Task 4: Refactor App Component for Server-Side Rendering

**Files:**
- Modify: `src/app/page.jsx`
- Create: `src/app/PortfolioClient.jsx`
- Delete: `src/data/portfolio.jsx`

**Step 1: Write the failing build test**

Run: `npm run build`
(This will pass currently, but we want to test the refactor).

**Step 2: Refactor `page.jsx` into Client and Server components**

1. Rename `src/app/page.jsx` to `src/app/PortfolioClient.jsx`.
2. Change the import inside `src/app/PortfolioClient.jsx` from `import { portfolioData } from '@/data/portfolio';` to accept `portfolioData` as a prop: `export default function PortfolioClient({ portfolioData }) { ... }`. Remove the static import.
3. Create a new `src/app/page.jsx`:
```javascript
import { buildPortfolioTree } from '@/utils/content';
import PortfolioClient from './PortfolioClient';

export default async function Page() {
  const portfolioData = buildPortfolioTree();
  return <PortfolioClient portfolioData={portfolioData} />;
}
```
4. Delete `src/data/portfolio.jsx` and the temporary `scripts/verify.js`.

**Step 3: Run test to verify it passes**

Run: `npm run build`
Expected: Build succeeds without errors. The app compiles successfully.

**Step 4: Commit**

```bash
git rm src/data/portfolio.jsx scripts/verify.js
git add src/app/page.jsx src/app/PortfolioClient.jsx
git commit -m "refactor: replace static data with server-side parsed markdown content"
```