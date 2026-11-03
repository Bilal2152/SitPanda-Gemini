/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateInflation } from '../../utils/calcLogic';

export const InflationCalculator: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(10);

  const result = calculateInflation(amount, rate, years);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Inflation Settings
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Current Dollar Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Annual Inflation (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Years in the Future
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Required Future Capital
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.futureValue.toLocaleString()}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Amount needed in {years} years to have the same buying power as ${amount.toLocaleString()} today
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1">
            <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
              Future Purchasing Power
            </span>
            <div className="text-2xl font-bold font-mono text-amber-800 dark:text-amber-300">
              ${result.purchasingPower.toLocaleString()}
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80">
              If kept as uninvested cash, ${amount} will only purchase the equivalent of ${result.purchasingPower} in today’s goods.
            </p>
          </div>

          <div className="flex justify-between items-center text-sm pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Cumulative Price Increase</span>
            <span className="font-mono-numbers font-bold text-[#b4480f] dark:text-[#fb923c]">+{result.cumulativeInflationPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
