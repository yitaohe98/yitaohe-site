# Architecture Overview

This repository implements the v1.0 architecture for **yitaohe.com** as defined in the PRD.

## Stack

- **Static site generator**: Hugo
- **Hosting**: Cloudflare Pages (builds the Hugo site from this repo)
- **Content format**: Markdown (all posts and pages)
- **Version control**: Git (GitHub)

## Principles

- **Static-first**: all pages are generated at build time.
- **No runtime backend**: no database or application server is required to serve the site.
- **Content in Git**: all posts and pages live inside `content/` and are versioned with the code.
- **Separation of concerns**:
  - `content/` holds Markdown content.
  - `layouts/` defines HTML templates and presentation.
  - `static/` contains static assets (CSS, JS, favicon).
  - `docs/` keeps product and architecture documentation.

## URL Model

- `/overview/` — overview section.
- `/blogs/` — blogs listing.
- `/blogs/{category}/{slug}/` — individual posts.
- `/comments/` — static comments/contact page.

