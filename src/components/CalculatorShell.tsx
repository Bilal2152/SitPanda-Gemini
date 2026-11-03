/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Share2, Check, Sparkles, HelpCircle } from 'lucide-react';
import { ToolItem } from '../types';
import { TOOLS } from '../data/toolsData';

// Calculator Component Imports
import { MortgageCalculator } from './calculators/MortgageCalculator';
import { BMICalculator } from './calculators/BMICalculator';
import { LoanCalculator } from './calculators/LoanCalculator';
import { CompoundInterestCalculator } from './calculators/CompoundInterestCalculator';
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { AgeCalculator } from './calculators/AgeCalculator';
import { DateDiffCalculator } from './calculators/DateDiffCalculator';
import { CalorieCalculator } from './calculators/CalorieCalculator';
import { BodyFatCalculator } from './calculators/BodyFatCalculator';
import { IdealWeightCalculator } from './calculators/IdealWeightCalculator';
import { PaceCalculator } from './calculators/PaceCalculator';
import { FractionCalculator } from './calculators/FractionCalculator';
import { StatisticsCalculator } from './calculators/StatisticsCalculator';
import { PasswordGenerator } from './calculators/PasswordGenerator';
import { TipCalculator } from './calculators/TipCalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { ConcreteCalculator } from './calculators/ConcreteCalculator';
import { ZakatCalculator } from './calculators/ZakatCalculator';
import { InflationCalculator } from './calculators/InflationCalculator';
import { SalaryCalculator } from './calculators/SalaryCalculator';
import { RandomNumberDice } from './calculators/RandomNumberDice';
import { SimpleInterestCalculator } from './calculators/SimpleInterestCalculator';
import { GCFLCMCalculator } from './calculators/GCFLCMCalculator';

interface CalculatorShellProps {
  tool: ToolItem;
  onBack: () => void;
  onSelectTool: (toolId: string) => void;
}

export const CalculatorShell: React.FC<CalculatorShellProps> = ({ tool, onBack, onSelectTool }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  const renderActiveCalculator = () => {
    switch (tool.id) {
      case 'mortgage':
        return <MortgageCalculator />;
      case 'bmi':
        return <BMICalculator />;
      case 'loan':
        return <LoanCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'age':
        return <AgeCalculator />;
      case 'date-diff':
        return <DateDiffCalculator />;
      case 'calorie':
        return <CalorieCalculator />;
      case 'body-fat':
        return <BodyFatCalculator />;
      case 'ideal-weight':
        return <IdealWeightCalculator />;
      case 'pace':
        return <PaceCalculator />;
      case 'fraction':
        return <FractionCalculator />;
      case 'statistics':
        return <StatisticsCalculator />;
      case 'password':
        return <PasswordGenerator />;
      case 'tip':
        return <TipCalculator />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'concrete':
        return <ConcreteCalculator />;
      case 'zakat':
        return <ZakatCalculator />;
      case 'inflation':
        return <InflationCalculator />;
      case 'salary':
        return <SalaryCalculator />;
      case 'random-dice':
      case 'scientific':
        return <RandomNumberDice />;
      case 'simple-interest':
        return <SimpleInterestCalculator />;
      case 'gcf-lcm':
        return <GCFLCMCalculator />;
      default:
        return <MortgageCalculator />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#d5e0dc] dark:border-[#243a35]">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4f6b64] dark:text-[#9fb8b1]">
          <button onClick={onBack} className="hover:text-[#0f2a24] dark:hover:text-[#e6f2ee] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#b4480f] dark:text-[#fb923c] font-semibold">{tool.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#0f2a24] dark:text-[#e6f2ee] font-bold">{tool.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#d5e0dc] dark:border-[#243a35] bg-[#ffffff] dark:bg-[#132420] text-[#0f2a24] dark:text-[#e6f2ee] hover:border-[#0f766e] dark:hover:border-[#2dd4bf] transition-all"
            aria-label="Share tool link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Calculator Header & Description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#b4480f] dark:text-[#fb923c] tracking-wider uppercase">
          <span>{tool.category}</span>
          {tool.popular && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#0f766e] dark:text-[#2dd4bf]">Popular Tool</span>
            </>
          )}
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0f2a24] dark:text-[#e6f2ee] tracking-tight text-balance">
          {tool.name}
        </h1>
        <p className="text-sm sm:text-base text-[#4f6b64] dark:text-[#9fb8b1] max-w-3xl">
          {tool.shortDesc}
        </p>
      </div>

      {/* Render Active Tool Calculator */}
      <div className="pt-2">
        {renderActiveCalculator()}
      </div>

      {/* How it Works & Formula Guide */}
      {(tool.formula || tool.guide) && (
        <section className="bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0f766e] dark:text-[#2dd4bf]" />
              Calculation Formula &amp; Guide
            </h3>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-xs font-semibold text-[#0f766e] dark:text-[#2dd4bf] hover:underline"
            >
              {showGuide ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {showGuide && (
            <div className="space-y-3 pt-2 text-sm text-[#0f2a24] dark:text-[#e6f2ee] animate-in fade-in">
              {tool.formula && (
                <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
                  <span className="block text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1] mb-1">
                    Standard Formula:
                  </span>
                  <code className="font-mono font-bold text-sm text-[#0f766e] dark:text-[#2dd4bf]">
                    {tool.formula}
                  </code>
                </div>
              )}
              {tool.guide && (
                <p className="text-sm text-[#4f6b64] dark:text-[#9fb8b1] leading-relaxed">
                  {tool.guide}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#d5e0dc] dark:border-[#243a35]">
          <h4 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee]">
            Related {tool.category} Calculators
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rt) => (
              <button
                key={rt.id}
                onClick={() => onSelectTool(rt.id)}
                className="text-left p-4 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#ffffff] dark:bg-[#132420] hover:border-[#0f766e] dark:hover:border-[#2dd4bf] hover:-translate-y-0.5 transition-all space-y-1"
              >
                <div className="text-xs font-semibold text-[#b4480f] dark:text-[#fb923c]">{rt.category}</div>
                <div className="font-display font-bold text-sm text-[#0f2a24] dark:text-[#e6f2ee]">{rt.name}</div>
                <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] line-clamp-2">{rt.shortDesc}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
