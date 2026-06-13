# Common Issues

Living bugfix memory for Reducto. Before fixing any bug, check this file for matching symptoms, root causes, or known workarounds. After each bug fix, add a concise entry using the format below.

## Entry Template

```markdown
## YYYY-MM-DD - Short Issue Title

### Symptoms

- What the user or system observes.

### Root Cause

- The verified underlying cause.

### Common Triggers

- Inputs, environments, flows, or changes that tend to expose it.

### Solutions

- The fix or workaround that resolved it.

### Verification

- Commands, tests, screenshots, deployments, or manual checks proving the fix.
```

## Known Issues

## 2026-06-10 - Landing Page Anchors Missing Sections

### Symptoms

- Top nav links for Integrations, Docs, and Pricing updated the URL hash but did not scroll to real content.
- Workflow CTAs sent users to anchors that were absent or too thin to be useful.
- Mobile nav hid destination links behind a non-functional menu icon.

### Root Cause

- Seed content defined nav items before the matching landing sections existed in the shipped page.
- Mobile header CSS suppressed nav links without implementing menu state.

### Common Triggers

- Adding navigation labels before adding corresponding `id` sections.
- Hiding mobile nav links behind placeholder menu controls.

### Solutions

- Added typed seed content and rendered warm-paper sections for `#integrations`, `#docs`, and `#pricing`.
- Pointed CTAs to existing anchors and kept mobile nav links visible as a scrollable row.

### Verification

- Run `npm run build` to confirm the Next.js page compiles with the expanded content contract.
- Use Playwright against `next start` to verify desktop and mobile anchor jumps for `#integrations`, `#docs`, `#pricing`, `#contact`, `#schema`, and `#use-cases`.

## 2026-06-10 - App hashchange event listener useEffect regression

### Symptoms

- Hashchange listener runs on every render instead of persisting across lifecycle.
- State updates inside hashchange listener cause infinite loops or multiple registrations.

### Root Cause

- The `useEffect` hook handling the window `hashchange` event lacked a dependency array, causing it to run on every render.

### Common Triggers

- Committing changes that accidentally omit the dependency array in React `useEffect` hooks.

### Solutions

- Re-introduced the empty dependency array `[],` to the `useEffect` block so the listener persists across the component lifecycle.

### Verification

- Run `npm run test:e2e` to verify all 60 tests (including T2-PhaseRail-4) pass.

## 2026-06-12 - Smoke Test Selector Timeout

### Symptoms

- Smoke test execution fails with `Timeout 30000ms exceeded` waiting for `button[aria-label^="04. Patch"]`.

### Root Cause

- The phase rail items were refactored from `button` elements to semantic `a` (anchor) tags to support SEO and navigation linking. The smoke test script specifically queried for `button` elements, which no longer matched.

### Common Triggers

- Modifying the underlying HTML tags (e.g., from `button` to `a`) without updating the specific element locators in testing scripts.

### Solutions

- Modified `scripts/smoke-test.cjs` to target any element with `[aria-label^="04. Patch"]` instead of specifically `button[aria-label^="04. Patch"]`.

### Verification

- Run `$env:SMOKE_BASE_URL="http://localhost:3000"; npm run test:smoke` against a local server build, and `npm run test:smoke` against production.

## 2026-06-12 - Payload Cloudflare Backend Build & Run Fixes

### Symptoms

- Build (`next build`) failed during compilation complaining about missing type declarations for side-effect CSS / SCSS imports and `@payloadcms/next/css`.
- Build failed during static page generation attempting to call the remote Cloudflare API for database bindings.
- Next.js production start (`next start`) crashed with `TypeError: Cannot read properties of undefined (reading 'endsWith')` in `payload.config.ts`.

### Root Cause

- The strict TypeScript configuration in Next.js required explicit module definitions for side-effect styles.
- OpenNext / Cloudflare bindings default to remote connection logic when in production mode, which fails without Cloudflare auth.
- `process.argv` items can be empty or not represent paths, causing the custom `isCLI` check's `realpath(value)` call to return `undefined`.

### Common Triggers

- Scaffolding a backend on a subfolder inside a repository containing a root package manager.
- Compiling a Next.js / Payload 3.0 Cloudflare template without active Cloudflare CLI login or local overrides.

### Solutions

- Created `css.d.ts` declaring wildcard modules for `*.css`, `*.scss`, and `@payloadcms/next/css`.
- Introduced `process.env.LOCAL_BUILD` to bypass remote API bindings context during local builds and runtime.
- Added safety checks in `src/payload.config.ts` to skip `endsWith` when `realpath` returns `undefined`.

### Verification

- Run `pnpm run build` in `reducto-backend` to ensure clean compile.
- Run `$env:LOCAL_BUILD="true"; npx next start -p 3001` and verify route `/api/reducto-content` returns valid JSON.

## 2026-06-13 - Root and Backend Tooling Boundary Conflicts

### Symptoms

- Root `npm run build` fails checking backend TypeScript code.
- Backend `pnpm run lint` fails on generated code inside `.wrangler/tmp/` directory.

### Root Cause

- The root `tsconfig.json` included `**/*.ts` and `**/*.tsx` recursively, pulling `reducto-backend/src/` into the frontend build check.
- ESLint Flat Config in the backend lacked ignores for local runtime wrangler build caches and open-next generation directories.

### Common Triggers

- Running root scripts on a Next.js / Payload multi-app repository without isolating directory configurations.

### Solutions

- Added `reducto-backend` to the root `tsconfig.json` `exclude` array.
- Configured `.wrangler/` and `.open-next/` directories in `reducto-backend/eslint.config.mjs` flat ignores.

### Verification

- Run root `npm run build` and backend `pnpm run lint`.

## 2026-06-13 - Payload Integration Test Environment Invariant Failure

### Symptoms

- Running `pnpm run test:int` in `reducto-backend` fails before executing tests with:
  `Invariant violation: new TextEncoder().encode("") instanceof Uint8Array is incorrectly false`

### Root Cause

- The integration tests are server-side and import the Payload configuration/Wrangler proxy, but `vitest.config.mts` was set to use the browser-like `'jsdom'` environment.
- The global JSDOM context overrides the `Uint8Array` constructor, creating a constructor mismatch with Node's native `Uint8Array` constructor expected by Wrangler/esbuild.

### Common Triggers

- Running node-bound integration tests using a frontend browser environment (jsdom/happy-dom).

### Solutions

- Configured `reducto-backend/vitest.config.mts` to use the `'node'` environment.

### Verification

- Run `pnpm run test:int` in `reducto-backend` to verify the integration test suite passes.

## 2026-06-13 - CI Vercel Preview Token Failure

### Symptoms

- GitHub Actions `build-and-smoke` fails at `vercel pull` with `The token provided via --token argument is not valid`.
- Root `npm run build` passes before the Vercel step.

### Root Cause

- The CI workflow made Vercel preview deployment mandatory for every PR smoke run.
- An invalid or expired `VERCEL_TOKEN` secret blocked the whole job before smoke tests could run.

### Common Triggers

- Rotating or deleting the Vercel token without updating the GitHub repository secret.
- Running PR CI before Vercel preview credentials are configured.

### Solutions

- Keep root build mandatory.
- Make Vercel preview smoke tests run only when `vercel pull` succeeds.
- Fall back to local `next start` smoke and E2E tests when Vercel auth is unavailable.

### Verification

- Run `npm.cmd run build`.
- Push the workflow update and confirm the PR CI falls back to local smoke/E2E when Vercel auth fails.
