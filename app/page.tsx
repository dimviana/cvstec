'use client';

import React from 'react';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { CvstecLogo } from '@/components/CvstecLogo';
import { HeaderControls } from '@/components/HeaderControls';
import { SocialCard } from '@/components/SocialCard';
import { PortfolioSection } from '@/components/PortfolioSection';
import { translations } from '@/lib/translations';
import { usePreferences } from '@/hooks/use-preferences';
import { ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { isDark, lang, setLanguage, toggleTheme } = usePreferences();
  const t = translations[lang];

  return (
    <main
      suppressHydrationWarning
      className={`min-h-screen relative transition-colors duration-500 overflow-x-hidden ${
        isDark ? 'bg-[#111111] text-white' : 'bg-[#F8F9FA] text-[#111111]'
      }`}
    >
      {/* Interactive Background Particle Canvas */}
      <ParticleCanvas isDark={isDark} />

      {/* Subtle Ambient Radial Lighting */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-50"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 15%, rgba(227, 6, 19, 0.18) 0%, rgba(17, 17, 17, 0) 65%)'
            : 'radial-gradient(circle at 50% 15%, rgba(227, 6, 19, 0.08) 0%, rgba(248, 249, 250, 0) 65%)',
        }}
      />

      {/* Main Container — Optimized for Mobile First (375px–430px up to Desktop) */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-3 sm:py-6 flex flex-col min-h-screen justify-between">
        {/* Top Header Controls (Flags & Theme Toggle) */}
        <header className="w-full">
          <HeaderControls
            lang={lang}
            onLanguageChange={setLanguage}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
        </header>

        {/* Brand Hero Section */}
        <section className="flex flex-col items-center text-center mt-2 mb-6 sm:mb-8">
          {/* Centered CVSTEC Logo */}
          <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
            <CvstecLogo isDark={isDark} className="w-56 sm:w-64 h-auto mx-auto" />
          </div>

          {/* Slogan & Verification */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#E30613] tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 fill-[#E30613]/20" />
            <span>{t.roleSubtitle}</span>
          </div>

          {/* Bio Description */}
          <p
            className={`mt-2.5 text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.bioDescription}
          </p>

          {/* Quick Metrics Strip */}
          <div
            className={`mt-4 grid grid-cols-3 divide-x rounded-xl p-2.5 w-full text-center border backdrop-blur-md ${
              isDark
                ? 'bg-[#181818]/80 border-[#2E2E2E] divide-gray-800 text-gray-300'
                : 'bg-white/80 border-gray-200 divide-gray-200 text-gray-700 shadow-sm'
            }`}
          >
            <div className="px-1">
              <div className="text-xs sm:text-sm font-bold text-[#E30613]">100%</div>
              <div className="text-[10px] sm:text-[11px] opacity-80 leading-tight mt-0.5">
                {lang === 'pt' ? 'Chaves & Chips' : 'Keys & Chips'}
              </div>
            </div>
            <div className="px-1">
              <div className="text-xs sm:text-sm font-bold text-[#E30613]">Linha Leve</div>
              <div className="text-[10px] sm:text-[11px] opacity-80 leading-tight mt-0.5">
                {lang === 'pt' ? 'Injeção & BSI' : 'ECU & BSI'}
              </div>
            </div>
            <div className="px-1">
              <div className="text-xs sm:text-sm font-bold text-[#E30613]">Garantia</div>
              <div className="text-[10px] sm:text-[11px] opacity-80 leading-tight mt-0.5">
                {lang === 'pt' ? 'Serviço Confiável' : 'Tested & Backed'}
              </div>
            </div>
          </div>
        </section>

        {/* Social Link Hub Section */}
        <section className="space-y-3 sm:space-y-3.5 w-full">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              {t.connectTitle}
            </span>
            <span className="text-[11px] text-[#E30613] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] animate-ping" />
              Direct Links
            </span>
          </div>

          {/* 1. Instagram Card */}
          <SocialCard
            network="instagram"
            title={t.instagramTitle}
            subtitle={t.instagramSubtitle}
            actionLabel={t.instagramAction}
            url="https://www.instagram.com/cvstec/"
            isDark={isDark}
            highlight={true}
          />

          {/* 2. YouTube Card */}
          <SocialCard
            network="youtube"
            title={t.youtubeTitle}
            subtitle={t.youtubeSubtitle}
            actionLabel={t.youtubeAction}
            url="https://www.youtube.com/channel/UCiwGvDZBR0MJagCci3uhu0A"
            isDark={isDark}
          />

          {/* 3. WhatsApp Card (Direct Line) */}
          <SocialCard
            network="whatsapp"
            title={t.whatsappTitle}
            subtitle={`${t.whatsappSubtitle} · ${t.phoneDisplay}`}
            actionLabel={t.whatsappAction}
            url="https://wa.me/5581994564800?text=Ol%C3%A1!%20Vim%20pelo%20link%20da%20bio%20da%20CVSTEC%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20de%20chaveiro%20veicular%20e%20eletr%C3%B4nica."
            isDark={isDark}
            highlight={true}
          />
        </section>

        {/* Interactive Portfolio & Services Section */}
        <PortfolioSection lang={lang} isDark={isDark} />

        {/* Quick Contact Footer Bar */}
        <footer className="mt-10 pt-6 pb-4 border-t border-gray-800/50 text-center select-none">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#E30613]" />
            <span className="text-xs font-bold tracking-wider uppercase text-gray-400">
              CVSTEC Soluções Automotivas
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            © 2026 CVSTEC · {t.footerRights}
          </p>
          <p className="text-[10px] text-gray-600 mt-1">
            {t.footerTagline}
          </p>
        </footer>
      </div>
    </main>
  );
}
