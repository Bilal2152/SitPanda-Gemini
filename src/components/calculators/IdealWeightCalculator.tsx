/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateIdealWeight } from '../../utils/calcLogic';

export const IdealWeightCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(175);

  const result = calculateIdealWeight(gender, heightCm);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Gender &amp; Height
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Gender</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  gender === 'male'
                    ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                    : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  gender === 'female'
                    ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                    : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Height</label>
              <span className="font-mono-numbers text-sm font-bold text-[#0f766e] dark:text-[#2dd4bf]">{heightCm} cm</span>
            </div>
            <input
              type="range"
              min="140"
              max="215"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-[#0f766e] dark:accent-[#2dd4bf] cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Consensus Ideal Weight
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {result.averageKg} <span className="text-lg font-normal text-[#4f6b64] dark:text-[#9fb8b1]">kg</span>
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              ≈ {Math.round(result.averageKg * 2.20462)} lbs (average across clinical formulas)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Devine (1974)</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{result.devine} kg</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Robinson (1983)</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{result.robinson} kg</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Miller (1983)</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{result.miller} kg</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Hamwi (1964)</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{result.hamwi} kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
