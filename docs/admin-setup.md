# Admin (Decap CMS) setup

The content editor is at **`/admin/`** (e.g. `https://www.yitaohe.com/admin/`). It uses [Decap CMS](https://decapcms.org/) and writes content to this repo via the GitHub API.

## What’s in the repo

- **`static/admin/index.html`** — Loads the Decap CMS script; the admin UI runs in the browser.
- **`static/admin/config.yml`** — Defines:
  - **Backend:** GitHub (repo, branch).
  - **Collections:** “Blog (EN)” → `content/en/blogs/`, “Blog (中文)” → `content/zh/blogs/`.
  - **Fields:** title, slug, date, description, primary_category, categories, tags, draft, featured, translationKey, body (Markdown).
  - New posts are created at `content/{lang}/blogs/{primary_category}/{slug}/index.md`.

## 1. Set your repo in config

Edit **`static/admin/config.yml`** and set:

```yaml
backend:
  repo: your-github-username/your-repo-name   # e.g. yitaohe98/yitaohe-site
  branch: main
```

Use the same repo and branch that Cloudflare Pages builds from.

## 2. GitHub authentication (production)

Decap CMS needs a **GitHub OAuth app** so users can log in and commit. GitHub’s OAuth flow needs a **callback URL**, which usually requires a small auth proxy (Decap doesn’t run a server).

**Options:**

- **Netlify (easiest)**  
  If you can use Netlify for something:
  - [Netlify’s “Git Gateway”](https://docs.netlify.com/visitor-access/git-gateway/) or their GitHub auth gives you a callback URL.
  - Point Decap’s backend at that (see Decap’s “[GitHub backend](https://decapcms.org/docs/github-backend/)” and “[Add to your site](https://decapcms.org/docs/add-to-your-site/)”).

- **Self‑hosted OAuth proxy**  
  Run a small server that does GitHub OAuth and forwards to Decap (e.g. [netlify-cms-github-oauth-provider](https://github.com/vencak/netlify-cms-github-oauth-provider) or similar). Set the proxy URL in your config / env as required by the proxy’s docs.

- **Cloudflare Workers**  
  You can implement an OAuth proxy as a Cloudflare Worker and use its URL as the callback; then configure Decap to use that (see Decap + GitHub backend docs for “proxy” / “auth endpoint”).

Until you have one of these, only **local backend** (below) will work.

## 3. Local development (no GitHub login)

To edit content locally without setting up OAuth:

1. In **`static/admin/config.yml`**, uncomment:
   ```yaml
   local_backend: true
   ```
2. In a terminal, from the repo root, run:
   ```bash
   npx decap-server
   ```
3. Run your site (e.g. `hugo server`).
4. Open `http://localhost:1313/admin/`. Edits are written to your local files; no push to GitHub.

When you’re done testing, comment out `local_backend: true` again so production uses GitHub.

## 4. Using the admin

1. Open `https://www.yitaohe.com/admin/` (or `http://localhost:1313/admin/` with `hugo server` and optional `decap-server`).
2. Log in with GitHub (when not using `local_backend`).
3. In the sidebar, choose **Blog (EN)** or **Blog (中文)**.
4. **New post:** click “New Blog (EN)” (or 中文), fill in title, **slug** (e.g. `my-post`), date, description, primary category, tags, draft/featured, and body. Save. A new file is created at `content/en/blogs/{primary_category}/{slug}/index.md` (or `content/zh/blogs/...`).
5. **Edit:** open an existing post from the list and change fields; save.
6. **Delete:** open the post and use the delete action in the UI (if enabled). The file is removed from the repo.

After each save, push to GitHub (or let the CMS commit directly if configured); Cloudflare Pages will rebuild and the site updates.

## 5. Media uploads

Uploaded images go to **`static/images/uploads/`** and are referenced as **`/images/uploads/filename`**. Ensure `static/images/uploads/` exists or can be created; add it to `.gitignore` only if you don’t want to commit uploads (otherwise the site won’t show them after deploy).

## 6. Security

- Only users with **write access** to the GitHub repo can create or edit content via the CMS.
- To restrict who can open the admin at all, put something in front of `/admin/` (e.g. [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) or a simple auth page) so only you (or your team) can reach the Decap UI.
