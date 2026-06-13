# Development Roadmap

## Phase 0: Editorial Frontend

Status: Complete.

- Migrated frontend to Next.js App Router.
- Implemented warm-paper Reducto homepage.
- Added interactive use-case selection and Payload schema preview.
- Added real integrations, docs, and pricing landing sections for all primary nav anchors.
- Added typed content adapter for future Payload swap.
- Replaced generic Payload placeholder with collection-specific handoff previews.
- Added frontend-safe Payload DTO fixtures for documents, policies, audits, clauses, and comparisons.
- Verified desktop and mobile rendering.
- Deployed to Vercel.

## Phase 1: Payload Backend

Status: Complete (Verified on localhost).

- Added Payload CMS as a separate backend app under `reducto-backend/`.
- Defined collections for site settings, workflow phases, use cases, gap analyses, schema templates, and documents, policies, audits, clauses, comparisons.
- Implemented `/api/reducto-content` endpoint mapping the local/dynamic collection structures into the frontend-safe DTO contract (`ReductoContent`).
- Configured local development database bindings (Cloudflare D1/R2) via Wrangler proxy mocks.
- Added backend API contract smoke tests and frontend environment switch with static fallback for local integration.

## Phase 1A: Repository And CI

Status: Ready for remote.

- Local git checkpoint should be created before backend work begins.
- GitHub remote should be added when the repository destination is chosen.
- CI workflow is prepared for build and smoke verification.

## Phase 2: Workflow Persistence

Status: Planned.

- Persist use cases, gaps, and workflow phases.
- Add review/publish states.
- Add regression checks against use-case coverage.

## Open Questions

None.
