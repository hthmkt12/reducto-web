export const phaseAnchors = ["#brief", "#build", "#check", "#patch", "#expand"] as const;

export type PhaseAnchor = (typeof phaseAnchors)[number];

export type WorkflowPhaseDetail = {
  href: PhaseAnchor;
  kicker: string;
  title: string;
  description: string;
  artifact: string;
  checks: readonly string[];
};

export const workflowPhaseDetails = [
  {
    href: "#brief",
    kicker: "01 / Parse",
    title: "Read every page with layout still intact.",
    description:
      "Reducto parses documents like a human reviewer: text, regions, tables, figures, and reading order stay connected so downstream AI sees the document, not just loose strings.",
    artifact: "Layout-aware parse result with regions, text, tables, figures, and source coordinates.",
    checks: ["Reading order preserved", "Tables remain structured", "Scans and digital PDFs supported"],
  },
  {
    href: "#build",
    kicker: "02 / Split",
    title: "Break long packets into useful units.",
    description:
      "Multi-document files, claims packets, onboarding bundles, and long forms are separated before automation so each step receives the right document slice.",
    artifact: "Document boundary map with file type, page ranges, and confidence.",
    checks: ["Packet boundaries detected", "Attachments routed", "No manual pre-processing required"],
  },
  {
    href: "#check",
    kicker: "03 / Extract",
    title: "Land the right data in the right schema.",
    description:
      "Extraction turns messy documents into predictable structured output for invoices, forms, disclosures, and industry-specific workflows.",
    artifact: "Schema-level JSON fields with evidence and confidence signals.",
    checks: ["Required fields filled", "Evidence stays traceable", "Edge cases reviewed by agentic OCR"],
  },
  {
    href: "#patch",
    kicker: "04 / Edit",
    title: "Fill forms without brittle templates.",
    description:
      "Detected blanks, tables, and checkboxes can be filled dynamically across scanned PDFs and digital forms without hand-drawn bounding boxes.",
    artifact: "Editable field map for blanks, checkboxes, tables, and supplied values.",
    checks: ["Fillable regions detected", "Layout variation handled", "Output remains document-native"],
  },
  {
    href: "#expand",
    kicker: "05 / Classify",
    title: "Route documents before the workflow begins.",
    description:
      "Classification gives AI teams a clean starting point: know what each file is, what workflow it belongs to, and which extraction path should run next.",
    artifact: "Document type, industry intent, and downstream routing decision.",
    checks: ["Type is labeled", "Workflow path selected", "Human review stays possible"],
  },
] as const satisfies readonly WorkflowPhaseDetail[];
