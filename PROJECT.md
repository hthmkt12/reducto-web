# Project: Reducto Next Steps

## Architecture
- **Frontend App**: Next.js App Router (`F:\Reducto`), client-rendered and server-rendered views. Exposes adapter for site content.
- **Backend App**: Payload CMS with Cloudflare Workers, D1 database, and R2 storage (`F:\reducto-backend`), exposing a content delivery endpoint.
- **CI/CD**: GitHub Action workflow (`.github/workflows/ci.yml`) triggering smoke tests against Vercel preview deployments.
- **Integration Layer**: `REDUCTO_CONTENT_API_URL` environment variable instructs the frontend to consume content from the backend API with a static file fallback.

```text
+-----------------------+              +------------------------+
|   Reducto Frontend    | <--- HTTP -- |  Payload CMS Backend   |
|     (Next.js App)     |              |     (Node/Express)     |
+-----------------------+              +------------------------+
            |                                       |
    (Reads API Env /                                | (PostgreSQL Database)
     Falls back to local file)                      v
                                       +------------------------+
                                       |       PostgreSQL       |
                                       +------------------------+
```

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| 1 | E2E Testing Setup | Initialize E2E test infra and cases (Tiers 1-4), write `TEST_INFRA.md` | None | COMPLETED |
| 2 | Frontend GitHub/Vercel | Push `F:\Reducto` to `reducto-web` on GitHub; link Vercel | None | IN_PROGRESS |
| 3 | Preview CI Smoke Tests | Update CI workflow to target Vercel preview URLs | M2 | IN_PROGRESS |
| 4 | Payload CMS Backend | Initialize `F:\reducto-backend` with local PostgreSQL, define collections, seed, expose `/api/reducto-content` | None | PLANNED |
| 5 | Frontend Adapter & Fallback | Implement env-based API client with static fallback, verify all tests | M1, M4 | PLANNED |
| 6 | Final E2E & Hardening | Run all E2E tests, Forensic Auditor, adversarial hardening | M3, M5 | PLANNED |

## Interface Contracts
### Payload Backend API ↔ Reducto Frontend
- **Endpoint**: `GET /api/reducto-content`
- **Method**: `GET`
- **Response Format**:
  ```json
  {
    "navItems": [
      { "label": "string", "href": "string" }
    ],
    "phases": [
      { "index": "string", "label": "string", "summary": "string" }
    ],
    "useCases": [
      {
        "id": "string",
        "title": "string",
        "audience": "string",
        "priority": "High | Medium | Low",
        "status": "Defined | In Progress | Draft",
        "slug": "string",
        "details": "string",
        "gap": "string"
      }
    ],
    "gapRows": [
      { "area": "string", "status": "string", "details": "string" }
    ]
  }
  ```
- **Error Handling**: Non-200 responses or connection errors must cause the frontend to fallback to static content.

## Code Layout
- `F:\Reducto` (Frontend project root)
  - `src/app/` (Next.js App Router)
  - `src/components/` (React UI components)
  - `src/data/` (Content adapter and local data)
  - `scripts/` (Build and smoke test scripts)
- `F:\reducto-backend` (Backend project root)
  - `src/` (Payload CMS configuration, collections, endpoints)
  - `docker-compose.yml` (Local PostgreSQL setup)
