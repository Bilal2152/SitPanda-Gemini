/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, X } from 'lucide-react';
import { ToolCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  totalToolsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalToolsCount,
}) => {
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Health', label: 'Health' },
    { id: 'Math', label: 'Math' },
    { id: 'Date', label: 'Date & Time' },
    { id: 'Everyday', label: 'Everyday' },
  ];

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="space-y-3">
        <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#b4480f] dark:text-[#fb923c]">
          Free online tools for everyone
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0f2a24] dark:text-[#e6f2ee] tracking-tight text-balance leading-[1.1]">
          Smart Calculations, All in One Place
        </h1>
        <p className="text-base sm:text-lg text-[#4f6b64] dark:text-[#9fb8b1] max-w-2xl leading-relaxed">
          Fast, accessible, mobile-first calculators for mortgages, loans, BMI, calories, scientific math, and everyday tools.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <div className="flex items-center gap-3 bg-[#ffffff] dark:bg-[#132420] border border-[#d5e0dc] dark:border-[#243a35] rounded-2xl px-4 py-1.5 focus-within:border-[#0f766e] dark:focus-within:border-[#2dd4bf] focus-within:ring-4 focus-within:ring-[#0f766e]/15 transition-all shadow-xs">
          <Search className="w-5 h-5 text-[#4f6b64] dark:text-[#9fb8b1] shrink-0" />
          <input
            id="tool-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search calculators (e.g. Mortgage, BMI, Loan, Percentage, Age...)"
            className="w-full py-2.5 bg-transparent text-[#0f2a24] dark:text-[#e6f2ee] placeholder-[#4f6b64] dark:placeholder-[#9fb8b1] outline-none text-base font-medium"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1.5 rounded-lg text-[#4f6b64] hover:text-[#0f2a24] dark:hover:text-[#e6f2ee]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Category filter">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelectCategory(c.id)}
            aria-pressed={selectedCategory === c.id}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              selectedCategory === c.id
                ? 'bg-[#0f2a24] text-[#ffffff] dark:bg-[#e6f2ee] dark:text-[#0c1714] border-[#0f2a24] dark:border-[#e6f2ee] shadow-2xs'
                : 'bg-[#ffffff] dark:bg-[#132420] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35] hover:border-[#0f766e] dark:hover:border-[#2dd4bf]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </section>
  );
};
