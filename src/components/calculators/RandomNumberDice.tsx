/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Dices, RefreshCw } from 'lucide-react';

export const RandomNumberDice: React.FC = () => {
  const [tab, setTab] = useState<'dice' | 'rng'>('dice');

  // Dice state
  const [numDice, setNumDice] = useState(2);
  const [diceValues, setDiceValues] = useState<number[]>([4, 6]);
  const [isRolling, setIsRolling] = useState(false);

  // RNG state
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(100);
  const [count, setCount] = useState(5);
  const [allowDupes, setAllowDupes] = useState(false);
  const [sortResult, setSortResult] = useState(true);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([14, 27, 42, 68, 89]);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const rolls: number[] = [];
      for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }
      setDiceValues(rolls);
      setIsRolling(false);
    }, 200);
  };

  const generateRNG = () => {
    const min = Math.min(minVal, maxVal);
    const max = Math.max(minVal, maxVal);
    const range = max - min + 1;
    const requestedCount = Math.min(count, allowDupes ? 100 : Math.min(range, 100));

    const results: number[] = [];
    if (!allowDupes && range >= requestedCount) {
      const pool = Array.from({ length: range }, (_, i) => min + i);
      for (let i = 0; i < requestedCount; i++) {
        const randIdx = Math.floor(Math.random() * pool.length);
        results.push(pool[randIdx]);
        pool.splice(randIdx, 1);
      }
    } else {
      for (let i = 0; i < requestedCount; i++) {
        results.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    }

    if (sortResult) {
      results.sort((a, b) => a - b);
    }
    setGeneratedNumbers(results);
  };

  const renderDiceFace = (val: number, idx: number) => {
    const dotPatterns: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    const activeDots = dotPatterns[val] || [4];

    return (
      <div
        key={idx}
        className={`w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-[#19312b] rounded-2xl border-2 border-[#d5e0dc] dark:border-[#243a35] shadow-md p-2.5 grid grid-cols-3 grid-rows-3 transition-transform ${
          isRolling ? 'rotate-12 scale-90' : 'rotate-0 scale-100'
        }`}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            {activeDots.includes(i) && (
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0f766e] dark:bg-[#2dd4bf] shadow-xs" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const totalDice = diceValues.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Sub Tabs */}
      <div className="flex bg-[#ffffff] dark:bg-[#132420] p-1.5 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setTab('dice')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            tab === 'dice'
              ? 'bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]'
              : 'text-[#4f6b64] dark:text-[#9fb8b1]'
          }`}
        >
          Virtual Dice Roller
        </button>
        <button
          type="button"
          onClick={() => setTab('rng')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            tab === 'rng'
              ? 'bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]'
              : 'text-[#4f6b64] dark:text-[#9fb8b1]'
          }`}
        >
          Random Number Generator
        </button>
      </div>

      {tab === 'dice' ? (
        <div className="max-w-xl mx-auto bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6 text-center">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Roll The Dice
          </h3>

          {/* Dice Count Selector */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Number of dice:</span>
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => {
                  setNumDice(count);
                  const rolls: number[] = [];
                  for (let i = 0; i < count; i++) rolls.push(Math.floor(Math.random() * 6) + 1);
                  setDiceValues(rolls);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                  numDice === count
                    ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                    : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                }`}
              >
                {count}
              </button>
            ))}
          </div>

          {/* Dice Display Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 min-h-[100px]">
            {diceValues.map((val, idx) => renderDiceFace(val, idx))}
          </div>

          <div className="text-xl font-bold font-display text-[#0f766e] dark:text-[#2dd4bf]">
            Total: {totalDice}
          </div>

          <button
            onClick={rollDice}
            className="w-full py-3 rounded-xl bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c] font-bold text-base shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Dices className="w-5 h-5" />
            Roll Again
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Random Numbers Generator (RNG)
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Lower Limit (Min)</label>
              <input
                type="number"
                value={minVal}
                onChange={(e) => setMinVal(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Upper Limit (Max)</label>
              <input
                type="number"
                value={maxVal}
                onChange={(e) => setMaxVal(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">Quantity of Numbers</label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div className="flex flex-col justify-end space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0f2a24] dark:text-[#e6f2ee] cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDupes}
                  onChange={(e) => setAllowDupes(e.target.checked)}
                  className="rounded text-[#0f766e]"
                />
                Allow Duplicates
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0f2a24] dark:text-[#e6f2ee] cursor-pointer">
                <input
                  type="checkbox"
                  checked={sortResult}
                  onChange={(e) => setSortResult(e.target.checked)}
                  className="rounded text-[#0f766e]"
                />
                Sort Ascending
              </label>
            </div>
          </div>

          <button
            onClick={generateRNG}
            className="w-full py-2.5 rounded-xl bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c] font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Numbers
          </button>

          {/* Generated numbers chip box */}
          <div className="p-4 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] space-y-2">
            <span className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Generated Result:</span>
            <div className="flex flex-wrap gap-2">
              {generatedNumbers.map((num, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#19312b] border border-[#d5e0dc] dark:border-[#243a35] font-mono-numbers font-bold text-base text-[#0f766e] dark:text-[#2dd4bf] shadow-2xs"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
