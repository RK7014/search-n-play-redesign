export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "snp-theme";
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Source for the blocking inline script rendered in <head>. It runs before
 * hydration and sets data-theme synchronously from localStorage, so the
 * page never flashes the wrong theme on load. Kept as a plain string (not
 * JSX) so it can go straight into a <script> tag via dangerouslySetInnerHTML.
 */
export function themeInitScript(): string {
  return `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = stored === "light" || stored === "dark" ? stored : "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
  }
})();
`.trim();
}
