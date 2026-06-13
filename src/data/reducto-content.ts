import {
  buildPayloadPreviewLines,
  findPayloadCollectionPreview,
  payloadCollectionPreviews,
  type PayloadCollectionPreview,
} from "./payload-handoff";
import {
  gapRows,
  landingSections,
  navItems,
  phases,
  useCases,
} from "./reducto-static-content";
export { isValidReductoContent } from "./reducto-content-validation";
import { isValidReductoContent } from "./reducto-content-validation";

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

export type {
  PayloadCollectionPreview,
  PayloadFieldPreview,
} from "./payload-handoff";

export type LandingSectionItem = {
  label: string;
  detail: string;
};

export type LandingSection = {
  id: "integrations" | "docs" | "pricing";
  title: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  items: readonly LandingSectionItem[];
};

export type ReductoContent = {
  navItems: readonly NavItem[];
  phases: readonly Phase[];
  useCases: readonly UseCase[];
  gapRows: readonly GapRow[];
  landingSections: readonly LandingSection[];
  payloadCollectionPreviews: readonly PayloadCollectionPreview[];
  buildPayloadLines: (slug: string) => readonly string[];
};

function buildPayloadLines(slug: string) {
  return buildPayloadPreviewLines(findPayloadCollectionPreview(slug) ?? slug);
}

export function createStaticReductoContent(): ReductoContent {
  return {
    navItems,
    phases,
    useCases,
    gapRows,
    landingSections,
    payloadCollectionPreviews,
    buildPayloadLines,
  };
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
    landingSections: data.landingSections ?? landingSections,
    payloadCollectionPreviews: data.payloadCollectionPreviews ?? payloadCollectionPreviews,
    buildPayloadLines,
  };
}
