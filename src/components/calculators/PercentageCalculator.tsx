/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<number>(15);
  const [m1Y, setM1Y] = useState<number>(300);

  // Mode 2: X is what percent of Y?
  const [m2X, setM2X] = useState<number>(45);
  const [m2Y, setM2Y] = useState<number>(200);

  // Mode 3: Percentage change from X to Y?
  const [m3From, setM3From] = useState<number>(80);
  const [m3To, setM3To] = useState<number>(120);

  const m1Result = (m1X / 100) * m1Y;
  const m2Result = m2Y !== 0 ? (m2X / m2Y) * 100 : 0;
  const m3Diff = m3To - m3From;
  const m3Percent = m3From !== 0 ? (m3Diff / m3From) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: What is X% of Y? */}
        <div className="bg-[#ffffff] dark:bg-[#132420] p-6 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold text-[#b4480f] dark:text-[#fb923c] uppercase tracking-wider">
              Mode 1
            </span>
            <h4 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee] mt-1">
              What is X% of Y?
            </h4>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] mt-0.5">
              Calculate sales tax, discounts, or tips.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Percentage (X%)</label>
              <input
                type="number"
                value={m1X}
                onChange={(e) => setM1X(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Total Value (Y)</label>
              <input
                type="number"
                value={m1Y}
                onChange={(e) => setM1Y(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
            <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Result:</span>
            <div className="text-2xl font-bold font-mono-numbers text-[#0f766e] dark:text-[#2dd4bf]">
              {Math.round(m1Result * 1000) / 1000}
            </div>
            <p className="text-[11px] text-[#4f6b64] dark:text-[#9fb8b1] mt-1 font-mono">
              ({m1X} / 100) × {m1Y} = {m1Result}
            </p>
          </div>
        </div>

        {/* Card 2: X is what percent of Y? */}
        <div className="bg-[#ffffff] dark:bg-[#132420] p-6 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold text-[#b4480f] dark:text-[#fb923c] uppercase tracking-wider">
              Mode 2
            </span>
            <h4 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee] mt-1">
              X is what % of Y?
            </h4>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] mt-0.5">
              Calculate exam score rates or progress share.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Part Value (X)</label>
              <input
                type="number"
                value={m2X}
                onChange={(e) => setM2X(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Whole Value (Y)</label>
              <input
                type="number"
                value={m2Y}
                onChange={(e) => setM2Y(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
            <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Percentage Share:</span>
            <div className="text-2xl font-bold font-mono-numbers text-[#0f766e] dark:text-[#2dd4bf]">
              {Math.round(m2Result * 100) / 100}%
            </div>
            <p className="text-[11px] text-[#4f6b64] dark:text-[#9fb8b1] mt-1 font-mono">
              ({m2X} / {m2Y}) × 100 = {Math.round(m2Result * 100) / 100}%
            </p>
          </div>
        </div>

        {/* Card 3: Percentage increase / decrease */}
        <div className="bg-[#ffffff] dark:bg-[#132420] p-6 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold text-[#b4480f] dark:text-[#fb923c] uppercase tracking-wider">
              Mode 3
            </span>
            <h4 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee] mt-1">
              Percentage Change
            </h4>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] mt-0.5">
              Calculate growth, loss, or price changes.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">From Value (Old)</label>
              <input
                type="number"
                value={m3From}
                onChange={(e) => setM3From(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">To Value (New)</label>
              <input
                type="number"
                value={m3To}
                onChange={(e) => setM3To(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
            <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              {m3Percent >= 0 ? 'Increase' : 'Decrease'}:
            </span>
            <div className={`text-2xl font-bold font-mono-numbers ${m3Percent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {m3Percent >= 0 ? `+${Math.round(m3Percent * 100) / 100}%` : `${Math.round(m3Percent * 100) / 100}%`}
            </div>
            <p className="text-[11px] text-[#4f6b64] dark:text-[#9fb8b1] mt-1 font-mono">
              Difference: {m3Diff > 0 ? `+${m3Diff}` : m3Diff}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
