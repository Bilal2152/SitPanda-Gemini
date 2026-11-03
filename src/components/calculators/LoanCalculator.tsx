/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateLoan } from '../../utils/calcLogic';
import { DollarSign, Clock, ShieldCheck, TrendingDown } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.0);
  const [termMonths, setTermMonths] = useState(60);
  const [extraMonthly, setExtraMonthly] = useState(50);

  const result = calculateLoan({
    amount,
    interestRate,
    termMonths,
    extraMonthly,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form controls */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Loan Details
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Loan Amount ($)
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
            <div className="flex gap-2 mt-2">
              {[10000, 25000, 40000, 60000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
                >
                  ${preset / 1000}k
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Interest Rate (APR %)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Loan Term (Months)
              </label>
              <div className="flex gap-1.5">
                {[36, 48, 60, 72].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTermMonths(m)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      termMonths === m
                        ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                        : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Optional Extra Monthly Payment ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
              <input
                type="number"
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
                placeholder="e.g. 50"
              />
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] mt-1">
              Adding extra principal each month reduces interest and shortens repayment.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Monthly Payment
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {extraMonthly > 0 && (
              <p className="text-xs font-semibold text-[#b4480f] dark:text-[#fb923c]">
                + ${extraMonthly} extra = ${result.effectiveMonthly}/mo total
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm py-2 border-b border-[#d5e0dc] dark:border-[#243a35]">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Total Principal</span>
              <span className="font-mono-numbers font-bold text-[#0f2a24] dark:text-[#e6f2ee]">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2 border-b border-[#d5e0dc] dark:border-[#243a35]">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Total Interest</span>
              <span className="font-mono-numbers font-bold text-[#b4480f] dark:text-[#fb923c]">${result.totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2 border-b border-[#d5e0dc] dark:border-[#243a35]">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Total Repaid</span>
              <span className="font-mono-numbers font-extrabold text-[#0f766e] dark:text-[#2dd4bf]">${result.totalPayment.toLocaleString()}</span>
            </div>
          </div>

          {extraMonthly > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <TrendingDown className="w-4 h-4" />
                Early Payoff Savings
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-200">
                Paid off in <strong>{result.actualMonths} months</strong> ({termMonths - result.actualMonths} months early), saving approximately <strong>${result.savedInterest.toLocaleString()}</strong> in interest.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
