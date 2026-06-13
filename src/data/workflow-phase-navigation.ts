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
    kicker: "01 / Brief",
    title: "Turn a document request into a usable editorial brief.",
    description:
      "Capture the audience, job-to-be-done, source material, and success criteria before the team starts shaping content or schema.",
    artifact: "Brief packet with audience, owner, source documents, and approval path.",
    checks: ["Audience and owner named", "Source material attached", "Success criteria written"],
  },
  {
    href: "#build",
    kicker: "02 / Build",
    title: "Shape the content and model around the work it must support.",
    description:
      "Translate the brief into structured content blocks, relationships, and Payload-ready fields without crossing the frontend/backend boundary.",
    artifact: "Draft content model and selected use-case schema preview.",
    checks: ["Fields match workflow needs", "Relationships are traceable", "Status states are explicit"],
  },
  {
    href: "#check",
    kicker: "03 / Check",
    title: "Compare the draft against coverage, quality, and review rules.",
    description:
      "Use the gap analysis to find missing metadata, weak relationships, inconsistent status, and ownership issues before publishing.",
    artifact: "Gap table with status, impact, and next correction.",
    checks: ["Required fields covered", "Review state visible", "Weak links called out"],
  },
  {
    href: "#patch",
    kicker: "04 / Patch",
    title: "Close the gaps while the context is still fresh.",
    description:
      "Patch content, schema, and review notes together so fixes do not drift away from the use case that justified them.",
    artifact: "Resolved gap list with changed fields and reviewer notes.",
    checks: ["Each gap has an owner", "Patch reason is recorded", "Schema preview still compiles"],
  },
  {
    href: "#expand",
    kicker: "05 / Expand",
    title: "Scale the workflow to new teams, channels, and variants.",
    description:
      "Promote proven patterns into reusable editorial rails for more document types, languages, and downstream review surfaces.",
    artifact: "Reusable workflow pattern ready for a future API client or CMS backend.",
    checks: ["Pattern is reusable", "Channel needs are named", "Backend contract remains stable"],
  },
] as const satisfies readonly WorkflowPhaseDetail[];
