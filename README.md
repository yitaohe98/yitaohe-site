# yitaohe-site

Personal site for **Yitao He** — engineer, freelance developer, and outdoor enthusiast. Live at [yitaohe.com](https://yitaohe.com) (or wherever you host it).

## What it is

- **Static site** — HTML in `en/` (and later `zh/`), shared `css/site.css` and `js/site.js`. No build step, no framework, no backend.
- **URL scheme** — English: `/en/overview`, `/en/comments`, `/en/blogs`, `/en/updates`. Root `/` and `/en` redirect to `/en/overview/`.
- **Top nav** — Overview, Comments, Blogs, Updates; nav active state is driven by the current path.
- **Overview** — Short intro, About me (education + career), “Recently”, and “What I’ll write about”.
- **Comments** — Placeholder for [Giscus](https://giscus.app) (GitHub Discussions). Enable Discussions and paste the generated script to add comments.
- **Blogs** — Placeholder list for future posts (can be replaced with static-generated pages or a CMS later).
- **Updates** — Simple changelog; edit the list in HTML as needed.

## Repo structure

```
en/
  overview/index.html
  comments/index.html
  blogs/index.html
  updates/index.html
  index.html          → redirects to /en/overview/
css/site.css
js/site.js
index.html            → redirects to /en/overview/
```

Planned: add `zh/` with the same category folders for Chinese; optionally a `content/` layout and a deploy script that copies content into `en/` / `zh/`.
