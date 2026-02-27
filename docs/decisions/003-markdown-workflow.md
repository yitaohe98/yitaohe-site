# 003 - Markdown-based authoring workflow

## Decision

All content is authored and stored as Markdown files under `content/`.

## Context

The PRD emphasizes:

- Local editing in VSCode.
- Git-based version control.
- Future compatibility with Git-based CMS tools.

## Consequences

- Posts and pages are easy to diff and review in pull requests.
- There is no dependency on a database or proprietary CMS for v1.0.
- Future tools (e.g. Git-based CMS) can be added without changing the core content model.

