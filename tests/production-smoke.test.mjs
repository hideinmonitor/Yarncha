import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = 4197;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
  cwd: new URL("..", import.meta.url),
  stdio: ["ignore", "pipe", "pipe"]
});
let serverOutput = "";
server.stdout.on("data", chunk => { serverOutput += chunk; });
server.stderr.on("data", chunk => { serverOutput += chunk; });

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Vite preview exited early.\n${serverOutput}`);
    try { if ((await fetch(origin)).ok) return; } catch { /* Retry while Vite starts. */ }
    await new Promise(resolve => { setTimeout(resolve, 100); });
  }
  throw new Error(`Vite preview did not start.\n${serverOutput}`);
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "allow" });
  await context.addInitScript(() => localStorage.setItem("threadline-data-v1", JSON.stringify({ onboardingComplete: true })));
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const missingRequiredResources = [];
  page.on("console", message => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", error => pageErrors.push(error.stack || error.message));
  page.on("response", response => {
    const url = new URL(response.url());
    if (url.origin === origin && response.status() >= 400 && (/\/assets\//.test(url.pathname) || ["/", "/index.html", "/manifest.webmanifest", "/service-worker.js"].includes(url.pathname))) {
      missingRequiredResources.push(`${response.status()} ${url.pathname}`);
    }
  });

  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator("#today-view").waitFor({ state: "visible" });
  await page.emulateMedia({ colorScheme: "light" });
  const originalLight = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    const brand = getComputedStyle(document.querySelector(".brand strong"));
    const heading = getComputedStyle(document.querySelector("#today-view h1"));
    const card = getComputedStyle(document.querySelector("#today-view .card"));
    const button = getComputedStyle(document.querySelector(".primary-button"));
    return {
      theme: document.documentElement.dataset.theme,
      mode: document.documentElement.dataset.mode,
      style: document.documentElement.dataset.style,
      background: root.getPropertyValue("--bg-primary").trim(),
      surface: root.getPropertyValue("--surface").trim(),
      text: root.getPropertyValue("--text-primary").trim(),
      buttonToken: root.getPropertyValue("--primary-button").trim(),
      accent: root.getPropertyValue("--accent").trim(),
      highlight: root.getPropertyValue("--highlight").trim(),
      bodyFont: body.fontFamily,
      bodyBackground: body.backgroundColor,
      brandFont: brand.fontFamily,
      brandSize: brand.fontSize,
      brandWeight: brand.fontWeight,
      headingFont: heading.fontFamily,
      cardBackground: card.backgroundColor,
      buttonBackground: button.backgroundColor
    };
  });
  assert.deepEqual(
    {theme:originalLight.theme,mode:originalLight.mode,style:originalLight.style},
    {theme:"creamy-vanilla",mode:"system",style:"original-classic"},
    "the app defaults to Creamy Vanilla, System, and Original Classic"
  );
  assert.deepEqual(
    [originalLight.background,originalLight.surface,originalLight.text,originalLight.buttonToken,originalLight.accent,originalLight.highlight],
    ["#F6F0E6","#FFFAF3","#463D35","#5F6958","#B7785F","#C4A269"],
    "system mode on a light device resolves the original six-colour identity"
  );
  assert.match(originalLight.bodyFont,/DM Sans/,"body text resolves to DM Sans");
  assert.match(originalLight.brandFont,/Fraunces/,"the Yarncha wordmark resolves to Fraunces");
  assert.match(originalLight.headingFont,/Fraunces/,"headings resolve to Fraunces");
  assert.equal(originalLight.brandSize,"21px","the wordmark resolves to its original size");
  assert.equal(originalLight.brandWeight,"700","the wordmark resolves to its original weight");
  assert.equal(originalLight.bodyBackground,"rgb(246, 240, 230)","light page background is the original cream");
  assert.equal(originalLight.cardBackground,"rgb(255, 250, 243)","light cards use the original paper surface");
  assert.equal(originalLight.buttonBackground,"rgb(95, 105, 88)","primary actions use the original sage button");

  const brandAcrossAlternateTheme = await page.evaluate(() => {
    const brand = document.querySelector(".brand strong");
    const before = getComputedStyle(brand).fontFamily;
    document.documentElement.dataset.theme = "flower-blossom";
    const after = getComputedStyle(brand).fontFamily;
    document.documentElement.dataset.theme = "creamy-vanilla";
    return {before,after};
  });
  assert.equal(brandAcrossAlternateTheme.after,brandAcrossAlternateTheme.before,"an alternate colour preset cannot change the Yarncha brand font");

  await page.evaluate(() => { document.documentElement.dataset.mode = "dark"; });
  const darkColours = await page.evaluate(() => {
    const root=getComputedStyle(document.documentElement);
    return {background:root.getPropertyValue("--bg-primary").trim(),surface:root.getPropertyValue("--surface").trim()};
  });
  assert.notEqual(darkColours.background,"#F6F0E6","dark mode does not inherit the light cream background");
  assert.notEqual(darkColours.surface,"#FFFAF3","dark mode does not inherit the light paper surface");

  await page.evaluate(() => { document.documentElement.dataset.mode = "system"; });
  await page.emulateMedia({ colorScheme: "dark" });
  const systemDarkBackground = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim());
  assert.equal(systemDarkBackground,darkColours.background,"system mode follows a dark device preference");
  await page.emulateMedia({ colorScheme: "light" });
  const systemLightBackground = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim());
  assert.equal(systemLightBackground,"#F6F0E6","system mode follows a light device preference");

  assert.equal(await page.locator("script[src]").count(), 1, "the browser receives one application entry");
  assert.equal(await page.locator("[onclick],[onload],[onerror],[onmouseover]").count(), 0, "rendered markup has no inline script handlers");
  assert.equal(await page.locator("#mobile-menu").count(), 0, "the dead mobile-menu control is absent");
  assert.equal(await page.locator(".topbar button").count(), 0, "the top bar contains no global action buttons");
  assert.equal(await page.locator(".sidebar button:visible").count(), 5, "mobile exposes five coherent bottom navigation entries");

  const newProject = page.getByRole("button", { name: "Create new project" });
  await newProject.waitFor({ state: "visible" });
  const newProjectBox = await newProject.boundingBox();
  assert.ok(newProjectBox && newProjectBox.width >= 44 && newProjectBox.height >= 44, "mobile New project has a 44px touch target and accessible name");

  await newProject.focus();
  await newProject.press("Enter");
  await page.locator("[role=dialog]").waitFor({ state: "visible" });
  assert.equal(await page.evaluate(() => document.querySelector("[role=dialog]")?.contains(document.activeElement)), true, "modal moves focus inside");
  await page.keyboard.press("Escape");
  await page.locator("[role=dialog]").waitFor({ state: "hidden" });
  assert.equal(await newProject.evaluate(element => element === document.activeElement), true, "modal restores focus to its opener");

  const more = page.getByRole("button", { name: "More", exact: true });
  await more.click();
  const moreDialog = page.locator("[role=dialog]");
  await moreDialog.waitFor({ state: "visible" });
  assert.equal(await moreDialog.getByRole("button", { name: "Log in Saved on this device", exact: true }).count(), 1, "mobile More exposes the signed-out account destination");
  assert.equal(await moreDialog.getByRole("button", { name: "Appearance Theme, mode and language", exact: true }).count(), 1, "mobile More exposes Appearance");
  assert.equal(await moreDialog.evaluate(element => element.contains(document.activeElement)), true, "mobile More moves focus into its dialog");
  await page.keyboard.press("Escape");
  await moreDialog.waitFor({ state: "hidden" });
  assert.equal(await more.evaluate(element => element === document.activeElement), true, "mobile More restores focus to its trigger");

  await page.getByRole("button", { name: "Projects", exact: true }).click();
  await page.locator("[data-project-id]").first().click();
  const voiceBox = await page.getByRole("button", { name: "Voice row controls", exact: true }).boundingBox();
  assert.ok(voiceBox && voiceBox.width >= 44 && voiceBox.height >= 44, "contextual mobile voice control meets the 44px touch target");
  const notes = page.locator("#project-notes");
  await notes.waitFor({ state: "visible" });
  assert.equal(await notes.evaluate(element => Boolean(element.labels?.length)), true, "project notes has a persistent programmatic label");
  const noteValue = `Production persistence ${Date.now()}`;
  await notes.fill(noteValue);
  await notes.blur();
  await page.waitForFunction(() => document.querySelector("#save-status")?.textContent?.includes("Saved on this device"));

  const workerState = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    return registration.active?.state;
  });
  assert.equal(workerState, "activated", "the production worker installs and activates");
  assert.deepEqual(consoleErrors, [], `production startup console errors:\n${consoleErrors.join("\n")}`);
  assert.deepEqual(pageErrors, [], `production page errors:\n${pageErrors.join("\n")}`);
  assert.deepEqual(missingRequiredResources, [], `missing required resources:\n${missingRequiredResources.join("\n")}`);

  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  await page.locator("[data-project-id]").first().click();
  assert.equal(await page.locator("#project-notes").inputValue(), noteValue, "debounced notes flush on blur and survive reload");

  await context.setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#today-view").waitFor({ state: "visible" });
  assert.equal(await page.title(), "Yarncha", "the app shell reopens offline after an online visit");
  await context.setOffline(false);
  await context.close();
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}

console.log("Production browser smoke passed with zero startup errors, missing resources, or offline failures.");
