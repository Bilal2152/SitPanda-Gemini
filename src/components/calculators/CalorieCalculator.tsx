/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateCalorie } from '../../utils/calcLogic';
import { Flame, Dumbbell, Apple } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'extraActive'>('moderate');

  const result = calculateCalorie(gender, age, weightKg, heightCm, activityLevel);

  // Daily macros for standard weight loss (40% carbs, 30% protein, 30% fat)
  const targetCal = result.weightLoss;
  const proteinGrams = Math.round((targetCal * 0.3) / 4);
  const carbsGrams = Math.round((targetCal * 0.4) / 4);
  const fatGrams = Math.round((targetCal * 0.3) / 9);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Personal Metrics
          </h3>

          {/* Gender */}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] focus:ring-2 focus:ring-[#0f766e] outline-none text-sm"
            >
              <option value="sedentary">Sedentary (Desk job, minimal exercise)</option>
              <option value="light">Light Activity (1-3 days exercise/week)</option>
              <option value="moderate">Moderate Activity (3-5 days workout/week)</option>
              <option value="active">Active (6-7 days hard training/week)</option>
              <option value="extraActive">Extra Active (Intense athlete / physical job)</option>
            </select>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Daily Maintenance (TDEE)
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {result.maintenance} <span className="text-xl font-normal text-[#4f6b64] dark:text-[#9fb8b1]">kcal/day</span>
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              BMR (Basal Metabolic Rate): {result.bmr} kcal
            </p>
          </div>

          {/* Goal Targets */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
              <div>
                <span className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Weight Loss (-0.5 kg/wk)</span>
                <p className="text-[11px] text-[#4f6b64] dark:text-[#9fb8b1]">-500 kcal deficit</p>
              </div>
              <span className="text-lg font-bold font-mono-numbers text-emerald-600 dark:text-emerald-400">
                {result.weightLoss} kcal
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
              <div>
                <span className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Mild Loss (-0.25 kg/wk)</span>
                <p className="text-[11px] text-[#4f6b64] dark:text-[#9fb8b1]">-250 kcal gentle deficit</p>
              </div>
              <span className="text-lg font-bold font-mono-numbers text-sky-600 dark:text-sky-400">
                {result.mildWeightLoss} kcal
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
              <div>
                <span className="text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Muscle Gain (+0.25 kg/wk)</span>
                <p className="text-[11px] text-[#4f6b64] dark:text-[#9fb8b1]">+250 kcal lean surplus</p>
              </div>
              <span className="text-lg font-bold font-mono-numbers text-amber-600 dark:text-amber-400">
                {result.mildWeightGain} kcal
              </span>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="pt-3 border-t border-[#d5e0dc] dark:border-[#243a35] space-y-2">
            <span className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Target Macro Ratio ({result.weightLoss} kcal)
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
                <span className="block text-[#4f6b64] dark:text-[#9fb8b1]">Protein (30%)</span>
                <span className="font-bold font-mono-numbers text-sm text-[#0f2a24] dark:text-[#e6f2ee]">{proteinGrams}g</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
                <span className="block text-[#4f6b64] dark:text-[#9fb8b1]">Carbs (40%)</span>
                <span className="font-bold font-mono-numbers text-sm text-[#0f2a24] dark:text-[#e6f2ee]">{carbsGrams}g</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
                <span className="block text-[#4f6b64] dark:text-[#9fb8b1]">Fat (30%)</span>
                <span className="font-bold font-mono-numbers text-sm text-[#0f2a24] dark:text-[#e6f2ee]">{fatGrams}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
