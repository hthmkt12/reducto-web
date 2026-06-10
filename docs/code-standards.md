# Code Standards

## Frontend

- Keep components focused and compositional.
- Keep code files under 200 lines where practical.
- Use Next.js App Router for routing, metadata, static rendering, and deployment compatibility with Vercel.
- Keep client components narrow; add `"use client"` only where browser state or DOM APIs are required.
- Use `src/data` for typed seed content and future API-shaped adapters.
- Keep visual tokens in CSS variables.
- Use warm paper palette only: off-white paper, deep plum, warm beige, magenta action accent.
- Avoid blue accents, heavy shadows, glass effects, and generic dashboard chrome.

## Styling

- Prefer paper-thin borders over elevation.
- Use serif display type for brand and editorial headings.
- Use sans utility type for controls, labels, and rows.
- Keep card radius low.

## Payload

- Do not import Payload server code into frontend components.
- Add a dedicated API client when the backend is introduced.
- Preserve the `ReductoContent` adapter shape so Payload can replace local seed data without component rewrites.

## Open Questions

None.
