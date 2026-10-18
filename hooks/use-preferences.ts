'use client';

import { useSyncExternalStore } from 'react';
import { Language } from '@/lib/translations';

// Simple pub/sub for local storage changes across components
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

export function usePreferences() {
  const isDark = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === 'undefined') return true;
      const saved = localStorage.getItem('cvstec_theme');
      return saved !== 'light';
    },
    () => true // SSR snapshot: always dark mode default
  );

  const lang = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === 'undefined') return 'pt' as Language;
      const saved = localStorage.getItem('cvstec_lang');
      return (saved === 'en' ? 'en' : 'pt') as Language;
    },
    () => 'pt' as Language // SSR snapshot: always pt default
  );

  const setLanguage = (newLang: Language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cvstec_lang', newLang);
      emitChange();
    }
  };

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const next = isDark ? 'light' : 'dark';
      localStorage.setItem('cvstec_theme', next);
      emitChange();
    }
  };

  return { isDark, lang, setLanguage, toggleTheme };
}
