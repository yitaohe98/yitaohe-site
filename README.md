# yitaohe-site

Personal site for **Yitao He** — Chinese-first technical blog and personal brand site, powered by Hugo and deployed to Cloudflare Pages.

## What it is

- **Static site generator** — Hugo
- **Content** — Markdown in `content/`
- **Layouts** — Hugo templates in `layouts/`
- **Assets** — CSS/JS/favicon in `static/`
- **Docs** — Product and architecture docs in `docs/`

## URL scheme

- `/overview/` — overview page
- `/blogs/` — blog listing
- `/blogs/{category}/{slug}/` — individual posts
- `/comments/` — static comments/contact page

## Repo structure

```text
config.toml
content/
  overview/_index.md
  blogs/_index.md
  blogs/system-design/distributed-rate-limiter/index.md
  blogs/life/migration-checklist/index.md
  comments/_index.md
layouts/
  _default/baseof.html
  _default/list.html
  _default/single.html
  overview/list.html
  blogs/list.html
  comments/list.html
  partials/
    header.html
    footer.html
    head-meta.html
    blog-card.html
static/
  css/site.css
  js/site.js
  favicon.png           (add your icon here)
docs/
  v1.0prd.md
  architecture.md
  roadmap.md
  decisions/
    001-static-first.md
    002-cloudflare-pages.md
    003-markdown-workflow.md
```

## Local development

1. [Install Hugo](https://gohugo.io/getting-started/installing/).
2. Run `hugo server` from the repo root.
3. Open the local URL Hugo prints (usually `http://localhost:1313`).

## Deployment (Cloudflare Pages)

- Configure a Cloudflare Pages project pointing at this repository.
- Set the **build command** to `hugo`.
- Set the **output directory** to `public`.

On `git push`, Cloudflare Pages will build and deploy the latest version of the site.
