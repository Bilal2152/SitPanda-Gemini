/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { generatePassword } from '../../utils/calcLogic';
import { Copy, Check, RefreshCw, Shield, Key } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const [passwordState, setPasswordState] = useState(() =>
    generatePassword({ length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true })
  );

  const handleRegenerate = () => {
    setPasswordState(generatePassword({ length, uppercase, lowercase, numbers, symbols }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(passwordState.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto bg-[#ffffff] dark:bg-[#132420] p-6 sm:p-8 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-6">
        <h3 className="font-display font-bold text-xl text-[#0f2a24] dark:text-[#e6f2ee]">
          Secure Password Generator
        </h3>

        {/* Generated Password Box */}
        <div className="relative flex items-center bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] rounded-xl p-3 sm:p-4">
          <input
            type="text"
            readOnly
            value={passwordState.password}
            className="w-full bg-transparent font-mono font-bold text-lg sm:text-xl text-[#0f2a24] dark:text-[#e6f2ee] tracking-wider outline-none select-all pr-20"
          />
          <div className="absolute right-3 flex items-center gap-1.5">
            <button
              onClick={handleRegenerate}
              className="p-2 rounded-lg text-[#4f6b64] dark:text-[#9fb8b1] hover:text-[#0f2a24] dark:hover:text-[#e6f2ee] hover:bg-[#ffffff] dark:hover:bg-[#19312b] transition-all"
              title="Regenerate password"
              aria-label="Regenerate password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c] font-semibold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength Indicator */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#4f6b64] dark:text-[#9fb8b1]">Password Strength</span>
            <span
              className={
                passwordState.strength === 'Very Strong'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : passwordState.strength === 'Strong'
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-amber-600 dark:text-amber-400'
              }
            >
              {passwordState.strength} (~{passwordState.entropy} bits entropy)
            </span>
          </div>
          <div className="h-2 w-full bg-[#f4f7f5] dark:bg-[#0c1714] rounded-full overflow-hidden flex">
            <div
              style={{ width: `${Math.min(100, (passwordState.entropy / 80) * 100)}%` }}
              className={`h-full transition-all duration-300 ${
                passwordState.strength === 'Very Strong'
                  ? 'bg-emerald-500'
                  : passwordState.strength === 'Strong'
                  ? 'bg-teal-500'
                  : 'bg-amber-500'
              }`}
            />
          </div>
        </div>

        {/* Length Slider */}
        <div className="space-y-2 pt-2 border-t border-[#d5e0dc] dark:border-[#243a35]">
          <div className="flex justify-between items-center text-sm font-semibold text-[#0f2a24] dark:text-[#e6f2ee]">
            <span>Password Length</span>
            <span className="font-mono text-base font-bold text-[#0f766e] dark:text-[#2dd4bf]">{length} chars</span>
          </div>
          <input
            type="range"
            min="6"
            max="48"
            value={length}
            onChange={(e) => {
              const l = Number(e.target.value);
              setLength(l);
              setPasswordState(generatePassword({ length: l, uppercase, lowercase, numbers, symbols }));
            }}
            className="w-full accent-[#0f766e] dark:accent-[#2dd4bf] cursor-pointer"
          />
        </div>

        {/* Character Set Checkboxes */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-2.5 text-sm font-medium text-[#0f2a24] dark:text-[#e6f2ee] cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => {
                setUppercase(e.target.checked);
                setPasswordState(generatePassword({ length, uppercase: e.target.checked, lowercase, numbers, symbols }));
              }}
              className="w-4 h-4 rounded text-[#0f766e] dark:text-[#2dd4bf] focus:ring-[#0f766e]"
            />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-[#0f2a24] dark:text-[#e6f2ee] cursor-pointer">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => {
                setLowercase(e.target.checked);
                setPasswordState(generatePassword({ length, uppercase, lowercase: e.target.checked, numbers, symbols }));
              }}
              className="w-4 h-4 rounded text-[#0f766e] dark:text-[#2dd4bf] focus:ring-[#0f766e]"
            />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-[#0f2a24] dark:text-[#e6f2ee] cursor-pointer">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => {
                setNumbers(e.target.checked);
                setPasswordState(generatePassword({ length, uppercase, lowercase, numbers: e.target.checked, symbols }));
              }}
              className="w-4 h-4 rounded text-[#0f766e] dark:text-[#2dd4bf] focus:ring-[#0f766e]"
            />
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-[#0f2a24] dark:text-[#e6f2ee] cursor-pointer">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => {
                setSymbols(e.target.checked);
                setPasswordState(generatePassword({ length, uppercase, lowercase, numbers, symbols: e.target.checked }));
              }}
              className="w-4 h-4 rounded text-[#0f766e] dark:text-[#2dd4bf] focus:ring-[#0f766e]"
            />
            <span>Symbols (!@#$%)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
