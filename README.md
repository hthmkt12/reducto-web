# Reducto

Warm-paper editorial frontend for a use-case-driven document workflow. The current app is a Next.js App Router build deployed to Vercel. Backend integration is intentionally deferred; the UI consumes a typed local content adapter that can later swap to Payload without rewriting the components.

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

Payload CMS should be added later as a separate backend/headless CMS app. Keep this frontend consuming data through `src/data/reducto-content.ts` or a future API client instead of importing Payload server code into browser components.

Recommended future shape:

```text
Reducto frontend repo/app -> Payload API client -> separate Payload backend app
```

The backend can live in a separate repository or a sibling app, but it should deploy independently from the landing page.

## CI

This repo includes a GitHub Actions workflow at `.github/workflows/ci.yml`. It runs:

- `npm ci`
- `npm run build`
- `npm run test:smoke`

The repo currently has no GitHub remote configured, so CI will activate after a remote repository is created and pushed.

## Open Questions

None.
