# Reducto Agent Instructions

## Language

Respond in the same language as the user's prompt. Match the user's language naturally.

## Project Context

Reducto is a warm-paper editorial frontend for a use-case-driven document workflow. It is a Next.js App Router app deployed to Vercel.

Backend integration is deferred. Keep the frontend consuming data through `src/data/reducto-content.ts` or a future API client instead of importing backend/CMS server code into browser components.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS-first warm-paper design system
- Vercel
- GitHub Actions-ready CI

## Running

```bash
npm run dev
npm run build
npm run start
npm run test:smoke
```

`npm run test:smoke` checks production by default. For local testing, run it with `SMOKE_BASE_URL=http://localhost:3000`.

## Bugfix Memory

Before fixing any bug, always check `docs/common-issues.md` first to see whether the symptom, root cause, or known workaround is already documented.

After every bug fix, add an entry to `docs/common-issues.md` using this format:

```markdown
## YYYY-MM-DD - Short Issue Title

### Symptoms

### Root Cause

### Common Triggers

### Solutions

### Verification
```

## Karpathy Coding Principles

Four guardrails against the most common LLM coding failures (source: Andrej Karpathy).

### 1. Think Before Coding

- State assumptions explicitly before writing code
- When multiple interpretations exist, present them; never pick silently
- Push back if a simpler approach exists
- If something is unclear, stop and ask before proceeding

### 2. Simplicity First

- No features beyond what was explicitly asked
- No abstractions for single-use code
- No flexibility or configurability not requested
- No error handling for impossible scenarios
- Self-test: "Would a senior engineer say this is overcomplicated?" If yes, rewrite
- If 200 lines could be 50, rewrite it

### 3. Surgical Changes

- Do not improve adjacent code, comments, or formatting
- Do not refactor things that are not broken
- Match existing style even if you would do it differently
- If you notice unrelated dead code: mention it, do not delete it
- When your changes create orphans such as unused imports, variables, or functions: clean those up
- Litmus test: every changed line must trace directly to the user's request

### 4. Goal-Driven Execution

- Transform tasks into verifiable goals with success criteria
- "Add validation" means write tests for invalid inputs, then make them pass
- "Fix the bug" means write a test that reproduces it, then make it pass
- "Refactor X" means ensure tests pass before and after
- Multi-step plans must have explicit verify conditions per step

## Implementation Rules

- Read `README.md` before planning or implementation.
- Follow existing codebase structure and style.
- Keep changes focused on the user's request.
- Prefer YAGNI, KISS, and DRY.
- Do not create enhanced duplicate files; update existing files directly.
- If a code file exceeds 200 lines, consider whether modularization is warranted before expanding it.
- Run a compile or validation command after creating or modifying code. For this project, prefer `npm run build`; add focused tests or smoke checks when relevant.
- Never commit secrets, dotenv contents, API keys, or credentials.

## Documentation

Important project docs live in `docs/`. Update relevant docs after feature work, bug fixes, security changes, or major implementation decisions.

Maintain bugfix learnings in `docs/common-issues.md` so future agents can avoid repeatedly fixing the same issue.
