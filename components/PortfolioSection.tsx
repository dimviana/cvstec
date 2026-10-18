'use client';

import React, { useState, useEffect } from 'react';
import { portfolioServices, ServiceItem, ServiceCategory } from '@/lib/portfolio-data';
import { Language, translations } from '@/lib/translations';
import { Wrench, X, ArrowUpRight, MessageSquare, Sparkles, Key, Cpu, Laptop } from 'lucide-react';

interface PortfolioSectionProps {
  lang: Language;
  isDark?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ lang, isDark = true }) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = portfolioServices.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  const handleWhatsAppQuote = (service: ServiceItem) => {
    const message = lang === 'pt'
      ? `Olá CVSTEC! Gostaria de um orçamento para o serviço de *${service.title}*.`
      : `Hello CVSTEC! I would like to request a quote for *${service.title}*.`;
    const url = `https://wa.me/5581994564800?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getCategoryIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'locksmith':
        return <Key className="w-3.5 h-3.5 text-[#E30613]" />;
      case 'automotive_ecu':
        return <Cpu className="w-3.5 h-3.5 text-[#E30613]" />;
      case 'electronics_pc':
        return <Laptop className="w-3.5 h-3.5 text-[#E30613]" />;
    }
  };

  const getCategoryLabel = (category: ServiceCategory) => {
    switch (category) {
      case 'locksmith':
        return lang === 'pt' ? 'Chaveiro Veicular' : 'Vehicle Locksmith';
      case 'automotive_ecu':
        return lang === 'pt' ? 'Injeção Eletrônica & BSI' : 'ECU & BSI Modules';
      case 'electronics_pc':
        return lang === 'pt' ? 'Placas de PC & Notebook' : 'PC & Laptop Motherboards';
    }
  };

  return (
    <section className="w-full mt-8 pt-6 border-t border-gray-800/40 dark:border-gray-800/40">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#E30613]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              {t.portfolioTitle}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.portfolioSubtitle}
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {[
          { key: 'all', label: t.filterAll },
          { key: 'locksmith', label: t.filterLocksmith },
          { key: 'automotive_ecu', label: t.filterAutomotiveEcu },
          { key: 'electronics_pc', label: t.filterElectronicsPc },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveCategory(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === tab.key
                ? 'bg-[#E30613] text-white shadow-sm shadow-red-600/30 font-semibold'
                : isDark
                ? 'bg-[#1C1C1C] text-gray-300 hover:bg-[#252525] hover:text-white border border-[#333333]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service)}
            className={`group cursor-pointer rounded-xl p-4 transition-all duration-300 border text-left flex flex-col justify-between ${
              isDark
                ? 'bg-[#171717] border-[#2A2A2A] hover:border-[#E30613]/60 hover:bg-[#1E1E1E]'
                : 'bg-white border-gray-200 hover:border-[#E30613]/60 hover:bg-gray-50/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-bold text-sm sm:text-base tracking-tight leading-snug flex items-center gap-1.5">
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#E30613] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#E30613] font-medium mb-2">
                {getCategoryIcon(service.category)}
                <span>{getCategoryLabel(service.category)}</span>
              </div>

              <p
                className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {service.tagline[lang]}
              </p>
            </div>

            <div>
              {/* Metrics preview */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-800/40 dark:border-gray-800/40 text-[11px]">
                <div className="font-bold text-[#E30613]">{service.metrics[0]?.value}</div>
                <div className={`truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {service.metrics[0]?.label[lang]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl border transition-all ${
              isDark
                ? 'bg-[#151515] border-[#333333] text-white'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-800/50 dark:border-gray-800/50">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E30613]/15 text-[#E30613] mb-1">
                  {getCategoryIcon(selectedService.category)}
                  <span>{getCategoryLabel(selectedService.category)}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {selectedService.title}
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedService.tagline[lang]}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500'
                }`}
                aria-label={t.closeModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-5">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E30613] mb-1.5">
                  Descrição do Serviço
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedService.description[lang]}
                </p>
              </div>

              {/* Metrics / Guarantee */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E30613] mb-2">
                  {t.projectImpact}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedService.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-center ${
                        isDark ? 'bg-[#1C1C1C] border-[#2B2B2B]' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold text-[#E30613]">
                        {metric.value}
                      </div>
                      <div className={`text-[10px] mt-0.5 leading-tight ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {metric.label[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables / Capabilities */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E30613] mb-2">
                  {t.projectDeliverables}
                </h4>
                <ul className="space-y-1.5">
                  {selectedService.deliverables[lang].map((item, idx) => (
                    <li
                      key={idx}
                      className={`text-xs flex items-start gap-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-[#E30613] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment & Tools */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E30613] mb-2">
                  {t.projectTech}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                        isDark
                          ? 'bg-[#1F1F1F] text-gray-300 border-[#333333]'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-gray-800/50 dark:border-gray-800/50 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handleWhatsAppQuote(selectedService)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-[#E30613] text-white hover:bg-red-700 shadow-lg shadow-red-600/25 active:scale-[0.98] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                {t.requestQuote}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
