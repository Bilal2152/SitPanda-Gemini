/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calculator } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onSelectTool: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onSelectTool }) => {
  return (
    <footer className="mt-16 border-t border-[#d5e0dc] dark:border-[#243a35] bg-[#ffffff] dark:bg-[#132420] text-sm text-[#4f6b64] dark:text-[#9fb8b1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-lg text-[#0f2a24] dark:text-[#e6f2ee]">
                Sit<span className="text-[#0f766e] dark:text-[#2dd4bf]">Panda</span> Tools
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#4f6b64] dark:text-[#9fb8b1]">
              Fast, accurate, mobile-first calculators for finance, fitness, math, and everyday measurements.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#0f2a24] dark:text-[#e6f2ee] uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('Finance')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Financial Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Health')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Health &amp; Fitness
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Math')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Math &amp; Statistics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Date')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Date &amp; Time
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Everyday')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Construction &amp; Everyday
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#0f2a24] dark:text-[#e6f2ee] uppercase tracking-wider mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTool('mortgage')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Mortgage Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('bmi')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  BMI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('calorie')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Calorie Deficit Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('scientific')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Scientific Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('percentage')} className="hover:text-[#0f766e] dark:hover:text-[#2dd4bf]">
                  Percentage Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Accessibility & Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-[#0f2a24] dark:text-[#e6f2ee] uppercase tracking-wider mb-3">
              About &amp; Disclaimer
            </h4>
            <p className="text-xs leading-relaxed text-[#4f6b64] dark:text-[#9fb8b1]">
              Calculations are provided for general educational and informational purposes only. Consult certified financial or medical professionals for formal guidance.
            </p>
            <div className="pt-2 text-xs text-[#0f766e] dark:text-[#2dd4bf] font-semibold">
              WCAG AA High-Contrast Standards Compliant
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#d5e0dc] dark:border-[#243a35] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} SitPanda.com · SitPanda Tools. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>English (Primary)</span>
            <span aria-hidden="true">·</span>
            <span>Mobile-First</span>
            <span aria-hidden="true">·</span>
            <span>Dark Mode Compatible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
