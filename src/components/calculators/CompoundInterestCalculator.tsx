/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateCompoundInterest } from '../../utils/calcLogic';
import { TrendingUp, Layers, Table } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(8.0);
  const [years, setYears] = useState(15);
  const [showTable, setShowTable] = useState(false);

  const result = calculateCompoundInterest({
    initialDeposit,
    monthlyContribution,
    annualRate,
    years,
  });

  const principalAndContr = result.totalPrincipal + result.totalContributions;
  const contrPct = Math.round((principalAndContr / result.endBalance) * 100);
  const interestPct = 100 - contrPct;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Investment Plan
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Initial Principal Deposit ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
              <input
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Monthly Contribution ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[100, 250, 500, 1000].map((pmt) => (
                <button
                  key={pmt}
                  type="button"
                  onClick={() => setMonthlyContribution(pmt)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
                >
                  ${pmt}/mo
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Estimated Annual Return (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Investment Horizon (Years)
              </label>
              <div className="flex gap-1.5">
                {[5, 10, 15, 25].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYears(y)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      years === y
                        ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                        : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                    }`}
                  >
                    {y}y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Estimated Future Balance
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.endBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              In {years} years at {annualRate}% annual return
            </p>
          </div>

          {/* Visual Bar Breakdown */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#f4f7f5] dark:bg-[#0c1714] rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${contrPct}%` }} className="bg-[#4f6b64] dark:bg-[#9fb8b1] h-full" title="Total Contributions" />
              <div style={{ width: `${interestPct}%` }} className="bg-[#0f766e] dark:bg-[#2dd4bf] h-full" title="Interest Earned" />
            </div>
            <div className="flex justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6b64] dark:bg-[#9fb8b1]" />
                <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Contributions:</span>
                <span className="font-mono-numbers font-semibold">${principalAndContr.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e] dark:bg-[#2dd4bf]" />
                <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Interest:</span>
                <span className="font-mono-numbers font-semibold">${result.totalInterest.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35] text-sm">
            <div className="flex justify-between">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Initial Principal</span>
              <span className="font-mono-numbers font-semibold">${result.totalPrincipal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Total Contributed Over {years}y</span>
              <span className="font-mono-numbers font-semibold">${result.totalContributions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#0f766e] dark:text-[#2dd4bf] pt-1">
              <span>Pure Interest Gained</span>
              <span className="font-mono-numbers">+${result.totalInterest.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setShowTable(!showTable)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0f766e] dark:border-[#2dd4bf] text-[#0f766e] dark:text-[#2dd4bf] hover:bg-[#0f766e]/5 dark:hover:bg-[#2dd4bf]/10 text-sm font-semibold transition-colors"
          >
            <Table className="w-4 h-4" />
            {showTable ? 'Hide Yearly Schedule' : 'Show Yearly Schedule'}
          </button>
        </div>
      </div>

      {showTable && (
        <div className="bg-[#ffffff] dark:bg-[#132420] p-6 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-4 animate-in fade-in">
          <h4 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee]">
            Compound Interest Year-by-Year Growth
          </h4>
          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f4f7f5] dark:bg-[#0c1714] text-[#4f6b64] dark:text-[#9fb8b1] uppercase text-xs sticky top-0 font-semibold">
                <tr>
                  <th className="py-2 px-4">Year</th>
                  <th className="py-2 px-4 text-right">Contributions</th>
                  <th className="py-2 px-4 text-right">Interest Accrued</th>
                  <th className="py-2 px-4 text-right">End Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d5e0dc] dark:divide-[#243a35] font-mono-numbers">
                {result.yearlyData.map((d) => (
                  <tr key={d.year} className="hover:bg-[#f4f7f5]/60 dark:hover:bg-[#19312b]/60">
                    <td className="py-2 px-4 font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Year {d.year}</td>
                    <td className="py-2 px-4 text-right">${d.contributions.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right text-[#b4480f] dark:text-[#fb923c]">${d.interest.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right font-bold text-[#0f766e] dark:text-[#2dd4bf]">${d.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
