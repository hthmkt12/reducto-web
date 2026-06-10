# Project Changelog

## 2026-06-10

### Added

- Created Reducto React/Vite frontend.
- Added warm-paper editorial design system: off-white paper, deep plum, magenta CTA, beige borders, minimal shadow.
- Built hero, phase rail, use case list, gap analysis, and Payload model preview.
- Added local interaction for selecting use cases and updating schema slug.
- Added canonical preview screenshot at `public/screenshot.jpeg`.
- Added Cloudflare Pages config and deploy script.
- Added Next.js App Router shell with metadata and optimized font loading.
- Added typed `ReductoContent` adapter at `src/data/reducto-content.ts`.
- Added Vercel deployment config and deploy script.
- Added Playwright smoke-test script for title, H1, interaction, and mobile overflow checks.
- Added GitHub Actions CI workflow for build and smoke checks.

### Changed

- Migrated the app from Vite/Cloudflare Pages wiring to Next.js/Vercel.
- Passed nav, phase, use-case, gap, and schema content into components through props.
- Refreshed `public/screenshot.jpeg` from the Next.js production build.
- Documented Payload as a separate backend app boundary.

### Removed

- Retired Vite entrypoint, config, build artifacts, and Wrangler Pages config.

### Verified

- `npm run build`
- Playwright desktop screenshot at 1200x750.
- Playwright mobile overflow check at 390x844.
- Playwright interaction checks for use-case schema updates and phase selection.
- `npm run test:smoke`
- Production page loads at `https://reducto-weld.vercel.app/`.

## Open Questions

None.
