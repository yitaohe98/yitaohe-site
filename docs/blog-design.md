# Blog: Design Document

Design for further implementing the blog experience on yitaohe.com. Aligns with the [v1.0 PRD](v1.0prd.md) (§4–6, §8) and current architecture.

---

## 1. Goals and non-goals

### Goals

- **Discoverability:** Readers can browse all posts, filter by category or tag, and move between listing and post smoothly.
- **Readability:** Post pages support long-form reading (code highlighting, clear typography). Optional: Table of Contents (for long posts), Previous/Next navigation.
- **Consistency:** Same content model and URL rules across EN/中文; category and tag pages feel part of the same blog.
- **Extensibility:** Add categories/tags and new post types without reworking the design.

### Non-goals (for this design)

- Views/likes, comments, search, or user accounts (see PRD §9).
- Changing the static-first architecture or content-in-Git model.

---

## 2. Current state vs PRD

| PRD requirement | Current state | Gap |
|-----------------|---------------|-----|
| **6.2 Listing:** reverse chronological | ✅ Hugo default | — |
| **6.2** Category-based browsing | Hugo generates `/categories/{cat}/` | Listing has no category filter UI; no clear entry from blogs to categories |
| **6.2** Tag filtering | Hugo generates `/tags/{tag}/` | No tag filter UI or links from listing/cards |
| **6.2** Pagination | ✅ `_internal/pagination` | May need styling and i18n for “Next/Previous” |
| **6.3** Title, description | ✅ | — |
| **6.3** Table of Contents | ✅ Always rendered | Optional; show only for long posts (e.g. headings count) if implemented |
| **6.3** Code syntax highlighting | Default Hugo/Chromastique | Confirm theme and language detection |
| **6.3** Prev/Next navigation | ❌ | Optional; not yet implemented |
| **6.3** SEO meta | ✅ head-meta | — |
| **5** Front matter (primary_category, etc.) | ✅ | — |
| Categories not top-level nav | ✅ | Keep; expose via blog listing / filters only |

---

## 3. User flows

1. **Land on blog listing** → See latest posts (cards: title, description, category, date). Optionally filter by category or tag.
2. **Click a post** → Read full post (optional: ToC for long posts, prev/next links).
3. **From a post** → Click category or tag → See taxonomy list (all posts in that category/tag). From there, back to full listing or another post.
4. **From overview** → “Featured posts” already link to posts; no change needed.

---

## 4. Content model (recap and extensions)

- **Unchanged:** `title`, `date`, `description`, `primary_category`, `categories`, `tags`, `draft`, `featured`, `translationKey` (for i18n pairing).
- **Optional extension:** `readingTime` (or rely on Hugo’s `.ReadingTime` in templates).
- **Slugs:** Remain English; URL stays `/blogs/{category}/{slug}/` per PRD.

No new required front matter for the improvements below.

---

## 5. Listing page design

### 5.1 Layout

- **Header:** Title “Blogs” (i18n), short subtitle (i18n).
- **Filters (above the grid):**
  - **Category filter:** “All” + list of categories that have posts (from taxonomy). Either dropdown or horizontal pills. Selecting one links to `/categories/{category}/` (or language-aware equivalent) so the user sees that taxonomy’s list.
  - **Tag filter (optional for v1):** Same idea: “All tags” or a tag cloud; link to `/tags/{tag}/`.
- **Grid:** Existing blog cards (title, description, primary_category, date, featured badge). Order: reverse chronological (Hugo default).
- **Pagination:** Keep `_internal/pagination`; add CSS so it’s visible and on-brand. Use i18n for “Next”, “Previous”, “Page X of Y” if available.

### 5.2 Category/tag list source

- Categories: from `$.Site.Taxonomies.categories` (or equivalent). Only show categories that have at least one non-draft post in the current language.
- Tags: same with `$.Site.Taxonomies.tags`; optional to limit to top N or “all”.

### 5.3 Empty and edge cases

- No posts: show a short message (i18n), e.g. “No posts yet.”
- No posts in a category/tag: taxonomy list template already handles this; keep a consistent empty state.

### 5.4 Multilingual

- Listing and filters use current `.Lang`; category/tag links use `relLangURL` or equivalent so EN and 中文 stay in their own path prefix.

---

## 6. Post (single) page design

### 6.1 Table of Contents (optional)

- **Optional feature.** If implemented: render ToC only when the post has more than N headings (e.g. 2 or 3); otherwise hide the ToC block.
- **Implementation:** Use `.TableOfContents` in the template and conditionally wrap it based on a count of headings (e.g. scan `.Content` or use a Hugo variable if available).
- **Placement:** Above content; optionally sticky on large screens.

### 6.2 Code blocks

- **Requirement:** Syntax highlighting (PRD 6.3). Hugo’s default (Chromastique) is sufficient; ensure no custom CSS overrides break it. Optionally document “use fenced code blocks with language tag” in authoring guide.
- **No new dependencies** unless you later switch to a client-side highlighter (not recommended for static).

### 6.3 Previous / Next navigation (optional)

- **Optional feature.** If implemented: same section (blogs), same language; order by date (asc for next, desc for prev).
- **Placement:** After the article body, above or beside footer. “Previous: Title” / “Next: Title” with links; disable or hide if none.
- **Implementation:** Use Hugo’s `.PrevInSection` / `.NextInSection` (or equivalent for the blogs section).

### 6.4 Optional

- **Reading time:** Display “X min read” from `.ReadingTime` in article meta.
- **Category/tag links:** In article meta or footer, link primary_category and tags to their taxonomy pages so users can browse by category/tag.

---

## 7. Category and tag (taxonomy) pages

- Hugo already generates list pages for `/categories/{name}/` and `/tags/{name}/`.
- **Design choice:** Reuse the same card grid and pagination as the main blogs listing (e.g. shared partial or same list layout) so the experience is consistent.
- **Layout:** Use a section layout for taxonomies that mirrors `blogs/list.html`: title = category or tag name, subtitle optional, then the same grid + pagination. No extra “filter” UI on taxonomy pages (the filter is “you’re in this category/tag”).
- **Breadcrumb / context:** Optional “Blogs → Category: system-design” or “Tag: redis” near the title for clarity.

---

## 8. SEO and performance

- **Already in place:** Meta description, OG tags, clean URLs, sitemap, RSS (home). No change required for basic SEO.
- **Optional:** Blogs-specific RSS (e.g. `/blogs/index.xml`) if you want a feed for “only blog posts”; can be added later.
- **Performance:** No new JS for listing/filters if we use server-rendered links; keep images optimized when you add them (future).

---

## 9. Implementation phases

Suggested order so each step is shippable:

| Phase | Scope | Deliverable |
|-------|--------|--------------|
| **A** | Listing: category filter + taxonomy layout | Category pills/links on blogs list; taxonomy list uses same card grid; pagination styled |
| **B** | Post: optional ToC, optional prev/next | If implemented: ToC when ≥N headings; prev/next links below content |
| **C** | Listing: tag filter (optional) | Tag links or cloud on blogs list; tag taxonomy uses same grid |
| **D** | i18n and polish | “Next/Previous”, “All”, category names in i18n; reading time and category/tag links on post |

Phase A gives the biggest improvement (category browsing); B improves reading; C and D refine.

---

## 10. Decisions (open questions resolved)

- **Category display names:** Use **human labels** (e.g. “System design” instead of slug `system-design`). Store labels in a data file (e.g. `data/categories.yaml`) keyed by slug, with optional i18n override so EN/中文 can show different labels.
- **Tag filter:** Use a **tag cloud** (tags shown with relative emphasis, e.g. by count; link each to `/tags/{tag}/`).
- **Sticky ToC:** Defer; can be added later for long posts on desktop.

---

## 11. Authoring posts: text, code blocks, and images

You write each post in **Markdown** (one file per post: `content/{lang}/blogs/{category}/{slug}/index.md`). The same file can mix paragraphs, headings, code blocks, and images.

### 11.1 Text

Use normal Markdown:

- **Paragraphs** — blank line between paragraphs.
- **Headings** — `## Section`, `### Subsection` (used for ToC).
- **Lists** — `- item` or `1. item`.
- **Links** — `[text](url)`.
- **Bold / italic** — `**bold**`, `*italic*`.

Hugo’s Goldmark renderer turns this into HTML. No extra setup.

### 11.2 Code blocks

Use **fenced code blocks** with an optional language tag so Hugo can apply syntax highlighting:

````markdown
```python
def hello():
    print("Hello")
```

```bash
npm install
```
````

- Use three backticks, then the language (e.g. `python`, `bash`, `go`, `json`, `text`), then the code, then three backticks.
- Hugo uses Chromastique for highlighting; no extra config needed. If a block has no language, it’s rendered as plain text with monospace styling.

### 11.3 Images

Two ways to include images; pick one per image.

**Option A — Page bundle (recommended for post-specific images)**

Put the image in the **same folder** as the post’s `index.md`:

```text
content/zh/blogs/system-design/my-post/
  index.md
  diagram.png
  screenshot.png
```

In `index.md`, reference them with a **relative path**:

```markdown
![Diagram showing the flow](diagram.png)

Some text between images.

![Screenshot of the UI](screenshot.png)
```

- Pros: image lives with the post; easy to move or copy the post; works with multilingual (each language folder can have its own images).
- No change to `config.toml`; Hugo serves page-bundle resources automatically.

**Option B — Site-wide static images**

Put the image in `static/`, e.g. `static/images/blog/my-post/diagram.png`. In the post:

```markdown
![Diagram](/images/blog/my-post/diagram.png)
```

- Use when the same image is shared across posts or pages. Path is absolute from site root.

**Best practices**

- Use descriptive **alt text** in the brackets (`![Alt text here](path)`) for accessibility and SEO.
- Prefer **reasonable size** (e.g. max width 1200–1600 px) so the built site stays fast; resize or compress before committing if needed.

### 11.4 Mixed content example

A single post can look like this:

```markdown
---
title: "My Post"
date: 2026-02-27
description: "Short summary."
primary_category: "system-design"
categories: ["system-design"]
tags: ["redis", "architecture"]
draft: false
---

## Introduction

Some paragraph with **bold** and a [link](https://example.com).

## Architecture

Here is a diagram:

![Architecture diagram](diagram.png)

We use the following code:

```go
func main() {
    fmt.Println("hello")
}
```

## Conclusion

Final thoughts.
```

Text, images, and code blocks are all in one file; Hugo renders the whole thing.

---

## 12. Primary content editing: Decap CMS

**Decap CMS** (formerly Netlify CMS) is the **main way** to create, edit, and delete blog posts (and optionally other content). Authors use the web UI at `/admin/`; changes are written to the Git repo and the site rebuilds on push.

### Why Decap as the primary workflow

- **Git-based** — All edits become commits in the repository. Content stays in `content/`, versioned and diffable; no database.
- **Static-first unchanged** — Hugo builds from the same Markdown; Decap is the editor, not a separate system.
- **Easier editing** — Form fields for front matter (title, date, description, category, tags, draft, featured); editor for body (Markdown or rich); image upload into the post folder (page bundle).
- **Works with Cloudflare Pages** — Admin is static files under `static/admin/`. GitHub backend: log in with GitHub, Decap commits; Cloudflare rebuilds on deploy.

### What’s in place

1. **Admin UI** — Decap’s `index.html` and `config.yml` live under `static/admin/`. The CMS is available at `https://www.yitaohe.com/admin/` (or your domain).
2. **GitHub backend** — Users log in with GitHub; Decap uses the GitHub API to read and write the repo. Only users with write access to the repo can create or edit content.
3. **Config** — `config.yml` defines collections for blog posts (e.g. one per language: EN and 中文), with fields matching the content model (§5) and path/slug rules so new posts follow `content/{lang}/blogs/{category}/{slug}/`.

### Multilingual

One collection per language (“Blog (EN)”, “Blog (中文)”) with `folder` pointing at `content/en/blogs/` and `content/zh/blogs/` respectively. Create or edit posts in the chosen language; translation sync (e.g. stub + draft in the other language) is a separate workflow (see [Translation](translation.md)).

### Operational notes

- **Preview** — Full live preview of the built Hugo page can be added later; typically authors save and check the site after deploy.
- **Auth** — Access to `/admin/` is effectively “who can log in with GitHub and has repo write access.” Optionally protect `/admin/` with Cloudflare Access (or similar) for an extra layer.
- **Content structure** — Collection `path` and `slug` in `config.yml` enforce the correct folder and URL shape (e.g. `blogs/system-design/my-post`).

---

## 13. References

- [v1.0 PRD](v1.0prd.md) — §4 URL structure, §5 content model, §6.2–6.3 blog listing and post, §8 SEO
- [Architecture](architecture.md) — Hugo, content/zh|en, layouts, partials
- [Translation](translation.md) — i18n, content sync; blog strings (e.g. “Blogs”, “Previous”) in `i18n/*.toml`
