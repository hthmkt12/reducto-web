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

const sharedDocumentFields = [
  field("documentUrl", "text", true, "Signed upload or remote file URL."),
  field("fileType", "select", true, "PDF, image, spreadsheet, slide deck, or mixed packet."),
  field("webhookUrl", "text", false, "Optional callback for async processing status."),
] as const;

export const payloadCollectionPreviews = [
  {
    slug: "parse",
    label: "Parse",
    endpoint: "/api/parse",
    ownership: "Document AI pipeline",
    workflow: "Upload -> Layout parse -> Agentic OCR review",
    fields: [
      ...sharedDocumentFields,
      field("preserveLayout", "checkbox", true, "Keep regions, tables, figures, and reading order connected."),
      field("pages", "array", false, "Optional page ranges for targeted parsing."),
      field("outputFormat", "select", true, "Markdown, JSON, or region-level structured output."),
    ],
    relationships: ["regions", "tables", "figures"],
  },
  {
    slug: "split",
    label: "Split",
    endpoint: "/api/split",
    ownership: "Packet routing",
    workflow: "Upload -> Boundary detection -> Document units",
    fields: [
      ...sharedDocumentFields,
      field("splitMode", "select", true, "Detect claims, forms, attachments, exhibits, or custom packet types."),
      field("minimumConfidence", "text", false, "Confidence threshold before a boundary is accepted."),
      field("returnPageRanges", "checkbox", true, "Return source page ranges for every detected unit."),
    ],
    relationships: ["packets", "attachments", "routes"],
  },
  {
    slug: "extract",
    label: "Extract",
    endpoint: "/api/extract",
    ownership: "Structured data API",
    workflow: "Schema -> Extraction -> Evidence-backed fields",
    fields: [
      ...sharedDocumentFields,
      field("schema", "group", true, "Field names, types, and validation expectations."),
      field("includeEvidence", "checkbox", true, "Attach page, region, and text evidence to each field."),
      field("reviewStrategy", "select", false, "Agentic review level for edge cases and low confidence outputs."),
    ],
    relationships: ["schema-fields", "evidence", "confidence"],
  },
  {
    slug: "edit",
    label: "Edit",
    endpoint: "/api/edit",
    ownership: "Document completion",
    workflow: "Detect fillables -> Apply values -> Return completed file",
    fields: [
      ...sharedDocumentFields,
      field("values", "array", true, "Supplied values mapped to blanks, tables, and checkboxes."),
      field("detectFields", "checkbox", true, "Find fillable areas without predefined templates."),
      field("exportFormat", "select", true, "Completed PDF, image, or structured edit map."),
    ],
    relationships: ["fillable-fields", "tables", "checkboxes"],
  },
  {
    slug: "classify",
    label: "Classify",
    endpoint: "/api/classify",
    ownership: "Workflow router",
    workflow: "Upload -> Type detection -> Downstream route",
    fields: [
      ...sharedDocumentFields,
      field("taxonomy", "array", true, "Allowed document types and industry-specific labels."),
      field("routeOnMatch", "checkbox", false, "Return the recommended downstream workflow."),
      field("explain", "checkbox", false, "Include short evidence for each classification decision."),
    ],
    relationships: ["document-types", "industries", "workflow-routes"],
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
    ownership: "Document API",
    workflow: "Mapped by the frontend-safe API boundary",
    relationships: [],
  };
}

export function buildPayloadPreviewLines(preview: PayloadCollectionPreview | string): readonly string[] {
  const capability = typeof preview === "string" ? createFallbackCollectionPreview(preview) : preview;
  const fieldLines = capability.fields.flatMap((field) => [
    "    {",
    `      name: '${field.name}', type: '${field.type}', required: ${field.required},`,
    `      description: '${field.note}',`,
    "    },",
  ]);

  return [
    `// Frontend-safe API preview for ${capability.label}`,
    "{",
    `  endpoint: '${capability.endpoint}',`,
    `  capability: '${capability.slug}',`,
    "  request: {",
    ...fieldLines,
    "  },",
    `  returns: [${capability.relationships.map((item) => `'${item}'`).join(", ")}],`,
    "}",
  ];
}
