/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { CalculatorShell } from './components/CalculatorShell';
import { ScientificFloatingModal } from './components/ScientificFloatingModal';
import { Footer } from './components/Footer';
import { TOOLS } from './data/toolsData';
import { ToolItem, ToolCategory } from './types';
import { Sparkles, Layers, SlidersHorizontal, Calculator } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sp-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [quickCalcOpen, setQuickCalcOpen] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      try {
        localStorage.setItem('sp-theme', 'dark');
      } catch {}
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      try {
        localStorage.setItem('sp-theme', 'light');
      } catch {}
    }
  }, [isDark]);

  // Support URL hash routing (e.g. #bmi, #mortgage)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (!hash || hash === 'home' || hash === 'tools') {
        setActiveToolId(null);
      } else {
        const found = TOOLS.find((t) => t.id === hash);
        if (found) {
          setActiveToolId(found.id);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectTool = (id: string) => {
    setActiveToolId(id);
    window.location.hash = `#${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveToolId(null);
    setSelectedCategory('all');
    setSearchQuery('');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (activeToolId) {
      setActiveToolId(null);
      window.location.hash = '#tools';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    let list = TOOLS;
    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDesc.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] transition-colors duration-250">
      {/* Header with Top Bar Contract & Mobile Drawer */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenQuickCalc={() => setQuickCalcOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTool ? (
          <CalculatorShell
            tool={activeTool}
            onBack={handleGoHome}
            onSelectTool={handleSelectTool}
          />
        ) : (
          <>
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              totalToolsCount={TOOLS.length}
            />

            {/* Tools Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-2xl text-[#0f2a24] dark:text-[#e6f2ee]">
                    {selectedCategory === 'all'
                      ? searchQuery
                        ? 'Search Results'
                        : 'All Calculators & Tools'
                      : `${selectedCategory} Calculators`}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#d5e0dc]/60 dark:bg-[#243a35] text-[#4f6b64] dark:text-[#9fb8b1]">
                    {filteredTools.length}
                  </span>
                </div>
              </div>

              {filteredTools.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#ffffff] dark:bg-[#132420] border border-[#d5e0dc] dark:border-[#243a35] space-y-3">
                  <p className="text-base font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">
                    No calculators match "{searchQuery}"
                  </p>
                  <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
                    Try checking for spelling or searching for general terms like "loan", "bmi", "mortgage", or "percentage".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c] hover:opacity-90"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelect={handleSelectTool}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Floating Scientific Calculator Modal */}
      <ScientificFloatingModal
        isOpen={quickCalcOpen}
        onClose={() => setQuickCalcOpen(false)}
      />

      {/* Site Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
