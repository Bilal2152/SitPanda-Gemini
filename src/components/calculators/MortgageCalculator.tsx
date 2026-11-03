/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateMortgage } from '../../utils/calcLogic';
import { DollarSign, Percent, Calendar, PieChart, Table } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxYear, setPropertyTaxYear] = useState(4800);
  const [homeInsuranceYear, setHomeInsuranceYear] = useState(1200);
  const [pmiMonthly, setPmiMonthly] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  const handlePriceChange = (val: number) => {
    setHomePrice(val);
    setDownPayment(Math.round(val * (downPaymentPercent / 100)));
  };

  const handleDownPaymentAmountChange = (val: number) => {
    setDownPayment(val);
    if (homePrice > 0) {
      setDownPaymentPercent(Math.round((val / homePrice) * 1000) / 10);
    }
  };

  const handleDownPaymentPercentChange = (pct: number) => {
    setDownPaymentPercent(pct);
    setDownPayment(Math.round(homePrice * (pct / 100)));
  };

  const result = calculateMortgage({
    homePrice,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxYear,
    homeInsuranceYear,
    pmiMonthly,
  });

  const piPct = Math.round((result.monthlyPI / result.totalMonthly) * 100);
  const taxPct = Math.round((result.monthlyTax / result.totalMonthly) * 100);
  const insPct = Math.round((result.monthlyInsurance / result.totalMonthly) * 100);
  const pmiPct = 100 - (piPct + taxPct + insPct);

  return (
    <div className="space-y-8">
      {/* Input & Key Metrics Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Mortgage Parameters
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Home Price
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] dark:focus:ring-[#2dd4bf] outline-none"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[250000, 400000, 600000, 800000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePriceChange(preset)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1] hover:text-[#0f2a24] dark:hover:text-[#e6f2ee]"
                >
                  ${preset / 1000}k
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Down Payment ($)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => handleDownPaymentAmountChange(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] dark:focus:ring-[#2dd4bf] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Down Payment (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={downPaymentPercent}
                  onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] dark:focus:ring-[#2dd4bf] outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-medium focus:ring-2 focus:ring-[#0f766e] dark:focus:ring-[#2dd4bf] outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4f6b64] dark:text-[#9fb8b1]">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                Loan Term (Years)
              </label>
              <div className="flex gap-2">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermYears(term)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      loanTermYears === term
                        ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c] dark:border-[#2dd4bf]'
                        : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                    }`}
                  >
                    {term} yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <div>
              <label className="block text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1] mb-1">
                Property Tax / Yr ($)
              </label>
              <input
                type="number"
                value={propertyTaxYear}
                onChange={(e) => setPropertyTaxYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1] mb-1">
                Home Insurance / Yr ($)
              </label>
              <input
                type="number"
                value={homeInsuranceYear}
                onChange={(e) => setHomeInsuranceYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1] mb-1">
                PMI / Mo ($)
              </label>
              <input
                type="number"
                value={pmiMonthly}
                onChange={(e) => setPmiMonthly(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-sm focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Total Monthly Payment
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              ${result.totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Based on ${result.principal.toLocaleString()} financed at {interestRate}% over {loanTermYears} years
            </p>
          </div>

          {/* Monthly Payment Composition Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#f4f7f5] dark:bg-[#0c1714] rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${piPct}%` }} className="bg-[#0f766e] dark:bg-[#2dd4bf] h-full" title={`Principal & Interest: ${piPct}%`} />
              <div style={{ width: `${taxPct}%` }} className="bg-[#b4480f] dark:bg-[#fb923c] h-full" title={`Property Tax: ${taxPct}%`} />
              <div style={{ width: `${insPct}%` }} className="bg-sky-600 dark:bg-sky-400 h-full" title={`Home Insurance: ${insPct}%`} />
              {pmiPct > 0 && <div style={{ width: `${pmiPct}%` }} className="bg-purple-600 dark:bg-purple-400 h-full" title="PMI" />}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e] dark:bg-[#2dd4bf]" />
                <span className="text-[#4f6b64] dark:text-[#9fb8b1]">P &amp; I:</span>
                <span className="font-mono-numbers font-semibold ml-auto">${result.monthlyPI.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b4480f] dark:bg-[#fb923c]" />
                <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Taxes:</span>
                <span className="font-mono-numbers font-semibold ml-auto">${result.monthlyTax.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 dark:bg-sky-400" />
                <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Insurance:</span>
                <span className="font-mono-numbers font-semibold ml-auto">${result.monthlyInsurance.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                <span className="text-[#4f6b64] dark:text-[#9fb8b1]">PMI:</span>
                <span className="font-mono-numbers font-semibold ml-auto">${result.monthlyPMI.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Loan Lifetime Totals */}
          <div className="pt-4 border-t border-[#d5e0dc] dark:border-[#243a35] space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Total Principal Paid</span>
              <span className="font-mono-numbers font-bold text-[#0f2a24] dark:text-[#e6f2ee]">${result.principal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Total Interest Paid</span>
              <span className="font-mono-numbers font-bold text-[#b4480f] dark:text-[#fb923c]">${result.totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
              <span className="font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Overall Loan Cost</span>
              <span className="font-mono-numbers font-extrabold text-[#0f766e] dark:text-[#2dd4bf] text-base">${result.totalPayment.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0f766e] dark:border-[#2dd4bf] text-[#0f766e] dark:text-[#2dd4bf] hover:bg-[#0f766e]/5 dark:hover:bg-[#2dd4bf]/10 text-sm font-semibold transition-colors"
          >
            <Table className="w-4 h-4" />
            {showAmortization ? 'Hide Amortization Schedule' : 'View Annual Amortization Table'}
          </button>
        </div>
      </div>

      {/* Amortization Table */}
      {showAmortization && (
        <div className="bg-[#ffffff] dark:bg-[#132420] p-6 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee]">
              Annual Amortization Schedule
            </h4>
            <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">{loanTermYears} Years Breakdown</span>
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f4f7f5] dark:bg-[#0c1714] text-[#4f6b64] dark:text-[#9fb8b1] uppercase text-xs sticky top-0 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Year</th>
                  <th className="py-2.5 px-4 text-right">Interest Paid</th>
                  <th className="py-2.5 px-4 text-right">Principal Paid</th>
                  <th className="py-2.5 px-4 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d5e0dc] dark:divide-[#243a35] font-mono-numbers">
                {result.schedule.map((item) => (
                  <tr key={item.year} className="hover:bg-[#f4f7f5]/60 dark:hover:bg-[#19312b]/60">
                    <td className="py-2 px-4 font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">Year {item.year}</td>
                    <td className="py-2 px-4 text-right text-[#b4480f] dark:text-[#fb923c]">${item.interest.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right text-[#0f766e] dark:text-[#2dd4bf]">${item.principal.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right text-[#0f2a24] dark:text-[#e6f2ee]">${item.balance.toLocaleString()}</td>
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
