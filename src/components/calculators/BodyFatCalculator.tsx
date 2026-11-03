/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateBodyFat } from '../../utils/calcLogic';
import { Activity, ShieldCheck } from 'lucide-react';

export const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(178);
  const [waistCm, setWaistCm] = useState(86);
  const [neckCm, setNeckCm] = useState(40);
  const [hipCm, setHipCm] = useState(96);
  const [weightKg, setWeightKg] = useState(78);

  const result = calculateBodyFat(gender, heightCm, waistCm, neckCm, hipCm, weightKg);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            U.S. Navy Circumference Measurements
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Waist at Navel (cm)
              </label>
              <input
                type="number"
                value={waistCm}
                onChange={(e) => setWaistCm(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Neck Circumference (cm)
              </label>
              <input
                type="number"
                value={neckCm}
                onChange={(e) => setNeckCm(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          {gender === 'female' && (
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Hip Circumference at Widest (cm)
              </label>
              <input
                type="number"
                value={hipCm}
                onChange={(e) => setHipCm(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Estimated Body Fat Percentage
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
                {result.bodyFatPercentage}%
              </span>
              <span className="text-base font-bold text-[#0f2a24] dark:text-[#e6f2ee]">
                {result.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35] text-sm">
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Fat Mass</span>
              <div className="text-xl font-bold font-mono text-[#b4480f] dark:text-[#fb923c]">{result.fatMassKg} kg</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Lean Body Mass</span>
              <div className="text-xl font-bold font-mono text-[#0f766e] dark:text-[#2dd4bf]">{result.leanMassKg} kg</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] text-xs text-[#4f6b64] dark:text-[#9fb8b1] space-y-1">
            <p className="font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">
              ACE Body Fat Norms for {gender === 'male' ? 'Men' : 'Women'}:
            </p>
            <p>
              {gender === 'male'
                ? 'Athletes: 6-13% · Fitness: 14-17% · Average: 18-24% · Obese: 25%+'
                : 'Athletes: 14-20% · Fitness: 21-24% · Average: 25-31% · Obese: 32%+'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
