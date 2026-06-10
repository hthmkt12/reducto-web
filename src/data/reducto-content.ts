export type NavItem = {
  label: string;
  href: string;
};

export type Phase = {
  index: string;
  label: string;
  summary: string;
};

export type UseCase = {
  id: string;
  title: string;
  audience: string;
  priority: "High" | "Medium" | "Low";
  status: "Defined" | "In Progress" | "Draft";
  slug: string;
  details: string;
  gap: string;
};

export type GapRow = {
  area: string;
  status: string;
  details: string;
};

export type ReductoContent = {
  navItems: readonly NavItem[];
  phases: readonly Phase[];
  useCases: readonly UseCase[];
  gapRows: readonly GapRow[];
  buildPayloadLines: (slug: string) => readonly string[];
};

const navItems = [
  { label: "Use Case Driven Workflow", href: "#workflow" },
  { label: "Integrations", href: "#integrations" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
] as const satisfies readonly NavItem[];

const phases = [
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

const useCases = [
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

const gapRows = [
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

const commonPayloadPrelude = [
  "collections: [",
  "  {",
  "    slug: '{slug}',",
  "    fields: [",
  "      { name: 'title', type: 'text', required: true },",
  "      { name: 'content', type: 'richText' },",
  "      { name: 'status', type: 'select',",
  "        options: ['draft', 'review', 'published'] },",
  "      { name: 'metadata', type: 'group', fields: [...] },",
  "      { name: 'relations', type: 'relationship',",
  "        relationTo: 'documents' }",
  "    ]",
  "  }",
  "]",
] as const;

function buildPayloadLines(slug: string) {
  return commonPayloadPrelude.map((line) => line.replace("{slug}", slug));
}

export function createStaticReductoContent(): ReductoContent {
  return {
    navItems,
    phases,
    useCases,
    gapRows,
    buildPayloadLines,
  };
}

export function isValidReductoContent(data: any): boolean {
  if (!data || typeof data !== "object") return false;
  
  if (!Array.isArray(data.navItems) || data.navItems.length === 0) return false;
  for (const item of data.navItems) {
    if (!item || typeof item.label !== "string" || typeof item.href !== "string") return false;
  }

  if (!Array.isArray(data.phases) || data.phases.length === 0) return false;
  for (const item of data.phases) {
    if (!item || typeof item.index !== "string" || typeof item.label !== "string" || typeof item.summary !== "string") return false;
  }

  if (!Array.isArray(data.useCases) || data.useCases.length === 0) return false;
  for (const item of data.useCases) {
    if (
      !item ||
      typeof item.id !== "string" ||
      typeof item.title !== "string" ||
      typeof item.audience !== "string" ||
      typeof item.priority !== "string" ||
      typeof item.status !== "string" ||
      typeof item.slug !== "string" ||
      typeof item.details !== "string" ||
      typeof item.gap !== "string"
    ) return false;
  }

  if (!Array.isArray(data.gapRows)) return false;
  for (const item of data.gapRows) {
    if (!item || typeof item.area !== "string" || typeof item.status !== "string" || typeof item.details !== "string") return false;
  }

  return true;
}

export async function fetchReductoContent(apiUrl: string): Promise<ReductoContent> {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  const data = await res.json();
  if (!isValidReductoContent(data)) {
    throw new Error("Invalid content structure returned from API");
  }
  return {
    navItems: data.navItems,
    phases: data.phases,
    useCases: data.useCases,
    gapRows: data.gapRows,
    buildPayloadLines,
  };
}

