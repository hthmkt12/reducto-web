# Reducto

Warm-paper editorial frontend for a use-case-driven document workflow. The current app is a Next.js App Router build deployed to Vercel. Backend integration is supported; the UI consumes a typed local content adapter and a narrow frontend-safe API boundary. A local Payload CMS backend app is implemented under `reducto-backend`, and the frontend can optionally consume it via `REDUCTO_CONTENT_API_URL` or fall back to the built-in static content.

## Live

- Production: https://reducto-weld.vercel.app
- Latest deployment from this run: https://reducto-e9ke2p6xq-tiximaxs-projects.vercel.app

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS-first warm-paper design system
- Vercel
- GitHub Actions-ready CI

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test:smoke
npm run deploy:vercel
```

`npm run test:smoke` checks the production URL by default. To test a local server, run it with `SMOKE_BASE_URL=http://localhost:3000`.

`npm run deploy:vercel` assumes the workspace is linked to a Vercel project. For a fresh clone, run `npx vercel link` first and choose a lowercase project name such as `reducto`.

## Payload Boundary

Payload CMS is implemented as a separate backend app under `reducto-backend`. Keep this frontend consuming data through `src/data/reducto-content.ts` and frontend-safe DTO modules instead of importing Payload server code into browser components.

The frontend handoff surface maps collection-specific previews for `documents`, `policies`, `audits`, `clauses`, and `comparisons` in `src/data/payload-handoff.ts`. These previews show the collection configurations, fields, relationships, ownership, and workflow states from the backend.

Integration architecture:

```text
Reducto frontend repo/app -> HTTP Fetch / api/reducto-content -> separate Payload backend app (reducto-backend)
```

The backend is a standalone application in the `reducto-backend/` directory, designed to deploy independently from the landing page.

## Local Development with Payload Backend

To run the frontend integrated with the local Payload CMS backend:

1. Start the Payload backend server (e.g., on port 3001):
   ```bash
   cd reducto-backend
   # Run in development mode:
   npx cross-env PORT=3001 pnpm run dev
   # Or run the compiled production build:
   npx cross-env PORT=3001 pnpm run start
   ```
   The backend will be available at `http://localhost:3001`.

2. Start the frontend with the backend API URL:
   ```bash
   # Set the environment variable:
   $env:REDUCTO_CONTENT_API_URL="http://localhost:3001/api/reducto-content"
   npm run dev
   ```
   If `REDUCTO_CONTENT_API_URL` is omitted, or if the API fetch fails/is invalid, the frontend automatically falls back to the local static content defined in `src/data/reducto-static-content.ts`.

3. Run backend API contract smoke tests:
   ```bash
   cd reducto-backend
   pnpm run test:smoke:content
   ```

## CI

This repo includes a GitHub Actions workflow at `.github/workflows/ci.yml`. It runs:

- `npm ci`
- `npm run build`
- `npm run test:smoke`

The repo currently has no GitHub remote configured, so CI will activate after a remote repository is created and pushed.

## Open Questions

None.
