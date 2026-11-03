/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateStatistics } from '../../utils/calcLogic';

export const StatisticsCalculator: React.FC = () => {
  const [inputStr, setInputStr] = useState('12, 18, 22, 22, 29, 35, 41, 56');

  const numbers = inputStr
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const stats = calculateStatistics(numbers);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-4">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Dataset Numbers
          </h3>
          <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
            Enter your sample or population values separated by commas, spaces, or new lines.
          </p>
          <textarea
            rows={5}
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
            placeholder="e.g. 10, 15, 20, 25, 30"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInputStr('10, 12, 23, 23, 16, 23, 21, 16')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
            >
              Load Sample 1
            </button>
            <button
              type="button"
              onClick={() => setInputStr('4, 8, 6, 5, 3, 2, 8, 9, 2, 5')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
            >
              Load Sample 2
            </button>
            <button
              type="button"
              onClick={() => setInputStr('')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:underline ml-auto"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results Matrix */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Arithmetic Mean (Average)
            </span>
            <div className="text-4xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {stats.mean}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Count: {stats.count} items · Sum: {stats.sum}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Median</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{stats.median}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Mode</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">
                {stats.mode.length > 0 ? stats.mode.join(', ') : 'None'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Std Deviation (s)</span>
              <div className="text-lg font-bold font-mono text-[#b4480f] dark:text-[#fb923c]">{stats.stdDev}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Variance (s²)</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{stats.variance}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Min / Max</span>
              <div className="text-base font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">
                {stats.min} / {stats.max}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Range (Spread)</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{stats.range}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
