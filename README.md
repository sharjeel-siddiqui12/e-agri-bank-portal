### E‑Agri Bank Portal

A Next.js 15 (App Router) portal for managing agri‑loan operations and product management workflows across multiple modules (requests, approvals, assessments, disbursements, monitoring, settlements) and product/vendor management. The app ships with rich demo data, UX‑complete flows, charts, and modern UI components.

## Tech Stack

- Next.js 15 (App Router, React 19)
- CSS Modules for page/component styles
- Radix UI primitives via lightweight UI wrappers
- Lucide icons
- Recharts for charts
- React Hook Form + Zod (available for forms)
- Lodash debounce utilities

## Features

- Loan lifecycle sections: requests, approvals, assessments, disbursements, monitoring, settlements
- Product management: product setup/approval, preferred vendor setup and approval, credit scoring
- Dynamic detail pages using route params and row context
- “Application Pending” subpages with consistent UI across sections
- Dashboard visualizations and metrics
- Responsive layout with topbar and sidebar

## Project Structure

```
src/
  app/
    (auth)/
    (primary-items)/
    (loan-operatioons-items)/
      loan-requests/
        [id]/               // dynamic detail route
          application-pending/
          LoanDetail.module.css
          page.jsx
        page.jsx
      loan-approvals/
      loan-assessments/
      loan-disbursements/
      loan-monitoring/
      loan-applications/
    (loan-settlements-items)/
      loan-settlements/
        [id]/
          application-pending/page.jsx
          page.jsx          // mirrored to loan-requests UX
        LoanSettlements.module.css
        page.jsx
    (product-management-items)/
      preferred-vendor-setup/
      preferred-vendor-setup-approval/
        [id]/page.jsx       // dynamic detail page
        PreferredVendorApproval.module.css
        page.jsx            // list page (client)
      product-setup/
      product-approval/
    (access-rights-items)/
    (reource-onboarding-item)/
    layout.jsx, globals.css, not-found.jsx
  components/
    layout/                 // sidebar, topbar
    ui/                     // Button, Input, Checkbox, Tabs, Table...
    charts/
    loan-detail/            // StepProgress, SummaryHeader, tabs/*
  lib/
    utils.js                // cn(), helpers
  providers/
    auth-provider.jsx, navigation-provider.jsx
```

### Routing conventions

- List pages live at e.g. `/loan-requests`, `/loan-settlements`, `/preferred-vendor-setup-approval`.
- Row click → dynamic detail route: `/section/[id]`.
- Some sections include sub‑routes like `/section/[id]/application-pending`.

## Data Flow for Dynamic Pages

To simulate a real backend while keeping the repo self‑contained:

- On list pages, when a row is clicked we save the row payload in `sessionStorage` using a section‑scoped key:
  - Key: ``${section}:row:${id}``
  - Example: `loan-requests:row:000123`
- The dynamic detail page reads `sessionStorage` on mount to enrich demo data with row‑specific values.
- For product vendor approval pages, we pass row details via query string and also persist small flags in `localStorage`.

LocalStorage keys used:
- `productApprovalUpdates` — queued updates written by detail pages and consumed by the list.
- `productPublishedStates` — per‑record “published” flags, keyed by `recordKey = productId|inputType|preferredVendor`.

## Styles

- Component/page styles use CSS Modules: `*.module.css`.
- Design tokens and palette are expressed inline per module; Tailwind 4 is present but not required in most screens.
- UI wrappers in `src/components/ui/*` are small, Radix‑backed components that accept `className` overrides.

## Requirements

- Node.js 18.18+ or 20+
- pnpm, npm, or yarn (examples use npm)

## Getting Started (Local Dev)

1) Install dependencies
```
npm install
```

2) Run the dev server
```
npm run dev
```

3) Open the app
- http://localhost:3000

## Build and Start (Production)

```
npm run build
npm start
```

- The app uses turbopack in scripts; you can remove `--turbopack` if you prefer the standard builder.

## Deployment (Vercel)

- This project is App Router‑based and uses client components that depend on `window`/storage.
- The page `preferred-vendor-setup-approval/page.jsx` is explicitly client‑driven:
  - It exports `export const dynamic = "force-dynamic";`
  - If you use `useSearchParams`, render it inside a `<Suspense>` boundary to satisfy Next’s CSR bailout requirement.

Common deployment pitfalls:
- “useSearchParams should be wrapped in Suspense”: ensure any component calling it is rendered inside `<Suspense fallback={...}>`.
- Dynamic route 404s: verify folders like `src/app/(loan-settlements-items)/loan-settlements/[id]/page.jsx` exist and your navigation uses the same segment name.
- Stale build cache: clear cache and redeploy if Vercel still reports a previously fixed error.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server locally
- `npm run lint` — run ESLint

## How Demo Data Works

- Each list page generates deterministic demo rows for quick UX testing.
- Detail pages merge row‑provided values with demo fallbacks so screens render fully even if some fields are absent.
- Totals/metrics/charts are mock‑driven and intended to be replaced by API data.

## Key Modules

- `loan-requests/[id]/page.jsx`: full detail experience with tabs:
  - KYC, Advisory, Risk Profiling, Approval/Disbursement, Monitoring, Repayment
- `loan-settlements/[id]/page.jsx`: mirrors the requests detail UX and supports “Application Pending”
- `loan-requests/[id]/application-pending/page.jsx` and analogous pages under other sections: unified “Application Pending” design
- `preferred-vendor-setup-approval/[id]/page.jsx`: product/vendor detail built from query params + demo defaults; includes “Is Approved?” and “Is Published?” radios and Save behavior

## UI Components

- `src/components/ui/*` includes:
  - `button`, `input`, `checkbox`, `select`, `tabs`, `table`, `switch`, `radio-group`, etc.
- `src/components/loan-detail/*` includes:
  - `StepProgress`, `SummaryHeader` and per‑tab content modules
- Usage follows standard React props and passes `className` for CSS Module overrides.

## Linting

- ESLint and Next config included.
- Run `npm run lint` to surface issues.

## Adding a New Section Quickly

1) Create a folder under `src/app/(loan-operatioons-items)/my-section`.
2) Add `page.jsx` for the list.
3) Add `[id]/page.jsx` for a detail view; read row data from `sessionStorage` using the key pattern shown above.
4) For “Application Pending”, add `[id]/application-pending/page.jsx` and reuse the approvals pending CSS (or copy the requests module’s CSS for uniformity).

## Troubleshooting

- Dynamic page not opening:
  - Confirm the route matches the directory structure exactly.
  - Ensure you save the row data to `sessionStorage` before navigating.
- Suspense/useSearchParams error:
  - Wrap the component rendering `useSearchParams` with `<Suspense>`.
  - Prefer removing `useSearchParams` if not essential; most list pages can rely on mount effects and storage.
- CSS not applied:
  - Verify imports use the module path, e.g. `import styles from "./My.module.css";`
  - Ensure `className={styles.someClass}` matches the CSS selector.

## Contributing

- Keep variable and function names descriptive.
- Favor CSS Modules for styles local to a page/component.
- For shared UI, extend the components in `src/components/ui/*`.
- Keep detail pages resilient: use row data when present; fallback to demo values.

## License

- See `LICENSE` in the project root.

If you need a minimal API layer or want to replace the demo data with real endpoints, I can scaffold API routes (or integrate your existing backend) and wire the list/detail pages to fetch and mutate live data.


