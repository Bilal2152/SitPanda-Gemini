/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { CalculatorShell } from './components/CalculatorShell';
import { ScientificFloatingModal } from './components/ScientificFloatingModal';
import { RecentCalculations } from './components/RecentCalculations';
import { Footer } from './components/Footer';
import { TOOLS } from './data/toolsData';
import { ToolItem, RecentCalculation } from './types';
import { Heart, Search, Sparkles } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'sp-favorites';
const RECENT_CALCS_STORAGE_KEY = 'sp-recent-calcs';

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

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['mortgage', 'bmi', 'scientific', 'percentage'];
    } catch {
      return ['mortgage', 'bmi', 'scientific', 'percentage'];
    }
  });

  // Recent calculations state (last 5)
  const [recentCalculations, setRecentCalculations] = useState<RecentCalculation[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_CALCS_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'seed-1',
              toolId: 'mortgage',
              toolName: 'Mortgage Calculator',
              summary: '$400k @ 6.5% -> $2,522.62/mo',
              timestamp: Date.now() - 1000 * 60 * 15,
            },
            {
              id: 'seed-2',
              toolId: 'bmi',
              toolName: 'BMI Calculator',
              summary: '70 kg / 175 cm -> 22.9 Normal',
              timestamp: Date.now() - 1000 * 60 * 45,
            },
            {
              id: 'seed-3',
              toolId: 'scientific',
              toolName: 'Scientific Calculator',
              summary: '8 × 9 = 72',
              timestamp: Date.now() - 1000 * 60 * 120,
            },
          ];
    } catch {
      return [];
    }
  });

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

  // Sync favorites to localStorage
  const handleToggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      let next: string[];
      if (prev.includes(toolId)) {
        next = prev.filter((id) => id !== toolId);
      } else {
        next = [...prev, toolId];
      }
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Add a recent calculation
  const addRecentCalculation = useCallback((toolId: string, toolName: string, summary: string) => {
    setRecentCalculations((prev) => {
      const item: RecentCalculation = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        toolId,
        toolName,
        summary,
        timestamp: Date.now(),
      };
      const updated = [item, ...prev.filter((c) => c.summary !== summary)].slice(0, 5);
      try {
        localStorage.setItem(RECENT_CALCS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const handleClearRecent = () => {
    setRecentCalculations([]);
    try {
      localStorage.removeItem(RECENT_CALCS_STORAGE_KEY);
    } catch {}
  };

  // Global Keyboard Event Listener mapping calculator inputs (0-9, +, -, *, /, =)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input, textarea, select or contenteditable
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isInputFocused =
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target?.isContentEditable;

      if (isInputFocused) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const calcKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'Enter'];

      if (calcKeys.includes(e.key)) {
        // If Quick Calc is closed and user taps a calculator key on desktop, open it!
        if (!quickCalcOpen) {
          e.preventDefault();
          setQuickCalcOpen(true);
        }
      } else if (e.key === 'Escape' && quickCalcOpen) {
        e.preventDefault();
        setQuickCalcOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [quickCalcOpen]);

  // Support URL hash routing (e.g. #bmi, #mortgage)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (!hash || hash === 'home' || hash === 'tools') {
        setActiveToolId(null);
      } else if (hash === 'favorites') {
        setActiveToolId(null);
        setSelectedCategory('favorites');
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
      window.location.hash = cat === 'all' ? '#home' : cat === 'favorites' ? '#favorites' : '#tools';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    let list = TOOLS;
    if (selectedCategory === 'favorites') {
      list = list.filter((t) => favorites.includes(t.id));
    } else if (selectedCategory !== 'all') {
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
  }, [selectedCategory, searchQuery, favorites]);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] transition-colors duration-250">
      {/* Header with Top Bar Contract, Favorites nav badge & Mobile Drawer */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenQuickCalc={() => setQuickCalcOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onGoHome={handleGoHome}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTool ? (
          <CalculatorShell
            tool={activeTool}
            onBack={handleGoHome}
            onSelectTool={handleSelectTool}
            onRecordCalculation={addRecentCalculation}
          />
        ) : (
          <>
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              totalToolsCount={TOOLS.length}
              favoritesCount={favorites.length}
            />

            {/* Recent Calculations Section (displays last 5 operations) */}
            <RecentCalculations
              recentCalcs={recentCalculations}
              onSelectTool={handleSelectTool}
              onClear={handleClearRecent}
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
                      : selectedCategory === 'favorites'
                      ? 'Your Favorite Tools'
                      : `${selectedCategory} Calculators`}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#d5e0dc]/60 dark:bg-[#243a35] text-[#4f6b64] dark:text-[#9fb8b1]">
                    {filteredTools.length}
                  </span>
                </div>
              </div>

              {filteredTools.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#ffffff] dark:bg-[#132420] border border-[#d5e0dc] dark:border-[#243a35] space-y-4">
                  {selectedCategory === 'favorites' ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center">
                        <Heart className="w-6 h-6" />
                      </div>
                      <p className="text-base font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">
                        No favorited tools yet
                      </p>
                      <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] max-w-sm mx-auto">
                        Click the heart icon on any calculator card to bookmark your most-used tools for one-click access.
                      </p>
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c] hover:opacity-90"
                      >
                        Browse All Calculators
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={handleToggleFavorite}
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
        onCalculationDone={(summary) =>
          addRecentCalculation('scientific', 'Scientific Calculator', summary)
        }
      />

      {/* Site Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
