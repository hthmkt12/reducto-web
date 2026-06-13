const baseUrl = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3001';
const url = `${baseUrl}/api/reducto-content`;

console.log(`Running API contract smoke test against: ${url}`);

async function run() {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  // Validate presence of keys
  const requiredKeys = [
    'navItems',
    'phases',
    'useCases',
    'gapRows',
    'landingSections',
    'payloadCollectionPreviews',
  ];

  for (const key of requiredKeys) {
    if (!(key in data)) {
      throw new Error(`Missing required key: "${key}"`);
    }
  }

  // Validate structures
  if (!Array.isArray(data.navItems) || data.navItems.length === 0) {
    throw new Error(`Invalid or empty navItems`);
  }

  if (!Array.isArray(data.phases) || data.phases.length !== 5) {
    throw new Error(`Expected exactly 5 phases, found ${data.phases.length}`);
  }

  if (!Array.isArray(data.useCases) || data.useCases.length !== 5) {
    throw new Error(`Expected exactly 5 useCases, found ${data.useCases.length}`);
  }

  if (!Array.isArray(data.gapRows) || data.gapRows.length === 0) {
    throw new Error(`Invalid or empty gapRows`);
  }

  if (!Array.isArray(data.landingSections) || data.landingSections.length === 0) {
    throw new Error(`Invalid or empty landingSections`);
  }

  if (!Array.isArray(data.payloadCollectionPreviews) || data.payloadCollectionPreviews.length === 0) {
    throw new Error(`Invalid or empty payloadCollectionPreviews`);
  }

  console.log('API contract smoke test PASSED successfully!');
  console.log(
    JSON.stringify(
      {
        status: res.status,
        navItemsCount: data.navItems.length,
        phasesCount: data.phases.length,
        useCasesCount: data.useCases.length,
        gapRowsCount: data.gapRows.length,
        landingSectionsCount: data.landingSections.length,
        payloadCollectionPreviewsCount: data.payloadCollectionPreviews.length,
      },
      null,
      2,
    ),
  );
}

run().catch((err) => {
  console.error('API contract smoke test FAILED:', err.message);
  process.exit(1);
});
