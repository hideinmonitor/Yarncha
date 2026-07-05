import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const match = app.match(/const themePresets=\[[\s\S]*?\n\];/);
assert.ok(match, "theme presets are declared");
const themePresets = vm.runInNewContext(`${match[0]}\nthemePresets;`);

const requiredLight = ["primary","secondary","accent","background","surface","card","border","text","textSecondary","button","buttonText","secondaryButton","success","warning","danger","highlight","link"];
const requiredDark = ["background","surface","card","text","textSecondary","button","secondary","accent","border","success","warning","danger","highlight","link"];
const requiredColors = ["background","surface","surfaceSecondary","primary","primaryHover","secondary","accent","border","divider","text","textSecondary","success","warning","error","chartCurrentRow","chartCompleted","annotationPen","annotationHighlight","voiceListening","shadow"];

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}
function luminance(hex) {
  return hexToRgb(hex).map(channel => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}
function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

assert.equal(themePresets.length, 8, "Yarncha keeps eight theme identities");
assert.equal(JSON.stringify(themePresets.map(theme => theme.id)), JSON.stringify(["corner-of-light","flower-blossom","sky-blessing","matcha-grove","ocean-mist","mediterranean-dream","sakura-milk","lavender-twilight"]), "theme gallery uses the requested theme set");
assert.equal(themePresets[0].name, "Corner of Light", "Corner of Light is the first/default theme");
assert.equal(themePresets[0].badge, "Vintage", "Corner of Light uses the Vintage badge");
assert.equal(themePresets[0].description, "Warm paper layers, earthy accents, and a grounded craft journal feel.", "Corner of Light uses the requested description");
assert.equal(themePresets[0].primary, "#793409", "Corner of Light uses deep cocoa primary");
assert.equal(themePresets[0].accent, "#C96C23", "Corner of Light uses burnt orange accent");
assert.equal(themePresets[0].secondary, "#AD9E66", "Corner of Light uses dusty olive support");
assert.equal(themePresets[0].highlight, "#FCC277", "Corner of Light uses soft amber highlight");
assert.equal(themePresets[0].recommended, true, "Corner of Light is recommended");
assert.equal(themePresets[0].canDelete, false, "Corner of Light cannot be deleted");
assert.match(app, /theme:\{name:"corner-of-light"/, "starter theme defaults to Corner of Light");
for (const theme of themePresets) {
  assert.equal("japaneseName" in theme, false, `${theme.id} is English-only in the theme system`);
  assert.ok(theme.description, `${theme.id} has a mood description`);
  for (const key of requiredColors) assert.ok(theme.colors?.[key], `${theme.id} has colors.${key}`);
  for (const key of requiredLight) assert.match(theme[key] || "", /^#[0-9A-F]{6}$/i, `${theme.id} has light ${key}`);
  for (const key of requiredDark) assert.match(theme.dark?.[key] || "", /^#[0-9A-F]{6}$/i, `${theme.id} has dark ${key}`);
  assert.ok(contrast(theme.text, theme.background) >= 7, `${theme.id} primary text has strong light contrast`);
  assert.ok(contrast(theme.textSecondary, theme.card) >= 4.5, `${theme.id} secondary text has AA light contrast`);
  assert.ok(contrast(theme.link, theme.background) >= 4.5, `${theme.id} link has AA light contrast`);
  assert.ok(contrast(theme.buttonText, theme.button) >= 4.5, `${theme.id} primary button text has AA light contrast`);
  assert.ok(contrast(theme.dark.text, theme.dark.background) >= 7, `${theme.id} primary text has strong dark contrast`);
  assert.ok(contrast(theme.dark.textSecondary, theme.dark.surface) >= 4.5, `${theme.id} secondary text has AA dark contrast`);
  assert.ok(contrast(theme.dark.link, theme.dark.background) >= 4.5, `${theme.id} dark link has AA contrast`);
  assert.ok(contrast(theme.dark.buttonText || "#11130F", theme.dark.button) >= 4.5, `${theme.id} dark primary button text has AA contrast`);
}

const skyBlessing = themePresets.find(theme => theme.id === "sky-blessing");
assert.ok(skyBlessing, "Sky Blessing replaces Morning Orchard");
assert.equal(skyBlessing.name, "Sky Blessing");
assert.equal(skyBlessing.description, "Clear sky, soft mint, and golden sunshine for a fresh calm workspace.");
assert.equal(JSON.stringify(skyBlessing.tags), JSON.stringify(["fresh","green","yellow","soft","airy"]));
assert.deepEqual(
  {
    background: skyBlessing.colors.background,
    surface: skyBlessing.colors.surface,
    surfaceSecondary: skyBlessing.colors.surfaceSecondary,
    primary: skyBlessing.colors.primary,
    primaryHover: skyBlessing.colors.primaryHover,
    secondary: skyBlessing.colors.secondary,
    accent: skyBlessing.colors.accent,
    accentSoft: skyBlessing.colors.accentSoft,
    border: skyBlessing.colors.border,
    divider: skyBlessing.colors.divider,
    text: skyBlessing.colors.text,
    textSecondary: skyBlessing.colors.textSecondary,
    success: skyBlessing.colors.success,
    warning: skyBlessing.colors.warning,
    error: skyBlessing.colors.error,
    chartCurrentRow: skyBlessing.colors.chartCurrentRow,
    chartCompleted: skyBlessing.colors.chartCompleted,
    annotationPen: skyBlessing.colors.annotationPen,
    annotationHighlight: skyBlessing.colors.annotationHighlight,
    voiceListening: skyBlessing.colors.voiceListening,
    shadow: skyBlessing.colors.shadow
  },
  {
    background: "#F7FAF7",
    surface: "#FFFFFF",
    surfaceSecondary: "#F1F5F1",
    primary: "#404930",
    primaryHover: "#313927",
    secondary: "#BDD3D0",
    accent: "#BD962F",
    accentSoft: "#EFD36D",
    border: "#D8DED6",
    divider: "#E8EDE6",
    text: "#2F3528",
    textSecondary: "#66705F",
    success: "#5E7046",
    warning: "#BD962F",
    error: "#B94A48",
    chartCurrentRow: "#BDD3D0",
    chartCompleted: "#EFD36D",
    annotationPen: "#404930",
    annotationHighlight: "rgba(239, 211, 109, 0.35)",
    voiceListening: "#BD962F",
    shadow: "rgba(47, 53, 40, 0.08)"
  },
  "Sky Blessing uses the requested base palette tokens"
);

for (const token of ["--nav-bg","--primary-button","--secondary-button","--warning","--error","--link-color","--row-highlight"]) {
  assert.match(css, new RegExp(token.replace("--", "--")), `${token} token is defined or consumed`);
}
assert.match(css, /background:var\(--primary-button\)/, "primary actions use the semantic primary button token");
assert.match(css, /background:var\(--secondary-button\)/, "secondary actions use the semantic secondary button token");
assert.match(css, /var\(--nav-bg\)/, "navigation uses its own theme layer");
assert.match(app, /themeGalleryCardHtml/, "theme picker uses the premium gallery card renderer");
assert.match(app, /data-theme-card/, "theme cards are the theme selection target");
assert.match(app, /role="button" tabindex="0"/, "theme cards are keyboard-focusable buttons");
assert.match(app, /card\.onkeydown=.*Enter.* /s, "theme cards can be selected with Enter or Space");
assert.match(app, /theme-active-badge/, "active theme has an explicit non-colour badge");
assert.doesNotMatch(app, /data-theme-name|theme-apply-button|Apply Theme|Copy HEX|theme-hex-row|palette hex codes/, "theme gallery does not expose Apply buttons or visible HEX details");
assert.match(css, /\.theme-preview-card:focus-visible/, "theme gallery keeps a visible keyboard focus state");
assert.match(css, /\.theme-preview-card\.active[^}]+border-width:3px/, "active theme card has a strong selected border");
assert.match(css, /\.theme-preview-card:hover[^}]+translateY\(-3px\)/, "theme cards lift on hover");
assert.doesNotMatch(app, /theme-japanese-name|japaneseName|Morning Orchard|morning-orchard/, "theme UI no longer exposes Japanese subtitles or Morning Orchard");
assert.match(app, /Palette inspiration: @Lux Design Studio from Pinterest\./, "theme selector shows the requested palette credit");
assert.match(css, /\.danger-button \{[^}]*background:var\(--danger\) !important;[^}]*color:#FFFFFF !important;/, "danger buttons keep red backgrounds with white text");
assert.match(css, /\.danger-button \.ui-icon,\.danger-button svg \{[^}]*#FFFFFF/, "danger button icons are white");
assert.match(css, /#9F3836/, "danger button hover state uses the requested darker red");
assert.doesNotMatch(app, /Row 42 · soft card|Active tab|Row 42 · readable card/, "Light/Dark preview contains no fake app text");
assert.match(css, /\.theme-compare-top,\.theme-compare-content \{ display:none; \}/, "lower information section is hidden from theme preview");

console.log("Theme contrast contract passed.");
