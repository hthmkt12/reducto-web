# Development Roadmap

## Phase 0: Reducto Frontend

Status: Complete.

- Migrated frontend to Next.js App Router.
- Implemented warm-paper Reducto homepage using the magazine-on-warm-paper visual direction.
- Added interactive industry selection and API capability preview.
- Added platform, API, industries, and pricing landing sections for all primary nav anchors.
- Added typed content adapter for future Payload swap.
- Replaced generic workflow copy with Reducto document AI content for parse, split, extract, edit, and classify.
- Added frontend-safe API capability fixtures for finance, healthcare, insurance, legal, and operations.
- Verified desktop and mobile rendering.
- Deployed to Cloudflare Pages.

## Phase 1: Payload Backend

Status: Complete (Verified on localhost).

- Added Payload CMS as a separate backend app under `reducto-backend/`.
- Defined collections for site settings, workflow phases, use cases, gap analyses, schema templates, and documents, policies, audits, clauses, comparisons.
- Implemented `/api/reducto-content` endpoint mapping the local/dynamic collection structures into the frontend-safe DTO contract (`ReductoContent`).
- Configured local development database bindings (Cloudflare D1/R2) via Wrangler proxy mocks.
- Added backend API contract smoke tests and frontend environment switch with static fallback for local integration.

## Phase 1A: Repository And CI

Status: Cloudflare-ready.

- Local git checkpoint should be created before backend work begins.
- GitHub remote is configured.
- CI workflow builds the static export, verifies the Cloudflare Pages artifact locally, and deploys to Cloudflare Pages from `main` when Cloudflare secrets are configured.

## Phase 2: Workflow Persistence

Status: Planned.

- Persist use cases, gaps, and workflow phases.
- Add review/publish states.
- Add regression checks against use-case coverage.

## Open Questions

None.
