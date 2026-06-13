# Project Changelog

## 2026-06-13

### Added
- Added Cloudflare Pages deployment scripts for the frontend static export.
- Added an API contract smoke test script `test:smoke:content` to the backend to validate `/api/reducto-content` JSON schema and phase/use-case bounds.
- Added a frontend-to-backend integration switch using `REDUCTO_CONTENT_API_URL` with a static fallback on fetch/validation failures.
- Documented local backend run commands, environment variable usage, and smoke testing in README files.

### Changed
- Migrated the frontend deployment target from Vercel to Cloudflare Pages static export.
- Updated CI to verify the built `out/` artifact through Cloudflare Pages local dev and deploy to Cloudflare Pages from `main` when Cloudflare secrets are present.
- Added `NEXT_PUBLIC_REDUCTO_CONTENT_API_URL` support for frontend-safe static deployments.
- Configured backend ESLint and Vitest integration test environments to optimize type checking and test performance.

## 2026-06-10

### Added

- Added real anchored workflow phase sections for Brief, Build, Check, Patch, and Expand.
- Added frontend-only phase navigation data module for hash targets and workflow panel copy.
- Initialized separate Payload CMS backend project `reducto-backend` with Cloudflare D1/R2 and Wrangler emulation.
- Created Payload collections for `site-settings`, `workflow-phases`, `use-cases`, `gap-analyses`, and `schema-templates`.
- Implemented database seeding script to populate local D1 database with static content.
- Added custom `/api/reducto-content` API endpoint to Payload config serving structured data.
- Configured Webpack fallbacks for Node.js core modules in backend Next.js configuration to bypass browser bundling issues.
- Set up Vercel CLI repository secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) on GitHub to enable dynamic preview smoke tests.
- Created Reducto React/Vite frontend.
- Added warm-paper editorial design system: off-white paper, deep plum, magenta CTA, beige borders, minimal shadow.
- Built hero, phase rail, use case list, gap analysis, and Payload model preview.
- Added warm-paper integrations, docs, and pricing sections so every primary landing-page nav anchor resolves.
- Added local interaction for selecting use cases and updating schema slug.
- Added canonical preview screenshot at `public/screenshot.jpeg`.
- Added Cloudflare Pages config and deploy script.
- Added Next.js App Router shell with metadata and optimized font loading.
- Added typed `ReductoContent` adapter at `src/data/reducto-content.ts`.
- Added frontend-safe Payload handoff fixtures for `documents`, `policies`, `audits`, `clauses`, and `comparisons`.
- Added collection metadata, field previews, relationship hints, ownership, and workflow states to the Payload model UI.
- Added Vercel deployment config and deploy script.
- Added Playwright smoke-test script for title, H1, interaction, and mobile overflow checks.
- Added GitHub Actions CI workflow for build and smoke checks.

### Changed

- Changed the phase rail from cosmetic local state to semantic hash navigation with scroll-synced active state.
- Migrated the app from Vite/Cloudflare Pages wiring to Next.js/Vercel.
- Passed nav, phase, use-case, gap, and schema content into components through props.
- Split static seed data from the content adapter and expanded the content contract with landing sections.
- Replaced generic Payload model code placeholder with a real backend handoff surface.
- Kept remote API payloads behind the `ReductoContent` adapter with static fallbacks for frontend-only sections.
- Reworked mobile navigation to keep primary anchor links visible instead of hiding them behind a placeholder menu.
- Refreshed `public/screenshot.jpeg` from the Next.js production build.
- Documented Payload as a separate backend app boundary.

### Removed

- Retired Vite entrypoint, config, build artifacts, and Wrangler Pages config.

### Verified

- `npm run build` after landing-section navigation implementation.
- Playwright desktop and mobile anchor checks for integrations, docs, pricing, contact, schema, and use cases.
- `npm run build` after phase navigation implementation.
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
