import type {
  GapRow,
  LandingSection,
  NavItem,
  Phase,
  UseCase,
} from "./reducto-content";

export const navItems = [
  { label: "Use Case Driven Workflow", href: "#workflow" },
  { label: "Integrations", href: "#integrations" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
] as const satisfies readonly NavItem[];

export const phases = [
  {
    index: "01",
    label: "Brief",
    summary: "Capture goals, context, audience, and success criteria.",
  },
  {
    index: "02",
    label: "Build",
    summary: "Structure content and data models that reflect real editorial needs.",
  },
  {
    index: "03",
    label: "Check",
    summary: "Validate completeness, consistency, and alignment with use cases.",
  },
  {
    index: "04",
    label: "Patch",
    summary: "Resolve gaps and refine content, schema, and relationships.",
  },
  {
    index: "05",
    label: "Expand",
    summary: "Scale with confidence across channels, locales, and teams.",
  },
] as const satisfies readonly Phase[];

export const useCases = [
  {
    id: "contract-review",
    title: "Contract Review",
    audience: "Legal",
    priority: "High",
    status: "Defined",
    slug: "documents",
    details: "Long-form review with structured sections and traceable edits.",
    gap: "Missing author notes and signed-off metadata.",
  },
  {
    id: "policy-analysis",
    title: "Policy Analysis",
    audience: "Operations",
    priority: "High",
    status: "Defined",
    slug: "policies",
    details: "Editorial analysis for compliance, updates, and exceptions.",
    gap: "No reusable policy variants or change history.",
  },
  {
    id: "compliance-check",
    title: "Compliance Check",
    audience: "Reviewers",
    priority: "Medium",
    status: "In Progress",
    slug: "audits",
    details: "Validate required fields, approvals, and ownership boundaries.",
    gap: "Validation rules still need stricter ownership checks.",
  },
  {
    id: "clause-extraction",
    title: "Clause Extraction",
    audience: "Analysts",
    priority: "Medium",
    status: "Draft",
    slug: "clauses",
    details: "Turn long documents into searchable structured records.",
    gap: "Structured blocks not mapped to repeatable CMS fields yet.",
  },
  {
    id: "document-comparison",
    title: "Document Comparison",
    audience: "Teams",
    priority: "Low",
    status: "Draft",
    slug: "comparisons",
    details: "Show change deltas across versions, authors, and markets.",
    gap: "Diff view needs a richer timeline and version anchors.",
  },
] as const satisfies readonly UseCase[];

export const gapRows = [
  {
    area: "Metadata",
    status: "Open",
    details: "Missing fields in 3 models",
  },
  {
    area: "Relationships",
    status: "Open",
    details: "2 weak links detected",
  },
  {
    area: "Validations",
    status: "In progress",
    details: "5 rules need refinement",
  },
  {
    area: "Permissions",
    status: "Open",
    details: "Role scope mismatch",
  },
  {
    area: "Workflows",
    status: "In progress",
    details: "2 flows incomplete",
  },
] as const satisfies readonly GapRow[];

export const landingSections = [
  {
    id: "integrations",
    title: "Integrations",
    summary:
      "Connect document inputs, editorial review, and future CMS publishing without pulling backend code into the landing page.",
    ctaLabel: "Open schema",
    ctaHref: "#schema",
    items: [
      {
        label: "Payload boundary",
        detail: "Frontend content stays behind the typed ReductoContent adapter.",
      },
      {
        label: "Document sources",
        detail: "Contracts, policies, audits, clauses, and comparisons map into reusable workflow records.",
      },
      {
        label: "Review systems",
        detail: "Gap status and owner-ready metadata prepare each model for approval paths.",
      },
    ],
  },
  {
    id: "docs",
    title: "Docs",
    summary:
      "Keep the operating manual close to the workflow: use cases, schema notes, checks, and rollout decisions in one readable trail.",
    ctaLabel: "View use cases",
    ctaHref: "#use-cases",
    items: [
      {
        label: "Use-case notes",
        detail: "Each audience need is captured before schema work starts.",
      },
      {
        label: "Schema references",
        detail: "Payload model previews make future CMS handoff explicit.",
      },
      {
        label: "Known issues",
        detail: "Navigation, build, and smoke-test learnings stay documented for the next pass.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    summary:
      "Start with the editorial frontend, then scale the backend boundary when the document workflow is proven.",
    ctaLabel: "Request a demo",
    ctaHref: "#contact",
    items: [
      {
        label: "Starter",
        detail: "Static workflow page, typed seed content, and Cloudflare-ready build.",
      },
      {
        label: "Team",
        detail: "Payload API contract, editorial roles, and review state planning.",
      },
      {
        label: "Scale",
        detail: "Multi-channel publishing, localization, and governance-ready expansion.",
      },
    ],
  },
] as const satisfies readonly LandingSection[];
