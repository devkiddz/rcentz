'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore
} from 'react';

export type RcentzThemePreference = 'light' | 'dark';

type RcentzThemeContextValue = {
  theme: RcentzThemePreference;
  resolvedTheme: RcentzThemePreference;
  setTheme: (theme: RcentzThemePreference) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'rcentz-theme';
const THEME_CHANGE_EVENT = 'rcentz-theme-change';

const RcentzThemeContext = createContext<RcentzThemeContextValue | null>(null);

function isThemePreference(value: string | null): value is RcentzThemePreference {
  return value === 'light' || value === 'dark';
}

function getSystemTheme(): RcentzThemePreference {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getThemeSnapshot(): RcentzThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (isThemePreference(stored)) {
    return stored;
  }

  return getSystemTheme();
}

function getThemeServerSnapshot(): RcentzThemePreference {
  return 'light';
}

function subscribeTheme(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  }

  function handleSystemThemeChange() {
    /*
      System preference only matters when the user
      has not explicitly selected Light or Dark.
    */
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!isThemePreference(stored)) {
      callback();
    }
  }

  window.addEventListener('storage', handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  mediaQuery.addEventListener('change', handleSystemThemeChange);

  return () => {
    window.removeEventListener('storage', handleStorage);

    window.removeEventListener(THEME_CHANGE_EVENT, callback);

    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
}

export function RcentzThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [theme]);

  const setTheme = useCallback((preference: RcentzThemePreference) => {
    localStorage.setItem(STORAGE_KEY, preference);

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme,
      toggleTheme
    }),
    [theme, setTheme, toggleTheme]
  );

  return <RcentzThemeContext.Provider value={value}>{children}</RcentzThemeContext.Provider>;
}

export function useRcentzTheme() {
  const context = useContext(RcentzThemeContext);

  if (!context) {
    throw new Error('useRcentzTheme must be used inside RcentzThemeProvider');
  }

  return context;
}
