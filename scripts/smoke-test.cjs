const { chromium } = require("playwright");

const baseUrl = process.env.SMOKE_BASE_URL || "https://reducto-weld.vercel.app";

async function assertText(locator, expected, label) {
  const text = (await locator.innerText()).trim();
  if (text !== expected) {
    throw new Error(`${label} expected "${expected}", received "${text}".`);
  }
  return text;
}

async function runDesktopChecks(browser) {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 750 },
    deviceScaleFactor: 1,
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const title = await page.title();
  if (title !== "Reducto") {
    throw new Error(`Title expected "Reducto", received "${title}".`);
  }

  const h1 = await assertText(page.locator("h1").first(), "Document work starts here.", "H1");

  await page.locator("button", { hasText: "Policy Analysis" }).click();
  const codeText = await page.locator(".codeFrame").innerText();
  if (!codeText.includes("slug: 'policies'")) {
    throw new Error("Use-case selection did not update the schema preview.");
  }

  await page.locator('[aria-label^="04. Patch"]').click();
  const phase = await assertText(
    page.locator(".phaseRail__item.is-active .phaseRail__label"),
    "Patch",
    "Active phase",
  );

  await page.close();
  return { title, h1, phase };
}

async function runMobileChecks(browser) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 1) {
    throw new Error(`Mobile horizontal overflow: ${overflow}px.`);
  }

  const ctaVisible = await page.locator(".heroBand__button--primary").first().isVisible();
  if (!ctaVisible) {
    throw new Error("Primary CTA is not visible on mobile.");
  }

  await page.close();
  return { overflow };
}

(async () => {
  const browser = await chromium.launch();
  try {
    const desktop = await runDesktopChecks(browser);
    const mobile = await runMobileChecks(browser);
    console.log(JSON.stringify({ baseUrl, desktop, mobile }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
