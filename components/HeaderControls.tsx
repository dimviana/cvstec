'use client';

import React, { useState } from 'react';
import { Language, translations } from '@/lib/translations';
import { Sun, Moon, Share2, Check } from 'lucide-react';

interface HeaderControlsProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  lang,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'CVSTEC — Especialista em Tecnologia & Inovação',
          text: t.bioDescription,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="w-full flex items-center justify-between py-3 px-1 sm:px-2 select-none">
      {/* Language Switcher Flag Button */}
      <div className="flex items-center gap-1 bg-black/20 dark:bg-black/30 backdrop-blur-md p-1 rounded-full border border-gray-700/40">
        <button
          type="button"
          onClick={() => onLanguageChange('pt')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
            lang === 'pt'
              ? 'bg-[#E30613] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
          title="Português (Brasil)"
          aria-label="Selecionar idioma Português"
        >
          <span className="text-sm">🇧🇷</span>
          <span>PT</span>
        </button>
        <button
          type="button"
          onClick={() => onLanguageChange('en')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
            lang === 'en'
              ? 'bg-[#E30613] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
          title="English (US)"
          aria-label="Select English language"
        >
          <span className="text-sm">🇺🇸</span>
          <span>EN</span>
        </button>
      </div>

      {/* Right controls: Theme Switcher & Share */}
      <div className="flex items-center gap-2">
        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className={`relative p-2.5 rounded-full transition-all border ${
            isDark
              ? 'bg-[#1C1C1C] text-gray-300 hover:text-white hover:bg-[#252525] border-[#333333]'
              : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200 shadow-sm'
          }`}
          title={t.shareProfile}
          aria-label={t.shareProfile}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          {copied && (
            <span className="absolute -bottom-8 right-0 text-[10px] whitespace-nowrap bg-emerald-600 text-white px-2 py-0.5 rounded shadow-lg">
              {t.profileCopied}
            </span>
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={`p-2.5 rounded-full transition-all border ${
            isDark
              ? 'bg-[#1C1C1C] text-amber-400 hover:bg-[#252525] border-[#333333]'
              : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-200 shadow-sm'
          }`}
          title={isDark ? t.themeToggleLight : t.themeToggleDark}
          aria-label={isDark ? t.themeToggleLight : t.themeToggleDark}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
