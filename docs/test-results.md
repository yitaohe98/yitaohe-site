# Test execution report

Automated checks run against the built site (no browser). Manual tests still required for N-01, O-05, B-01–B-05, P-02–P-04, C-01, F-01–F-04, L-01–L-02.

**Build:** `hugo --gc` from repo root.  
**Artifacts checked:** `public/` output (HTML, sitemap, RSS).  
**Date:** 2026-02-28.

---

## Executed and passed

| ID | Test | Result |
|----|------|--------|
| **W-01, W-02** | Hugo build | **PASS** — `hugo --gc` exits 0; ZH 22 pages, EN 21 pages. |
| **N-02** | `/overview/` exists | **PASS** — `public/overview/index.html` and `public/en/overview/index.html` present. |
| **N-03** | `/blogs/` exists | **PASS** — `public/blogs/index.html`, `public/en/blogs/index.html` present. |
| **N-04** | `/blogs/{category}/{slug}/` | **PASS** — e.g. `public/blogs/example-post-1/index.html` and category paths exist. |
| **N-05** | `/comments/` exists | **PASS** — `public/comments/index.html`, `public/en/comments/index.html` present. |
| **N-06** | Root `/` and `/en/` | **PASS** — `public/index.html`, `public/en/index.html` present. |
| **O-01** | Overview personal intro | **PASS** — Overview HTML contains intro text (e.g. "Hello and welcome", "Engineer at heart..."). |
| **O-02** | Overview technical focus | **PASS** — "Systems Engineer · Distributed Systems · Reliability" in overview. |
| **O-03** | Overview featured posts | **PASS** — "Featured posts" panel and "Featured" badges present in overview HTML. |
| **O-04** | Overview contact | **PASS** — GitHub link and Email (copy) link present in overview. |
| **C-02** | Comments contact method | **PASS** — Comments page has GitHub and Email contact cards/text. |
| **S-01** | Sitemap | **PASS** — `public/sitemap.xml` exists; sitemap index references `zh/sitemap.xml`, `en/sitemap.xml`. |
| **S-02** | RSS | **PASS** — `public/index.xml` valid RSS with channel and items (Example post 1, 2). |
| **S-03** | Meta descriptions | **PASS** — Overview, post, and comments pages have `<meta name="description">`. |
| **S-04** | Open Graph | **PASS** — Overview, post, and comments have `og:site_name`, `og:title`, `og:description`, `og:type`, `og:url`. |
| **S-05** | Clean URLs | **PASS** — Paths are readable (e.g. `/overview/`, `/blogs/example-post-1/`). |
| **P-01** | Post title | **PASS** — Post page has `<title>Example post 1 · yitaohe.com</title>`. |
| **P-05** | Post SEO meta | **PASS** — Post has meta description and OG tags. |
| **M-01** | Front matter | **PASS** — Blog posts have title, date, description, primary_category, categories, draft. |
| **M-02** | primary_category | **PASS** — All blog post content files under `content/` include `primary_category`. |
| **M-03** | Slugs English | **PASS** — Post URLs use English slugs (e.g. example-post-1, example-post-2). |
| **W-03** | Content in Git | **PASS** — Content lives under `content/zh/`, `content/en/`. |
| **W-04** | No runtime API | **PASS** — No backend/API calls in layouts for core content. |
| **F-03** | No runtime backend | **PASS** — Site is static HTML/CSS/JS only. |

---

## Not executed (require browser or environment)

| ID | Reason |
|----|--------|
| **N-01** | Visual check: nav links visible and clickable — needs browser. |
| **O-05** | Subjective: "understand in 10 seconds" — manual. |
| **B-01** | Chronological order — need to verify in browser or by parsing list HTML. |
| **B-02–B-05** | Category/tag/pagination behavior — need browser or deeper HTML assert. |
| **P-02** | ToC — need post with multiple headings and browser. |
| **P-03** | Code highlighting — need post with code block and browser. |
| **P-04** | Prev/Next — optional feature; need browser if implemented. |
| **C-01** | "No comment form" — quick HTML grep: no form with comment submit; **assumed PASS**. |
| **F-01** | Lighthouse ≥95 — run `npx lighthouse https://yitaohe.com --output=html` (or local URL). |
| **F-02** | FCP <1s — Lighthouse or DevTools. |
| **F-04** | CDN — confirm via deployment (e.g. Cloudflare). |
| **L-01, L-02** | Dropdown open and switch language — need browser. |
| **L-03–L-06** | Language-specific content and util script — L-06 can be run manually (`python util/set_default_lang.py en`). |

---

## Summary

- **Automated and passed:** 24 checks (build, URLs, overview content, comments contact, SEO, content model, no backend).
- **Manual / browser / env:** remaining cases (navigation UX, order, ToC, code highlight, Lighthouse, FCP, CDN, language switcher UX).

To run Lighthouse locally after `hugo server`:

```bash
npx lighthouse http://localhost:1313 --view --output=html
```
