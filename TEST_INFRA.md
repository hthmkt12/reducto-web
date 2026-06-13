# Reducto Testing Infrastructure

This document outlines the End-to-End (E2E) testing infrastructure for the Reducto application.

## Overview

The Reducto E2E test suite is built on **Playwright** (`@playwright/test`) and executes against a compiled production/development build of the Next.js frontend application.

- **Test Runner**: Playwright Test (running in headless Chromium by default)
- **Target URL**: `http://localhost:3000` (configured in `playwright.config.ts`)
- **Server Orchestration**: The Playwright configuration uses the `webServer` option to automatically launch and monitor the Next.js server (`npm run start` or `npm run dev`) on port 3000 during test execution.

## Test Directory Structure

All E2E tests are located in the `tests/` folder:

```text
tests/
├── tier1-feature-coverage.spec.ts         # Feature coverage tests (>=25 test cases)
├── tier2-boundary-corner-cases.spec.ts    # Boundary and corner cases (>=25 test cases)
├── tier3-cross-feature-combinations.spec.ts  # Cross-feature validation tests (>=5 test cases)
└── tier4-real-world-workloads.spec.ts      # User flow and real workload simulation (>=5 test cases)
```

## Test Tiers & Case Details

### Tier 1: Feature Coverage (25 Test Cases)
- **TopNav Navigation (5 cases)**: Validates navigation items rendering, brandmark scroll to top, and anchors navigation to `#workflow`, `#contact`, and `#use-cases`.
- **PhaseRail (5 cases)**: Validates display of 5 workflow phases, active state on click, active state on URL hash updates, and rapid phase transitions.
- **UseCases Panel (5 cases)**: Validates usecases list, default selected state, updates on details section and payload model code frame upon select, and focus metadata footer.
- **Gap Analysis (5 cases)**: Validates table headers, row rendering, row statuses matching spec values, area/details cell correctness.
- **API Adapter & Fallback (5 cases)**: Validates fallback behavior when API is unset, fallback when API is unreachable, successful dynamic content fetching when API is reachable, first item default selection, and hash compatibility.

### Tier 2: Boundary & Corner Cases (25 Test Cases)
- **TopNav Boundaries (5 cases)**: Checks Narrow layout scaling (800px), multiple rapid brandmark clicks, long custom nav labels, rapid demo request button clicking, and extreme narrow mobile view (320px).
- **PhaseRail Boundaries (5 cases)**: Verifies invalid hash casing handling (e.g. `#BUILD`), hash query parameter presence (e.g. `#brief?param=1`), low vertical viewports (400px height), hash reset or empty hash preservation, and end-to-end jumps.
- **UseCases Boundaries (5 cases)**: Validates extremely long strings in details, list scrollability (15 usecases), layout with a single usecase, dangerous HTML escaping (XSS resilience), and clicking already active elements.
- **Gap Analysis Boundaries (5 cases)**: Checks empty gap list stability, extremely long statuses, alternation of magenta/warm dot colors, wide layout scaling (2000px), and empty details cells.
- **API Adapter Boundaries (5 cases)**: Validates invalid JSON payloads (empty object `{}`), payload missing phases, payload with invalid structures (string as navItems), payload with incomplete models (missing slug), and delayed API mock response.

### Tier 3: Cross-Feature Combinations (5 Test Cases)
- **Navigation + UseCase Select**: Link click followed by use case select to check scroll and active class update.
- **Phase Rail + UseCase Select**: Independent state validation of active index and code frame contents.
- **API + Hash Entry**: Landing directly on hash after dynamic content fetch updates correct dynamic phase.
- **UseCase Select + Frame Title**: Checking title and accessibility attributes update correctly on select.
- **CTA Scroll + Footer Click**: Navigating back and forth using header and footer CTAs.

### Tier 4: Real-world Workloads (5 Test Cases)
- **User Onboarding Walkthrough**: Step-by-step landing page walkthrough simulating reading, clicking, selecting, and converting.
- **Hash-driven Deep Dive**: Landing directly on specific hash, verifying phase, details, code slug, and contacting.
- **Dynamic Sync Hot Swap**: Loading from remote API, testing multi-step interactions and dynamic table checks.
- **Stress Interaction**: Quick click alternates between phases, use cases, and hashes, ensuring UI responsiveness.
- **API Recovery Flow**: Handling remote service failure (API offline) -> graceful static fallback -> interaction stability.

## How to Run the Test Suite

Before running E2E tests, ensure you build the Next.js app so the server can serve the latest assets:

```bash
# Build the application
npm run build

# Run E2E test suite
npm run test:e2e
```

## Mocking and Verification Strategy

To test the frontend API adapter fallback behavior cleanly:
1. The frontend supports an `apiUrl` query parameter (e.g., `http://localhost:3000/?apiUrl=/api/mock-content`).
2. Playwright interceptor `page.route('**/api/*', route => route.fulfill(...))` is used in tests to mock backend endpoints.
3. This allows setting up precise mock scenarios (success, delay, HTTP error status, structural validation errors) directly from the E2E test specs without managing stateful local servers or database connections.
4. Mock success payloads must include `navItems`, `phases`, `useCases`, and `gapRows`; `landingSections` and `payloadCollectionPreviews` are optional and fall back to frontend-safe static DTOs.
