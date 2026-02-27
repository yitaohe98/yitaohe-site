# 002 - Cloudflare Pages for hosting

## Decision

The site is deployed using **Cloudflare Pages**.

## Context

The PRD specifies Cloudflare Pages as the hosting platform for v1.0.

## Consequences

- Builds are triggered on `git push`.
- Hugo is run in the Cloudflare Pages build environment to generate the static site.
- The result is served from Cloudflare's global CDN without additional backend infrastructure.

