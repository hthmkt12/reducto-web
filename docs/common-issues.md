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
