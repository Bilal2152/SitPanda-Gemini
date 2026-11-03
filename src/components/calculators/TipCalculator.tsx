/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateTip } from '../../utils/calcLogic';
import { DollarSign, Users } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState(85.50);
  const [tipPercent, setTipPercent] = useState(18);
  const [splitCount, setSplitCount] = useState(2);

  const result = calculateTip(bill, tipPercent, splitCount);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Bill &amp; Gratuity
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Bill Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
              <input
                type="number"
                step="0.01"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Tip Percentage (%)
            </label>
            <div className="flex gap-2 mb-2">
              {[10, 15, 18, 20, 25].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTipPercent(preset)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    tipPercent === preset
                      ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                      : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(Number(e.target.value))}
                className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Split Bill (Number of Diners)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                className="w-10 h-10 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-lg font-bold text-[#0f2a24] dark:text-[#e6f2ee]"
              >
                -
              </button>
              <div className="flex-1 text-center font-mono-numbers text-xl font-bold text-[#0f2a24] dark:text-[#e6f2ee] py-2 bg-[#f4f7f5] dark:bg-[#0c1714] rounded-xl border border-[#d5e0dc] dark:border-[#243a35]">
                {splitCount} {splitCount === 1 ? 'person' : 'people'}
              </div>
              <button
                type="button"
                onClick={() => setSplitCount(splitCount + 1)}
                className="w-10 h-10 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-lg font-bold text-[#0f2a24] dark:text-[#e6f2ee]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Total Per Person
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.totalPerPerson.toFixed(2)}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Tip per person: ${result.tipPerPerson.toFixed(2)}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Original Bill</span>
              <span className="font-mono-numbers font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">${bill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Tip Amount ({tipPercent}%)</span>
              <span className="font-mono-numbers font-semibold text-[#b4480f] dark:text-[#fb923c]">+${result.tipTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-[#0f2a24] dark:text-[#e6f2ee] pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
              <span>Total Bill</span>
              <span className="font-mono-numbers text-[#0f766e] dark:text-[#2dd4bf] text-lg">${result.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
