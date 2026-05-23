# Portfolio Content Schema

All content files in the `content/` directory must be Markdown files with YAML frontmatter.

## Frontmatter Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | The display title of the item (e.g., job title, project name). |
| `learnings` | array[string] | Yes | A list of key achievements or learnings. |
| `tech` | array[string] | Yes | A list of technologies used or involved. |
| `url` | string | No | A link to a repository or website (mostly for projects). |

## Directory Structure

Files should be placed in the appropriate language and category directory:

- `content/[lang]/experience/`
- `content/[lang]/education/`
- `content/[lang]/projects/`
- `content/[lang]/about.md` (Special case)

Languages: `en`, `pt`.

## Example

```yaml
---
title: "Technical Support Engineer @ Braze"
learnings: 
  - "Resolução de Incidentes Nível 3"
  - "Automação de Fluxos com IA"
tech: 
  - "Ruby on Rails"
  - "Troubleshooting"
---
Markdown body goes here...
```
