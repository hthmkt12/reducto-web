export type PayloadFieldPreview = {
  name: string;
  type: "text" | "textarea" | "richText" | "select" | "date" | "group" | "array" | "relationship" | "checkbox";
  required: boolean;
  note: string;
};

export type PayloadCollectionPreview = {
  slug: string;
  label: string;
  endpoint: string;
  ownership: string;
  workflow: string;
  fields: readonly PayloadFieldPreview[];
  relationships: readonly string[];
};

const field = (
  name: string,
  type: PayloadFieldPreview["type"],
  required: boolean,
  note: string,
): PayloadFieldPreview => ({ name, type, required, note });

const sharedEditorialFields = [
  field("title", "text", true, "Primary editorial label used in workflow lists."),
  field("status", "select", true, "Draft, review, approved, or archived publishing state."),
  field("owner", "relationship", true, "Links the record to the responsible team or reviewer."),
] as const;

export const payloadCollectionPreviews = [
  {
    slug: "documents",
    label: "Documents",
    endpoint: "/api/documents",
    ownership: "Legal editors",
    workflow: "Draft -> Legal review -> Signed off",
    fields: [
      ...sharedEditorialFields,
      field("sourceFile", "relationship", true, "References the uploaded contract or source artifact."),
      field("sections", "array", true, "Repeatable contract sections with extracted text and notes."),
      field("signoff", "group", true, "Approver, timestamp, and final review disposition."),
    ],
    relationships: ["owners", "source-files", "clauses"],
  },
  {
    slug: "policies",
    label: "Policies",
    endpoint: "/api/policies",
    ownership: "Operations leads",
    workflow: "Proposed -> Compliance review -> Active",
    fields: [
      ...sharedEditorialFields,
      field("jurisdiction", "text", true, "Market, region, or operating unit the policy applies to."),
      field("effectiveDate", "date", true, "Date the policy version becomes active."),
      field("exceptions", "array", false, "Structured exception records with rationale and owner."),
    ],
    relationships: ["owners", "audits", "policy-versions"],
  },
  {
    slug: "audits",
    label: "Audits",
    endpoint: "/api/audits",
    ownership: "Review managers",
    workflow: "Queued -> Checked -> Remediation",
    fields: [
      ...sharedEditorialFields,
      field("scope", "textarea", true, "The documents, policy areas, and controls included."),
      field("checks", "array", true, "Validation checklist with pass/fail and evidence fields."),
      field("requiresRemediation", "checkbox", false, "Flags whether follow-up workflow should be opened."),
    ],
    relationships: ["owners", "documents", "policies"],
  },
  {
    slug: "clauses",
    label: "Clauses",
    endpoint: "/api/clauses",
    ownership: "Analyst team",
    workflow: "Extracted -> Classified -> Reusable",
    fields: [
      ...sharedEditorialFields,
      field("clauseText", "richText", true, "Canonical clause body preserved with editorial markup."),
      field("clauseType", "select", true, "Classification used for search, routing, and comparison."),
      field("sourceLocation", "group", true, "Document, page, section, and confidence metadata."),
    ],
    relationships: ["documents", "comparisons", "owners"],
  },
  {
    slug: "comparisons",
    label: "Comparisons",
    endpoint: "/api/comparisons",
    ownership: "Cross-functional teams",
    workflow: "Selected -> Compared -> Resolved",
    fields: [
      ...sharedEditorialFields,
      field("baselineDocument", "relationship", true, "The approved record used as comparison baseline."),
      field("candidateDocument", "relationship", true, "The new or alternate record being compared."),
      field("deltas", "array", true, "Structured additions, removals, and changed clauses."),
    ],
    relationships: ["documents", "clauses", "owners"],
  },
] as const satisfies readonly PayloadCollectionPreview[];

const fallbackCollectionPreview = payloadCollectionPreviews[0];

export function findPayloadCollectionPreview(slug: string): PayloadCollectionPreview | undefined {
  return payloadCollectionPreviews.find((preview) => preview.slug === slug);
}

function createFallbackCollectionPreview(slug: string): PayloadCollectionPreview {
  return {
    ...fallbackCollectionPreview,
    slug,
    label: slug,
    endpoint: `/api/${slug}`,
    ownership: "Backend handoff",
    workflow: "Mapped by the Payload API boundary",
    relationships: [],
  };
}

export function buildPayloadPreviewLines(preview: PayloadCollectionPreview | string): readonly string[] {
  const collection = typeof preview === "string" ? createFallbackCollectionPreview(preview) : preview;
  const fieldLines = collection.fields.flatMap((field) => [
    "    {",
    `      name: '${field.name}', type: '${field.type}', required: ${field.required},`,
    `      admin: { description: '${field.note}' },`,
    "    },",
  ]);

  return [
    `// Frontend-safe handoff preview for ${collection.label}`,
    "{",
    `  slug: '${collection.slug}',`,
    `  endpoint: '${collection.endpoint}',`,
    "  fields: [",
    ...fieldLines,
    "  ],",
    `  relationships: [${collection.relationships.map((item) => `'${item}'`).join(", ")}],`,
    "}",
  ];
}
