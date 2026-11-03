/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateConcrete } from '../../utils/calcLogic';
import { Hammer, Box, Layers } from 'lucide-react';

export const ConcreteCalculator: React.FC = () => {
  const [type, setType] = useState<'slab' | 'column' | 'footing'>('slab');
  const [lengthFt, setLengthFt] = useState(12);
  const [widthFt, setWidthFt] = useState(10);
  const [depthInches, setDepthInches] = useState(4);

  const result = calculateConcrete(type, lengthFt, widthFt, depthInches);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form controls */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Project Dimensions
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Structure Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slab', label: 'Flat Slab / Patio' },
                { id: 'footing', label: 'Foundation Footing' },
                { id: 'column', label: 'Round Column' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    type === item.id
                      ? 'bg-[#0f766e] text-white border-[#0f766e] dark:bg-[#2dd4bf] dark:text-[#04201c]'
                      : 'bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] border-[#d5e0dc] dark:border-[#243a35]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                {type === 'column' ? 'Height (ft)' : 'Length (ft)'}
              </label>
              <input
                type="number"
                value={lengthFt}
                onChange={(e) => setLengthFt(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                {type === 'column' ? 'Diameter (ft)' : 'Width (ft)'}
              </label>
              <input
                type="number"
                value={widthFt}
                onChange={(e) => setWidthFt(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
              />
            </div>
            {type !== 'column' && (
              <div>
                <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
                  Depth (Inches)
                </label>
                <input
                  type="number"
                  value={depthInches}
                  onChange={(e) => setDepthInches(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Concrete Volume Needed
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {result.cubicYards} <span className="text-xl font-normal text-[#4f6b64] dark:text-[#9fb8b1]">yd³</span>
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Equal to {result.cubicFeet} ft³ ({result.cubicMeters} m³)
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <span className="text-xs font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">
              Pre-mixed Bags Recommendation (+10% margin included)
            </span>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
                <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">60 lb Bags</span>
                <div className="text-2xl font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">
                  {result.bags60lb} bags
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
                <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">80 lb Bags</span>
                <div className="text-2xl font-bold font-mono text-[#0f766e] dark:text-[#2dd4bf]">
                  {result.bags80lb} bags
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
