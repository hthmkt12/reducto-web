# Project Changelog

## 2026-06-10

### Added

- Initialized separate Payload CMS backend project `reducto-backend` with Cloudflare D1/R2 and Wrangler emulation.
- Created Payload collections for `site-settings`, `workflow-phases`, `use-cases`, `gap-analyses`, and `schema-templates`.
- Implemented database seeding script to populate local D1 database with static content.
- Added custom `/api/reducto-content` API endpoint to Payload config serving structured data.
- Configured Webpack fallbacks for Node.js core modules in backend Next.js configuration to bypass browser bundling issues.
- Set up Vercel CLI repository secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) on GitHub to enable dynamic preview smoke tests.
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

- Verified all 60 Playwright E2E and fallback test cases successfully on the frontend.
- Verified `/api/reducto-content` endpoint locally on the backend.
- `npm run build` on both frontend and backend projects.
- Playwright desktop screenshot at 1200x750.
- Playwright mobile overflow check at 390x844.
- Playwright interaction checks for use-case schema updates and phase selection.
- `npm run test:smoke`
- Production page loads at `https://reducto-weld.vercel.app/`.

## Open Questions

None.
