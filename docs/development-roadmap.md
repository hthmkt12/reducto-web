# Development Roadmap

## Phase 0: Editorial Frontend

Status: Complete.

- Migrated frontend to Next.js App Router.
- Implemented warm-paper Reducto homepage.
- Added interactive use-case selection and Payload schema preview.
- Added typed content adapter for future Payload swap.
- Verified desktop and mobile rendering.
- Deployed to Vercel.

## Phase 1: Payload Backend

Status: Planned.

- Add Payload CMS as a separate backend app.
- Define collections for documents, policies, audits, clauses, and comparisons.
- Expose frontend-safe REST or GraphQL data access.
- Add auth and access rules before editorial writes.
- Keep the frontend consuming the existing `ReductoContent` contract.

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
