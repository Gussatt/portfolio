---
name: add-portfolio-content
description: Add new markdown content to the portfolio. Use when you need to add a new experience, project, or education item to the content/ directory and push it to git.
---

# Add Portfolio Content

## Overview
This skill guides the process of adding new localized content to the portfolio. It ensures the content follows the required YAML frontmatter schema, is placed in the correct directory, and is committed/pushed to the repository.

## Workflow

### 1. Identify Content and Metadata
- Determine the content (body) and metadata (title, learnings, tech, url).
- Determine the target language (`en` or `pt`).
- Determine the category (`experience`, `projects`, `education`).

### 2. Format the File
- Refer to [references/schema.md](references/schema.md) for the required YAML frontmatter structure.
- Ensure the file name is slug-cased and ends in `.md`.

### 3. Save the Content
- Use `write_file` to save the formatted content to the correct path:
  `content/[lang]/[category]/[slug].md`

### 4. Verify and Push
- Check if the file was created correctly.
- Run the following git commands:
  ```bash
  git add content/
  git commit -m "feat: add [slug] to [lang]/[category] content"
  git push
  ```

## Usage Example

**User:** "Add a new project called 'Gemini CLI' to my English portfolio. It uses Node.js and I learned about LLM orchestration."

**Agent:** 
1. Reads [references/schema.md](references/schema.md).
2. Formats the file as `content/en/projects/gemini-cli.md`.
3. Writes the file.
4. Executes git commands to commit and push.
