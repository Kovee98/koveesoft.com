# Koveesoft

A prerendered landing page for an independent software studio. Nuxt uses Vue and Vite during development and builds plain static assets, which are served by a static-assets-only Cloudflare Worker ([`wrangler.jsonc`](./wrangler.jsonc)). No Worker script runs, so requests to the site are free and unlimited.

## Local development

Use the Node version in [`.nvmrc`](./.nvmrc).

```sh
npm ci
npm run dev        # Nuxt dev server
npm run typecheck
npm run build      # writes .output/public
npm run preview    # serves the build with Cloudflare's Workers routing
```

## Publishing

GitHub Actions builds and deploys the site. For public repositories, [standard GitHub-hosted runners](https://docs.github.com/en/billing/concepts/product-billing/github-actions) are free with no minute quota, while [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/) is capped at 3,000 build minutes a month on the free plan.

- [`ci.yml`](./.github/workflows/ci.yml) type-checks, builds, and dry-runs the deploy on every push to `main` and on pull requests. It never publishes.
- [`deploy.yml`](./.github/workflows/deploy.yml) publishes to Cloudflare when you **publish a GitHub Release**, or when you run it manually from `main` in the Actions tab.

### One-time setup

1. Push this repository to GitHub with `main` as the default branch.
2. In Cloudflare, go to **My Profile > API Tokens > Create Token** and use the **Edit Cloudflare Workers** template, limited to your account. Copy your **Account ID** from the account home page.
3. Store both as secrets on a `production` environment (paste the values when prompted, so they never land in your shell history):

   ```sh
   gh secret set CLOUDFLARE_API_TOKEN --env production
   gh secret set CLOUDFLARE_ACCOUNT_ID --env production
   ```

   Optionally, add required reviewers to the `production` environment for an extra approval step.
4. Publish a release, for example `gh release create 0.1.0 --generate-notes`. The first deploy creates the `koveesoft` Worker at `https://koveesoft.<your-subdomain>.workers.dev`. Set a `SITE_URL` repository variable to show that link on deployments.

### Custom domain

Both `koveesoft.com` and `www.koveesoft.com` are attached to the Worker as custom domains in [`wrangler.jsonc`](./wrangler.jsonc); Cloudflare creates their DNS records and certificates on deploy. A hostname that already has a DNS record can't be claimed, so delete any existing `A`/`AAAA`/`CNAME` records for `@` and `www` first.

The site is served from the apex. A zone Redirect Rule (**Rules → Redirect Rules → Redirect from WWW to root** template, 301, preserve path and query) sends `www` there. After the domain works, set `"workers_dev": false` so the site only answers on its canonical domain, and submit `https://koveesoft.com/sitemap.xml` in Google Search Console.

To roll back, use **Workers & Pages > koveesoft > Deployments** in Cloudflare, or run `npx wrangler rollback`.

## Pages

- `/`: a single-screen landing page (no scrolling on common phone, tablet, and desktop sizes) with one destination, **Games**.
- `/games`: the game library. Each entry in the `games` list in [`app/pages/games.vue`](./app/pages/games.vue) is either a real title (name, tagline, genre, logo, and background color) or an empty "Coming soon" placeholder slot. Put game logos in `public/images/` as SVG so they stay sharp at any size (`paper-sudoku.svg` is a cleaned copy of the Paper layer from the Paper Sudoku store art, with text converted to paths). Add new routes to [`public/sitemap.xml`](./public/sitemap.xml).

Nuxt is configured to emit `games.html` (not `games/index.html`), so Cloudflare serves the clean URL `/games` and redirects `/games/` and `/games.html` to it. Unknown paths get `404.html` with a 404 status.

## Brand and social links

- Update public profile URLs in [`app/data/contact.ts`](./app/data/contact.ts). They render as icon links in the footer of every page (with `rel="me"` and accessible names) and in the home page's Organization structured data as `sameAs`. Use visitor-facing profile pages, not admin links. The support email and Discord username are shown next to the icons.
- Platform icons come from [Simple Icons](https://simpleicons.org/) (CC0). Simple Icons doesn't include LinkedIn, so that one is a hand-drawn path in `contact.ts`.
- The master logo is the Inkscape file [`logo.svg`](./logo.svg). It isn't served because it contains hidden reference images. After editing it, regenerate every logo asset from Git Bash (needs Inkscape, ImageMagick 7, and `npm ci`):

  ```bash
  ./scripts/brand.sh
  ```

  [`scripts/brand.sh`](./scripts/brand.sh) exports the layer labeled "K" (set `LOGO_LAYER` for another layer), flattens it into small SVGs with [`scripts/brand-mark.mjs`](./scripts/brand-mark.mjs), and renders the PNGs. It fixes the faint seams between facets on its own: a solid backing in the facets' average color goes underneath, and each facet gets a hairline stroke in its own color, all clipped to the K's outline. So `logo.svg` doesn't need a backing layer. Outputs:
  - [`public/studio-mark.svg`](./public/studio-mark.svg): header, home page art, and social card, with about 10% padding.
  - [`public/favicon.svg`](./public/favicon.svg), `public/favicon.ico` (16/32/48 px), and `public/apple-touch-icon.png` (180 px): browser and home-screen icons.
  - `public/logo-512.png`: the `logo` in the home page's Organization structured data.
  - `public/social-card.png`: rendered from [`design/social-card.svg`](./design/social-card.svg).
  - [`design/avatars/`](./design/avatars/): 1080 × 1080 profile pictures for social accounts on white, light-gray, navy (`avatar-dark`), or transparent backgrounds. The K fills 60% of the square, so circular crops don't clip it. `mark-transparent-2048.png` is the K alone, unpadded, for other uses.
  - [`design/banners/`](./design/banners/): profile banners for X (1500 × 500), Bluesky (3000 × 1000), LinkedIn (1512 × 256), YouTube (2560 × 1440), and Reddit (1920 × 384). Each is the home page's navy background, redrawn at that size by [`scripts/brand-banner.mjs`](./scripts/brand-banner.mjs), saved as JPEG to stay under upload limits. To change the look, edit `.home-art` in `site.css` and the matching gradients in that script.
- Typefaces are Montserrat (headings and labels) and Inter (text), both SIL Open Font License, self-hosted via Fontsource.
- Edit [`design/social-card.svg`](./design/social-card.svg) in Inkscape, then run `./scripts/brand.sh` to export it as `public/social-card.png` at 1200 × 630. Its text is already converted to outlines, so the fonts don't need to be installed.
