/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateZakat } from '../../utils/calcLogic';
import { Coins, ShieldCheck, AlertCircle } from 'lucide-react';

export const ZakatCalculator: React.FC = () => {
  const [cash, setCash] = useState(15000);
  const [goldGrams, setGoldGrams] = useState(25);
  const [silverGrams, setSilverGrams] = useState(100);
  const [otherAssets, setOtherAssets] = useState(5000);
  const [debts, setDebts] = useState(2000);
  const [goldPrice, setGoldPrice] = useState(85);
  const [silverPrice, setSilverPrice] = useState(1.05);

  const result = calculateZakat(cash, goldGrams, silverGrams, otherAssets, debts, goldPrice, silverPrice);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-4">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Assets &amp; Liabilities
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1">
                Cash in Bank &amp; Savings ($)
              </label>
              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1">
                Business &amp; Stock Assets ($)
              </label>
              <input
                type="number"
                value={otherAssets}
                onChange={(e) => setOtherAssets(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1">
                Gold Owned (Grams)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
                <span className="self-center text-xs font-mono text-[#4f6b64] dark:text-[#9fb8b1]">@${goldPrice}/g</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1">
                Silver Owned (Grams)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={silverGrams}
                  onChange={(e) => setSilverGrams(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
                <span className="self-center text-xs font-mono text-[#4f6b64] dark:text-[#9fb8b1]">@${silverPrice}/g</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1">
              Immediate Outstanding Liabilities / Debts ($)
            </label>
            <input
              type="number"
              value={debts}
              onChange={(e) => setDebts(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              placeholder="e.g. 1000"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Total Zakat Obligation (2.5%)
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              {result.isEligible
                ? 'Your net wealth meets or exceeds the Nisab threshold.'
                : 'Your net wealth is below the Nisab threshold; no Zakat is due.'}
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35] text-sm">
            <div className="flex justify-between">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Gross Zakatable Assets</span>
              <span className="font-mono-numbers font-semibold">${result.totalWealth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Deductible Debts</span>
              <span className="font-mono-numbers font-semibold text-rose-600 dark:text-rose-400">-${debts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-[#0f2a24] dark:text-[#e6f2ee] pt-1 border-t border-[#d5e0dc] dark:border-[#243a35]">
              <span>Net Eligible Wealth</span>
              <span className="font-mono-numbers">${result.netWealth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              <span>Current Silver Nisab Benchmark</span>
              <span className="font-mono-numbers">${result.nisabThreshold}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
