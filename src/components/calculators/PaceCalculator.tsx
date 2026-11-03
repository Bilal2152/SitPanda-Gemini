/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculatePace } from '../../utils/calcLogic';
import { Timer, Zap } from 'lucide-react';

export const PaceCalculator: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(50);
  const [seconds, setSeconds] = useState(0);

  const result = calculatePace(distanceKm, hours, minutes, seconds);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form controls */}
        <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-5">
          <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
            Distance &amp; Time
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Distance (Kilometers)
            </label>
            <input
              type="number"
              step="0.1"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers focus:ring-2 focus:ring-[#0f766e] outline-none"
            />
            {/* Quick race presets */}
            <div className="flex gap-2 mt-2">
              {[
                { label: '5K', km: 5 },
                { label: '10K', km: 10 },
                { label: 'Half Marathon', km: 21.0975 },
                { label: 'Marathon', km: 42.195 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setDistanceKm(p.km)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#4f6b64] dark:text-[#9fb8b1]"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee] mb-1.5">
              Elapsed Time
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Hours</span>
                <input
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-center focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Minutes</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-center focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Seconds</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-[#d5e0dc] dark:border-[#243a35] bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f2a24] dark:text-[#e6f2ee] font-mono-numbers text-center focus:ring-2 focus:ring-[#0f766e] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-7 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6b64] dark:text-[#9fb8b1]">
              Pace per Kilometer
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-[#0f766e] dark:text-[#2dd4bf]">
              {result.paceKm} <span className="text-lg font-normal text-[#4f6b64] dark:text-[#9fb8b1]">/km</span>
            </div>
            <p className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">
              Pace per mile: <strong>{result.paceMile} /mi</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
            <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Speed (km/h)</span>
              <div className="text-2xl font-bold font-mono text-[#0f2a24] dark:text-[#e6f2ee]">{result.speedKmh}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35]">
              <span className="text-xs text-[#4f6b64] dark:text-[#9fb8b1]">Speed (mph)</span>
              <div className="text-2xl font-bold font-mono text-[#0f766e] dark:text-[#2dd4bf]">{result.speedMph}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
