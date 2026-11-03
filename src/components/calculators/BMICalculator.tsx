/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateBMI } from '../../utils/calcLogic';
import { Activity, Info } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric state
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);

  // Imperial state
  const [weightLbs, setWeightLbs] = useState(154);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);

  // Synchronize when switching units
  const handleUnitSwitch = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === 'imperial' && unit === 'metric') {
      const lbs = Math.round(weightKg * 2.20462);
      const totalInches = heightCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inch = Math.round(totalInches % 12);
      setWeightLbs(lbs);
      setHeightFeet(ft);
      setHeightInches(inch);
    } else if (newUnit === 'metric' && unit === 'imperial') {
      const kg = Math.round(weightLbs / 2.20462);
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      setWeightKg(kg);
      setHeightCm(cm);
    }
    setUnit(newUnit);
  };

  const activeWeightKg = unit === 'metric' ? weightKg : weightLbs / 2.20462;
  const activeHeightCm = unit === 'metric' ? heightCm : (heightFeet * 12 + heightInches) * 2.54;

  const result = calculateBMI(activeWeightKg, activeHeightCm);

  // Calculate needle percentage on 10 to 45 scale
  const gaugePercent = Math.min(100, Math.max(0, ((result.bmi - 10) / 35) * 100));

  return (
    <div className="space-y-8">
      {/* Unit Tabs & Parameter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-5 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
              Body Measurements
            </h3>
            {/* Metric/Imperial segmented pill */}
            <div className="flex bg-[#f4f7f5] dark:bg-[#0c1714] p-1 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleUnitSwitch('metric')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  unit === 'metric'
                    ? 'bg-[#ffffff] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] shadow-xs'
                    : 'text-[#4f6b64] dark:text-[#9fb8b1]'
                }`}
              >
                Metric (kg / cm)
              </button>
              <button
                type="button"
                onClick={() => handleUnitSwitch('imperial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  unit === 'imperial'
                    ? 'bg-[#ffffff] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] shadow-xs'
                    : 'text-[#4f6b64] dark:text-[#9fb8b1]'
                }`}
              >
                US / Imperial (lbs / ft)
              </button>
            </div>
          </div>

          {unit === 'metric' ? (
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Height</label>
                  <span className="font-mono-numbers text-sm font-bold text-[#0f766e] dark:text-[#2dd4bf]">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="230"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-[#0f766e] dark:accent-[#2dd4bf] cursor-pointer"
                />
                <div className="flex gap-2 mt-2">
                  {[160, 170, 175, 180, 190].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHeightCm(h)}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
                    >
                      {h} cm
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Weight</label>
                  <span className="font-mono-numbers text-sm font-bold text-[#0f766e] dark:text-[#2dd4bf]">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="180"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#0f766e] dark:accent-[#2dd4bf] cursor-pointer"
                />
                <div className="flex gap-2 mt-2">
                  {[55, 65, 70, 80, 90].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Height (Feet)</label>
                  <input
                    type="number"
                    min="3"
                    max="7"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Height (Inches)</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Weight (lbs)</label>
                  <span className="font-mono-numbers text-sm font-bold text-[#0f766e] dark:text-[#2dd4bf]">{weightLbs} lbs</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="400"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-[#0f766e] dark:accent-[#2dd4bf] cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Gauge Card */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Your Body Mass Index (BMI)
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
                {result.bmi}
              </span>
              <span className="text-lg font-bold text-[#0f2a24] dark:text-[#e6f2ee]">
                {result.category}
              </span>
            </div>
          </div>

          {/* Visual Spectrum Gauge */}
          <div className="space-y-2">
            <div className="relative pt-4">
              {/* Pointer indicator */}
              <div
                style={{ left: `${gaugePercent}%` }}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
              >
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#0f2a24] dark:bg-[#e6f2ee] text-white dark:text-[#0c1714]">
                  {result.bmi}
                </span>
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#0f2a24] dark:border-t-[#e6f2ee]" />
              </div>

              {/* Multi-tier color bar */}
              <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner">
                <div className="w-[24%] bg-sky-400" title="Underweight (< 18.5)" />
                <div className="w-[18%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
                <div className="w-[14%] bg-amber-400" title="Overweight (25 - 29.9)" />
                <div className="w-[14%] bg-orange-500" title="Obese Class I (30 - 34.9)" />
                <div className="w-[30%] bg-rose-600" title="Obese Class II/III (35+)" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-[#4f6b64] dark:text-[#9fb8b1] pt-1">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>45+</span>
            </div>
          </div>

          {/* Healthy Weight Recommendation */}
          <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0f766e] dark:text-[#2dd4bf]">
              <Activity className="w-4 h-4" />
              Healthy Weight Target
            </div>
            <p className="text-sm font-medium text-[#0f2a24] dark:text-[#e6f2ee]">
              {unit === 'metric'
                ? `${result.minNormalWeight} kg - ${result.maxNormalWeight} kg`
                : `${Math.round(result.minNormalWeight * 2.20462)} lbs - ${Math.round(result.maxNormalWeight * 2.20462)} lbs`}
            </p>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              For an adult of your height, a BMI between 18.5 and 24.9 is considered optimal.
            </p>
          </div>

          {/* Reference Table */}
          <div className="pt-2">
            <table className="w-full text-left text-xs">
              <thead className="text-[#4f6b64] dark:text-[#9fb8b1] border-b border-[#d5e0dc] dark:border-[#243a35]">
                <tr>
                  <th className="pb-1.5 font-semibold">Category</th>
                  <th className="pb-1.5 text-right font-semibold">BMI Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d5e0dc]/60 dark:divide-[#243a35]/60">
                <tr className={result.category === 'Underweight' ? 'font-bold text-sky-600 dark:text-sky-400' : ''}>
                  <td className="py-1.5">Underweight</td>
                  <td className="py-1.5 text-right font-mono">&lt; 18.5</td>
                </tr>
                <tr className={result.category === 'Normal weight' ? 'font-bold text-emerald-600 dark:text-emerald-400' : ''}>
                  <td className="py-1.5">Normal weight</td>
                  <td className="py-1.5 text-right font-mono">18.5 – 24.9</td>
                </tr>
                <tr className={result.category === 'Overweight' ? 'font-bold text-amber-600 dark:text-amber-400' : ''}>
                  <td className="py-1.5">Overweight</td>
                  <td className="py-1.5 text-right font-mono">25.0 – 29.9</td>
                </tr>
                <tr className={result.category.includes('Obesity') ? 'font-bold text-rose-600 dark:text-rose-400' : ''}>
                  <td className="py-1.5">Obese</td>
                  <td className="py-1.5 text-right font-mono">≥ 30.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
