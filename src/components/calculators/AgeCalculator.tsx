/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateAge } from '../../utils/calcLogic';
import { Calendar, Cake, Clock, Sparkles } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1998-06-15');
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);

  const result = calculateAge(birthDate, targetDate);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Date of Birth
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Age as of Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
            />
            <button
              type="button"
              onClick={() => setTargetDate(new Date().toISOString().split('T')[0])}
              className="mt-2 text-xs font-semibold text-[#0f766e] dark:text-[#2dd4bf] hover:underline"
            >
              Reset to Today
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Exact Age
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Born {new Date(birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Birthday Countdown */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center justify-center shrink-0">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Next Birthday Countdown
              </div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                {result.nextBirthdayDays === 0 ? "🎉 Today is your Birthday!" : `${result.nextBirthdayDays} days remaining until your ${result.years + 1}th birthday`}
              </p>
            </div>
          </div>

          {/* Micro Summary units */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35] text-sm">
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Total Days Lived</span>
              <div className="text-xl font-bold font-mono-numbers text-[#0f2a24] dark:text-[#e6f2ee]">
                {result.totalDays.toLocaleString()}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Total Hours Lived</span>
              <div className="text-xl font-bold font-mono-numbers text-[#0f2a24] dark:text-[#e6f2ee]">
                {result.totalHours.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
