import type {
  GapRow,
  LandingSection,
  NavItem,
  Phase,
  UseCase,
} from "./reducto-content";

export const navItems = [
  { label: "Platform", href: "#workflow" },
  { label: "API", href: "#integrations" },
  { label: "Industries", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
] as const satisfies readonly NavItem[];

export const phases = [
  {
    index: "01",
    label: "Parse",
    summary: "Read layout, text, tables, and structure like a human reviewer.",
  },
  {
    index: "02",
    label: "Split",
    summary: "Separate long packets into clean, individually useful documents.",
  },
  {
    index: "03",
    label: "Extract",
    summary: "Return schema-level fields with evidence, confidence, and precision.",
  },
  {
    index: "04",
    label: "Edit",
    summary: "Fill blanks, tables, and checkboxes without brittle templates.",
  },
  {
    index: "05",
    label: "Classify",
    summary: "Route every file by type, intent, and downstream workflow.",
  },
] as const satisfies readonly Phase[];

export const useCases = [
  {
    id: "finance",
    title: "Finance",
    audience: "Analysts",
    priority: "High",
    status: "Defined",
    slug: "parse",
    details: "Parse investor decks, spreadsheets, dense pitch books, and SEC filings with table-aware precision.",
    gap: "Complex tables and chart context need layout-preserving extraction.",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    audience: "Clinical AI",
    priority: "High",
    status: "Defined",
    slug: "extract",
    details: "Extract patient forms, provider packets, and onboarding documents into reliable structured data.",
    gap: "Handwriting, scanned pages, and mixed form layouts create edge cases.",
  },
  {
    id: "insurance",
    title: "Insurance",
    audience: "Claims",
    priority: "Medium",
    status: "Defined",
    slug: "split",
    details: "Split long submissions into policies, claims, attachments, and evidence packets before automation.",
    gap: "Multi-document PDFs need clean boundaries before downstream review.",
  },
  {
    id: "legal",
    title: "Legal",
    audience: "Legal AI",
    priority: "Medium",
    status: "In Progress",
    slug: "classify",
    details: "Classify filings, contracts, exhibits, and case materials while preserving source context.",
    gap: "Dense language and appendix-heavy packets need type-aware routing.",
  },
  {
    id: "operations",
    title: "Operations",
    audience: "Back office",
    priority: "Low",
    status: "Draft",
    slug: "edit",
    details: "Fill detected blanks, tables, and checkboxes across scanned PDFs and digital forms.",
    gap: "Templates break when form layout changes; dynamic edit detection closes the gap.",
  },
] as const satisfies readonly UseCase[];

export const gapRows = [
  {
    area: "Pages processed",
    status: "3B+",
    details: "Production-scale document volume",
  },
  {
    area: "Input types",
    status: "Unified",
    details: "PDFs, images, spreadsheets, slides",
  },
  {
    area: "OCR loop",
    status: "Agentic",
    details: "Vision models review and correct outputs",
  },
  {
    area: "Schema output",
    status: "Precise",
    details: "Fields land where the API expects them",
  },
  {
    area: "Industries",
    status: "Trusted",
    details: "Finance, healthcare, insurance, legal",
  },
] as const satisfies readonly GapRow[];

export const landingSections = [
  {
    id: "integrations",
    title: "API",
    summary:
      "A toolbox of flexible document APIs for parsing, splitting, extracting, editing, and classifying the messy files that power AI products.",
    ctaLabel: "Open API surface",
    ctaHref: "#schema",
    items: [
      {
        label: "Parse",
        detail: "Capture layout, text, structure, and meaning from difficult documents with human-like reading quality.",
      },
      {
        label: "Split",
        detail: "Turn multi-document files and long forms into clean units before they enter your pipeline.",
      },
      {
        label: "Extract",
        detail: "Return structured fields from invoices, onboarding forms, disclosures, and dense operational packets.",
      },
    ],
  },
  {
    id: "docs",
    title: "Industries",
    summary:
      "Built for teams where document accuracy matters: finance, healthcare, insurance, legal, and other document-heavy operations.",
    ctaLabel: "Review industries",
    ctaHref: "#use-cases",
    items: [
      {
        label: "Finance",
        detail: "Investor materials, filings, tables, and spreadsheet-heavy review flows.",
      },
      {
        label: "Healthcare",
        detail: "Provider forms, packets, scanned records, and clinical intake workflows.",
      },
      {
        label: "Legal",
        detail: "Contracts, filings, exhibits, appendices, and source-backed review systems.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Scale",
    summary:
      "Start with a few difficult files, then move the same document intelligence into production pipelines without reworking the interface.",
    ctaLabel: "Contact sales",
    ctaHref: "#contact",
    items: [
      {
        label: "Studio",
        detail: "Try real documents and inspect parse, split, and extraction results before wiring the API.",
      },
      {
        label: "API",
        detail: "Ship document understanding into AI products with predictable structured outputs.",
      },
      {
        label: "Enterprise",
        detail: "Scale across high-volume document operations with security and reliability expectations intact.",
      },
    ],
  },
] as const satisfies readonly LandingSection[];
