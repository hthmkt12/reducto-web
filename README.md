# Reducto

Warm-paper editorial frontend for Reducto, an agentic document platform for AI teams. The current app is a static Next.js App Router export deployed to Cloudflare Pages. The public page presents Reducto's parse, split, extract, edit, and classify capabilities with a magazine-on-warm-paper visual system.

## Live

- Production: https://reducto.pages.dev

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS-first warm-paper design system
- Cloudflare Pages
- GitHub Actions-ready CI

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test:smoke
npm run preview:cloudflare
npm run deploy:cloudflare
```

`npm run build` writes the static production artifact to `out/`.

`npm run start` serves the existing `out/` directory with Cloudflare Pages local dev on port 3000. Run `npm run build` first if `out/` does not exist.

`npm run test:smoke` checks the production URL by default. To test a local server, run it with `SMOKE_BASE_URL=http://localhost:3000`.

`npm run deploy:cloudflare` builds and deploys `out/` to the Cloudflare Pages project `reducto`.

## Content Boundary

Keep this frontend consuming public site data through `src/data/reducto-content.ts` and frontend-safe DTO modules. Do not import backend/server code into browser components.

The frontend preview surface maps product capabilities for `parse`, `split`, `extract`, `edit`, and `classify` in `src/data/payload-handoff.ts`. The file name is legacy, but the public copy now represents Reducto API capabilities instead of CMS collection marketing.

Integration architecture:

```text
Reducto frontend repo/app -> HTTP Fetch / api/reducto-content -> optional content backend
```

The backend is a standalone application in the `reducto-backend/` directory, designed to deploy independently from the landing page if dynamic content is needed.

## Local Development with Content Backend

To run the frontend integrated with the local backend:

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
   $env:NEXT_PUBLIC_REDUCTO_CONTENT_API_URL="http://localhost:3001/api/reducto-content"
   npm run dev
   ```
   If `NEXT_PUBLIC_REDUCTO_CONTENT_API_URL` and `REDUCTO_CONTENT_API_URL` are omitted, or if the API fetch fails/is invalid, the frontend automatically falls back to the local static content defined in `src/data/reducto-static-content.ts`.

3. Run backend API contract smoke tests:
   ```bash
   cd reducto-backend
   pnpm run test:smoke:content
   ```

## CI

This repo includes a GitHub Actions workflow at `.github/workflows/ci.yml`. It runs:

- `npm ci`
- `npm run build`
- local Cloudflare Pages smoke and E2E tests against `out/`
- production Cloudflare Pages deploy on pushes to `main` when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured

## Open Questions

None.
