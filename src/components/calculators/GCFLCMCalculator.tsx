/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateGCFandLCM } from '../../utils/calcLogic';

export const GCFLCMCalculator: React.FC = () => {
  const [numA, setNumA] = useState(48);
  const [numB, setNumB] = useState(72);

  const result = calculateGCFandLCM(numA, numB);

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
        <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee] text-center">
          Greatest Common Factor &amp; Least Common Multiple
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">First Number</label>
            <input
              type="number"
              value={numA}
              onChange={(e) => setNumA(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-center text-lg font-bold outline-none focus:ring-2 focus:ring-[#0f766e]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Second Number</label>
            <input
              type="number"
              value={numB}
              onChange={(e) => setNumB(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-center text-lg font-bold outline-none focus:ring-2 focus:ring-[#0f766e]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] text-center">
            <span className="text-xs uppercase font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">GCF / GCD</span>
            <div className="text-3xl font-extrabold font-mono text-[#0f766e] dark:text-[#2dd4bf] mt-1">
              {result.gcf}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] text-center">
            <span className="text-xs uppercase font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">LCM</span>
            <div className="text-3xl font-extrabold font-mono text-[#b4480f] dark:text-[#fb923c] mt-1">
              {result.lcm}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
