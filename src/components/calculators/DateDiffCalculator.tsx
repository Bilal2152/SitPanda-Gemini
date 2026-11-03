/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateDateDiff } from '../../utils/calcLogic';
import { Calendar, Briefcase, Plus, Minus } from 'lucide-react';

export const DateDiffCalculator: React.FC = () => {
  const [mode, setMode] = useState<'diff' | 'add'>('diff');

  // Difference mode
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  // Add/Subtract mode
  const [baseDate, setBaseDate] = useState('2025-06-01');
  const [daysToAdd, setDaysToAdd] = useState(45);
  const [opDirection, setOpDirection] = useState<'add' | 'subtract'>('add');

  const diffResult = calculateDateDiff(startDate, endDate);

  const calculateAddedDate = () => {
    const d = new Date(baseDate);
    if (isNaN(d.getTime())) return '';
    const multiplier = opDirection === 'add' ? 1 : -1;
    d.setDate(d.getDate() + daysToAdd * multiplier);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="flex bg-[#ffffff] dark:bg-[#132420] p-1.5 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setMode('diff')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            mode === 'diff'
              ? 'bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]'
              : 'text-[#4f6b64] dark:text-[#9fb8b1]'
          }`}
        >
          Days Between Two Dates
        </button>
        <button
          type="button"
          onClick={() => setMode('add')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            mode === 'add'
              ? 'bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]'
              : 'text-[#4f6b64] dark:text-[#9fb8b1]'
          }`}
        >
          Add / Subtract Days
        </button>
      </div>

      {mode === 'diff' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
            <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
              Date Interval
            </h3>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-medium outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-medium outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
                Total Calendar Days
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
                {diffResult.days.toLocaleString()} <span className="text-lg font-normal text-[#4f6b64] dark:text-[#9fb8b1]">days</span>
              </div>
              <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
                Equivalent to {diffResult.weeks} weeks and {diffResult.remainingDays} days
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#0f766e] dark:text-[#2dd4bf] shrink-0" />
              <div>
                <span className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Working Days (Mon - Fri)</span>
                <div className="text-xl font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">
                  {diffResult.businessDays} business days
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Calculate Target Date
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Start Date</label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-medium outline-none focus:ring-2 focus:ring-[#0f766e]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Operation</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpDirection('add')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border ${
                    opDirection === 'add'
                      ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                      : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                  }`}
                >
                  + Add
                </button>
                <button
                  type="button"
                  onClick={() => setOpDirection('subtract')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border ${
                    opDirection === 'subtract'
                      ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                      : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                  }`}
                >
                  − Subtract
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Number of Days</label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] space-y-1">
            <span className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Calculated Result Date</span>
            <div className="text-xl font-bold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {calculateAddedDate()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
