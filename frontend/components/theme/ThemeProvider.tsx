"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme, type Theme } from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// useLayoutEffect warns when it runs during SSR (its effect can't be
// encoded in server HTML); this component is client-only in practice but
// Next.js still renders it once on the server for the initial page load, so
// fall back to the no-op-on-server useEffect there.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Must start from the same value the server rendered (DEFAULT_THEME) so
  // the hydration render matches exactly — reading the DOM here instead
  // would pick up whatever the blocking <head> script already set, which
  // differs from the server output whenever a visitor's stored theme isn't
  // the default and throws a hydration mismatch.
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // Correct that initial guess from the DOM immediately after mount, before
  // the browser paints, so any theme-dependent UI (e.g. ThemeToggle's icon)
  // never visibly flashes the wrong state.
  useIsomorphicLayoutEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (isTheme(attr) && attr !== DEFAULT_THEME) {
      setThemeState(attr);
    }
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing / storage disabled — theme still applies for this
      // session via the DOM attribute, it just won't persist.
    }
  }, []);

  // Keep in sync if the user changes the theme in another tab.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) {
        setThemeState(event.newValue);
        document.documentElement.setAttribute("data-theme", event.newValue);
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme, applyTheme]);

  const value = useMemo(
    () => ({ theme, setTheme: applyTheme, toggleTheme }),
    [theme, applyTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
