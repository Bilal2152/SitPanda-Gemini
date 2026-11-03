/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { convertUnits } from '../../utils/calcLogic';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp' | 'speed' | 'digital'>('length');
  const [val, setVal] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('in');
  const [copied, setCopied] = useState(false);

  const unitOptions: Record<string, Array<{ id: string; label: string }>> = {
    length: [
      { id: 'm', label: 'Meters (m)' },
      { id: 'km', label: 'Kilometers (km)' },
      { id: 'cm', label: 'Centimeters (cm)' },
      { id: 'mm', label: 'Millimeters (mm)' },
      { id: 'ft', label: 'Feet (ft)' },
      { id: 'in', label: 'Inches (in)' },
      { id: 'yd', label: 'Yards (yd)' },
      { id: 'mi', label: 'Miles (mi)' },
    ],
    weight: [
      { id: 'kg', label: 'Kilograms (kg)' },
      { id: 'g', label: 'Grams (g)' },
      { id: 'mg', label: 'Milligrams (mg)' },
      { id: 'lb', label: 'Pounds (lb)' },
      { id: 'oz', label: 'Ounces (oz)' },
      { id: 'ton', label: 'Metric Ton (t)' },
    ],
    temp: [
      { id: 'c', label: 'Celsius (°C)' },
      { id: 'f', label: 'Fahrenheit (°F)' },
      { id: 'k', label: 'Kelvin (K)' },
    ],
    speed: [
      { id: 'kmh', label: 'km/h' },
      { id: 'mph', label: 'mph' },
      { id: 'mps', label: 'm/s' },
      { id: 'knot', label: 'Knots' },
    ],
    digital: [
      { id: 'b', label: 'Bytes (B)' },
      { id: 'kb', label: 'Kilobytes (KB)' },
      { id: 'mb', label: 'Megabytes (MB)' },
      { id: 'gb', label: 'Gigabytes (GB)' },
      { id: 'tb', label: 'Terabytes (TB)' },
    ],
  };

  const handleCategoryChange = (cat: 'length' | 'weight' | 'temp' | 'speed' | 'digital') => {
    setCategory(cat);
    const opts = unitOptions[cat];
    setFromUnit(opts[0].id);
    setToUnit(opts[1] ? opts[1].id : opts[0].id);
  };

  const handleSwap = () => {
    const prevFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(prevFrom);
  };

  const result = convertUnits(val, fromUnit, toUnit, category);

  const copyResult = () => {
    navigator.clipboard.writeText(`${result}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2">
        {(['length', 'weight', 'temp', 'speed', 'digital'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              category === cat
                ? 'bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c]'
                : 'bg-[#ffffff] dark:bg-[#132420] text-[#0f2a24] dark:text-[#e6f2ee] border border-[#d5e0dc] dark:border-[#243a35]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Converter Card */}
      <div className="bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* From Input */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">From Value &amp; Unit</label>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-lg font-bold outline-none focus:ring-2 focus:ring-[#0f766e]"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] text-sm font-medium outline-none"
            >
              {unitOptions[category].map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:col-span-1">
            <button
              type="button"
              onClick={handleSwap}
              className="w-12 h-12 rounded-full border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f766e] dark:text-[#2dd4bf] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs"
              title="Swap units"
              aria-label="Swap units"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* To Result */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">Converted Result</label>
              <button
                type="button"
                onClick={copyResult}
                className="text-xs font-semibold text-[#0f766e] dark:text-[#2dd4bf] flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f766e] dark:text-[#2dd4bf] font-mono-numbers text-lg font-bold overflow-x-auto truncate">
              {result}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] text-sm font-medium outline-none"
            >
              {unitOptions[category].map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
