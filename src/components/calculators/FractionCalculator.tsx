/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateFractions } from '../../utils/calcLogic';

export const FractionCalculator: React.FC = () => {
  const [n1, setN1] = useState(2);
  const [d1, setD1] = useState(3);
  const [n2, setN2] = useState(3);
  const [d2, setD2] = useState(4);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');

  let result: any = null;
  let error = '';
  try {
    result = calculateFractions(n1, d1, n2, d2, operation);
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
        <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee] text-center">
          Fraction Arithmetic
        </h3>

        {/* Fraction Equation Inputs */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          {/* Fraction 1 */}
          <div className="flex flex-col items-center gap-1.5 w-20">
            <input
              type="number"
              value={n1}
              onChange={(e) => setN1(Number(e.target.value))}
              className="w-full text-center px-2 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-bold text-base focus:ring-2 focus:ring-[#0f766e] outline-none"
              title="Numerator 1"
            />
            <div className="w-full h-0.5 bg-[#0f2a24] dark:bg-[#e6f2ee] rounded" />
            <input
              type="number"
              value={d1}
              onChange={(e) => setD1(Number(e.target.value))}
              className="w-full text-center px-2 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-bold text-base focus:ring-2 focus:ring-[#0f766e] outline-none"
              title="Denominator 1"
            />
          </div>

          {/* Operation Selector */}
          <div className="flex flex-col gap-1">
            {(['+', '-', '*', '/'] as const).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperation(op)}
                className={`w-9 h-9 rounded-lg font-bold text-base flex items-center justify-center transition-all ${
                  operation === op
                    ? 'bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]'
                    : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#4f6b64] dark:text-[#9fb8b1] hover:text-[#0f2a24] dark:hover:text-[#e6f2ee]'
                }`}
              >
                {op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : '+'}
              </button>
            ))}
          </div>

          {/* Fraction 2 */}
          <div className="flex flex-col items-center gap-1.5 w-20">
            <input
              type="number"
              value={n2}
              onChange={(e) => setN2(Number(e.target.value))}
              className="w-full text-center px-2 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-bold text-base focus:ring-2 focus:ring-[#0f766e] outline-none"
              title="Numerator 2"
            />
            <div className="w-full h-0.5 bg-[#0f2a24] dark:bg-[#e6f2ee] rounded" />
            <input
              type="number"
              value={d2}
              onChange={(e) => setD2(Number(e.target.value))}
              className="w-full text-center px-2 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers font-bold text-base focus:ring-2 focus:ring-[#0f766e] outline-none"
              title="Denominator 2"
            />
          </div>

          <span className="text-2xl font-bold text-[#0f2a24] dark:text-[#e6f2ee]">=</span>

          {/* Result Block */}
          {error ? (
            <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</div>
          ) : result ? (
            <div className="flex flex-col items-center gap-1.5 bg-[#f4f7f5] dark:bg-[#0c1714] p-3 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] min-w-24">
              <span className="font-mono-numbers text-xl font-extrabold text-[#0f766e] dark:text-[#2dd4bf]">
                {result.numerator}
              </span>
              <div className="w-12 h-0.5 bg-[#0f766e] dark:bg-[#2dd4bf] rounded" />
              <span className="font-mono-numbers text-xl font-extrabold text-[#0f766e] dark:text-[#2dd4bf]">
                {result.denominator}
              </span>
            </div>
          ) : null}
        </div>

        {/* Detailed Representation */}
        {result && !error && (
          <div className="pt-4 border-t border-[#d5e0dc] dark:border-[#243a35] grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Mixed Number</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">
                {result.mixedString}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Decimal Equivalent</span>
              <div className="text-lg font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">
                {result.decimal}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
