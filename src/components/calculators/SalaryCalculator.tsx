/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateSalary } from '../../utils/calcLogic';

export const SalaryCalculator: React.FC = () => {
  const [amount, setAmount] = useState(35);
  const [period, setPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual'>('hourly');
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  const result = calculateSalary(amount, period, hoursPerWeek);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Wage &amp; Pay Period
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Salary / Wage Amount ($)
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

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Base Frequency
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['hourly', 'daily', 'weekly', 'monthly', 'annual'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    period === p
                      ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                      : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Hours Worked Per Week
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
            />
          </div>
        </div>

        {/* Results Matrix */}
        <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Equivalent Annual Salary
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.annual.toLocaleString()}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Standard 52-week year with {hoursPerWeek} hrs/week
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Monthly Salary</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">${result.monthly.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Bi-Weekly Paycheck</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">${result.biweekly.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Weekly Pay</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">${result.weekly.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Hourly Rate</span>
              <div className="text-lg font-bold font-mono text-[#0f766e] dark:text-[#2dd4bf]">${result.hourly}/hr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
