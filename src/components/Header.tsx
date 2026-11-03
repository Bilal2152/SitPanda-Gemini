/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Moon, Calculator as CalcIcon, Menu, X, Heart } from 'lucide-react';
import { ToolCategory } from '../types';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenQuickCalc: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onGoHome: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenQuickCalc,
  isDark,
  onToggleTheme,
  onGoHome,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories: { id: string; label: string; count?: number }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'favorites', label: 'Favorites', count: favoritesCount },
    { id: 'Finance', label: 'Finance' },
    { id: 'Health', label: 'Health' },
    { id: 'Math', label: 'Math' },
    { id: 'Date', label: 'Date & Time' },
    { id: 'Everyday', label: 'Everyday' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff] dark:bg-[#132420] border-b border-[#d5e0dc] dark:border-[#243a35] transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onGoHome();
                setMobileMenuOpen(false);
              }}
              className="group flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] dark:focus-visible:ring-[#2dd4bf] rounded-lg p-1 -m-1 transition-transform"
              aria-label="SitPanda Tools Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0f766e] to-[#14b8a6] dark:from-[#2dd4bf] dark:to-[#0f766e] text-white dark:text-[#04201c] flex items-center justify-center font-bold text-lg shadow-sm">
                <CalcIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-[#0f2a24] dark:text-[#e6f2ee] whitespace-nowrap">
                Sit<span className="text-[#0f766e] dark:text-[#2dd4bf]">Panda</span> Tools
              </span>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4f6b64] dark:text-[#9fb8b1]" aria-label="Main navigation">
            <button
              onClick={() => onGoHome()}
              className={`hover:text-[#0f2a24] dark:hover:text-[#e6f2ee] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentCategory === 'all' ? 'text-[#0f766e] dark:text-[#2dd4bf] font-semibold border-b-2 border-[#0f766e] dark:border-[#2dd4bf]' : ''
              }`}
            >
              All Tools
            </button>
            {navCategories.slice(1).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`hover:text-[#0f2a24] dark:hover:text-[#e6f2ee] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                  currentCategory === cat.id ? 'text-[#0f766e] dark:text-[#2dd4bf] font-semibold border-b-2 border-[#0f766e] dark:border-[#2dd4bf]' : ''
                }`}
              >
                {cat.id === 'favorites' && <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />}
                <span>{cat.label}</span>
                {cat.count !== undefined && cat.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold font-mono">
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Quick Calc & Theme Switch) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenQuickCalc}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#0f766e] text-white hover:bg-[#0c615b] dark:bg-[#2dd4bf] dark:text-[#04201c] dark:hover:bg-[#5eead4] transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f766e] whitespace-nowrap shrink-0"
              title="Open Quick Scientific Calculator (or press numbers / operators on keyboard)"
              aria-label="Open Quick Scientific Calculator"
            >
              <CalcIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Calc</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-full border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] flex items-center justify-center hover:border-[#0f766e] dark:hover:border-[#2dd4bf] transition-all"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              type="button"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-800" />}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d5e0dc] dark:border-[#243a35] bg-[#ffffff] dark:bg-[#132420] px-4 py-4 space-y-2">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                currentCategory === cat.id
                  ? 'bg-[#0f766e]/10 dark:bg-[#2dd4bf]/15 text-[#0f766e] dark:text-[#2dd4bf] font-semibold'
                  : 'text-[#0f2a24] dark:text-[#e6f2ee] hover:bg-[#f4f7f5] dark:hover:bg-[#19312b]'
              }`}
            >
              <div className="flex items-center gap-2">
                {cat.id === 'favorites' && <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />}
                <span>{cat.label}</span>
              </div>
              {cat.count !== undefined && cat.count > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold font-mono">
                  {cat.count}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <button
              onClick={() => {
                onOpenQuickCalc();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]"
            >
              <CalcIcon className="w-4 h-4" />
              Open Quick Calculator
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
