import type { PayloadCollectionPreview } from "./payload-handoff";

type ApiRecord = Record<string, unknown>;

function isRecord(data: unknown): data is ApiRecord {
  return Boolean(data && typeof data === "object" && !Array.isArray(data));
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isValidLandingSection(data: unknown): boolean {
  if (
    !isRecord(data) ||
    !isString(data.id) ||
    !isString(data.title) ||
    !isString(data.summary) ||
    !isString(data.ctaLabel) ||
    !isString(data.ctaHref) ||
    !Array.isArray(data.items) ||
    data.items.length === 0
  ) return false;

  return data.items.every((item) => (
    isRecord(item) &&
    isString(item.label) &&
    isString(item.detail)
  ));
}

function isValidPayloadCollectionPreview(data: unknown): data is PayloadCollectionPreview {
  if (!isRecord(data)) return false;
  if (
    !isString(data.slug) ||
    !isString(data.label) ||
    !isString(data.endpoint) ||
    !isString(data.ownership) ||
    !isString(data.workflow) ||
    !Array.isArray(data.fields) ||
    !Array.isArray(data.relationships)
  ) return false;

  return data.fields.every((field) => (
    isRecord(field) &&
    isString(field.name) &&
    isString(field.type) &&
    isBoolean(field.required) &&
    isString(field.note)
  )) && data.relationships.every(isString);
}

export function isValidReductoContent(data: unknown): boolean {
  if (!isRecord(data)) return false;

  if (!Array.isArray(data.navItems) || data.navItems.length === 0) return false;
  for (const item of data.navItems) {
    if (!isRecord(item) || !isString(item.label) || !isString(item.href)) return false;
  }

  if (!Array.isArray(data.phases) || data.phases.length === 0) return false;
  for (const item of data.phases) {
    if (!isRecord(item) || !isString(item.index) || !isString(item.label) || !isString(item.summary)) return false;
  }

  if (!Array.isArray(data.useCases) || data.useCases.length === 0) return false;
  for (const item of data.useCases) {
    if (
      !isRecord(item) ||
      !isString(item.id) ||
      !isString(item.title) ||
      !isString(item.audience) ||
      !isString(item.priority) ||
      !isString(item.status) ||
      !isString(item.slug) ||
      !isString(item.details) ||
      !isString(item.gap)
    ) return false;
  }

  if (!Array.isArray(data.gapRows)) return false;
  for (const item of data.gapRows) {
    if (!isRecord(item) || !isString(item.area) || !isString(item.status) || !isString(item.details)) return false;
  }

  if (data.landingSections !== undefined) {
    if (!Array.isArray(data.landingSections)) return false;
    if (!data.landingSections.every(isValidLandingSection)) return false;
  }

  if (data.payloadCollectionPreviews !== undefined) {
    if (!Array.isArray(data.payloadCollectionPreviews)) return false;
    if (!data.payloadCollectionPreviews.every(isValidPayloadCollectionPreview)) return false;
  }

  return true;
}
