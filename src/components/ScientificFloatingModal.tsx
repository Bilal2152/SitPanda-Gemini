/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface ScientificFloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculationDone?: (summary: string) => void;
}

export const ScientificFloatingModal: React.FC<ScientificFloatingModalProps> = ({
  isOpen,
  onClose,
  onCalculationDone,
}) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isRad, setIsRad] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleDigit = (d: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? d : prev + d));
  };

  const handleOperator = (op: string) => {
    setEquation(`${display} ${op} `);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length <= 1 || prev === 'Error' ? '0' : prev.slice(0, -1)));
  };

  const evaluateScientific = (funcName: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    const factor = isRad ? 1 : Math.PI / 180;

    switch (funcName) {
      case 'sin':
        res = Math.sin(val * factor);
        break;
      case 'cos':
        res = Math.cos(val * factor);
        break;
      case 'tan':
        res = Math.tan(val * factor);
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'sqr':
        res = val * val;
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'log10':
        res = Math.log10(val);
        break;
      case 'neg':
        res = -val;
        break;
      case 'inv':
        res = 1 / val;
        break;
      case 'fact': {
        const n = Math.floor(val);
        if (n < 0 || n > 170) {
          setDisplay('Error');
          return;
        }
        let f = 1;
        for (let i = 2; i <= n; i++) f *= i;
        res = f;
        break;
      }
      default:
        return;
    }

    const rounded = Math.round(res * 10000000000) / 10000000000;
    const item = `${funcName}(${val}) = ${rounded}`;
    setDisplay(String(rounded));
    setHistory((prev) => [item, ...prev.slice(0, 4)]);
    if (onCalculationDone) {
      onCalculationDone(item);
    }
  };

  const handleEquals = () => {
    if (!equation) return;
    try {
      const parts = equation.trim().split(' ');
      const a = parseFloat(parts[0]);
      const op = parts[1];
      const b = parseFloat(display);

      if (isNaN(a) || isNaN(b)) return;

      let res = 0;
      if (op === '+') res = a + b;
      else if (op === '−' || op === '-') res = a - b;
      else if (op === '×' || op === '*') res = a * b;
      else if (op === '÷' || op === '/') {
        if (b === 0) {
          setDisplay('Error');
          setEquation('');
          return;
        }
        res = a / b;
      } else if (op === '^') {
        res = Math.pow(a, b);
      } else if (op === '%') {
        res = (a * b) / 100;
      }

      const rounded = Math.round(res * 100000000) / 100000000;
      const historyItem = `${equation} ${display} = ${rounded}`;
      setHistory((prev) => [historyItem, ...prev.slice(0, 4)]);
      setDisplay(String(rounded));
      setEquation('');
      if (onCalculationDone) {
        onCalculationDone(historyItem);
      }
    } catch {
      setDisplay('Error');
    }
  };

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys like Ctrl or Cmd are held
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        handleDigit(key);
      } else if (key === '.') {
        e.preventDefault();
        setDisplay((prev) => (prev.includes('.') ? prev : prev + '.'));
      } else if (key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (key === '-') {
        e.preventDefault();
        handleOperator('−');
      } else if (key === '*') {
        e.preventDefault();
        handleOperator('×');
      } else if (key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (key === '^') {
        e.preventDefault();
        handleOperator('^');
      } else if (key === '%' && !e.shiftKey) {
        e.preventDefault();
        handleOperator('%');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (key === 'c' || key === 'C') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, display, equation]);

  if (!isOpen) return null;

  const copyResult = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm sm:max-w-md bg-[#ffffff] dark:bg-[#132420] rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-2xl p-4 sm:p-5 flex flex-col gap-3"
        role="dialog"
        aria-label="SitPanda Quick Scientific Calculator"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#d5e0dc] dark:border-[#243a35]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base text-[#0f2a24] dark:text-[#e6f2ee]">
              Scientific Calculator
            </span>
            <button
              onClick={() => setIsRad(!isRad)}
              className="px-2 py-0.5 text-xs font-semibold rounded bg-[#f4f7f5] dark:bg-[#0c1714] text-[#0f766e] dark:text-[#2dd4bf] border border-[#d5e0dc] dark:border-[#243a35]"
            >
              {isRad ? 'RAD' : 'DEG'}
            </button>
            <span className="hidden sm:inline-block text-[11px] text-[#4f6b64] dark:text-[#9fb8b1] font-mono">
              [Keyboard Enabled]
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={copyResult}
              className="p-1.5 rounded-lg text-[#4f6b64] dark:text-[#9fb8b1] hover:bg-[#f4f7f5] dark:hover:bg-[#19312b]"
              title="Copy result"
              aria-label="Copy result"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#4f6b64] dark:text-[#9fb8b1] hover:bg-[#f4f7f5] dark:hover:bg-[#19312b]"
              aria-label="Close calculator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="bg-[#f4f7f5] dark:bg-[#0c1714] rounded-xl p-3 border border-[#d5e0dc] dark:border-[#243a35] text-right flex flex-col justify-end min-h-[72px]">
          <div className="text-xs text-[#4f6b64] dark:text-[#9fb8b1] font-mono h-4 overflow-hidden truncate">
            {equation || (history[0] ? `Ans: ${history[0]}` : '')}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-[#0f2a24] dark:text-[#e6f2ee] tracking-tight truncate">
            {display}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-sm font-semibold">
          {/* Row 1 */}
          <button
            onClick={() => evaluateScientific('sin')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 active:scale-95 transition-all text-xs sm:text-sm"
          >
            sin
          </button>
          <button
            onClick={() => evaluateScientific('cos')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 active:scale-95 transition-all text-xs sm:text-sm"
          >
            cos
          </button>
          <button
            onClick={() => evaluateScientific('tan')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 active:scale-95 transition-all text-xs sm:text-sm"
          >
            tan
          </button>
          <button
            onClick={() => evaluateScientific('sqrt')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 active:scale-95 transition-all text-xs sm:text-sm"
          >
            √
          </button>
          <button
            onClick={handleClear}
            className="p-2 sm:p-2.5 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 hover:opacity-80 active:scale-95 transition-all text-xs sm:text-sm font-bold"
            title="Clear (C or Esc)"
          >
            AC
          </button>

          {/* Row 2 */}
          <button
            onClick={() => evaluateScientific('ln')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 text-xs sm:text-sm"
          >
            ln
          </button>
          <button
            onClick={() => evaluateScientific('log10')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 text-xs sm:text-sm"
          >
            log
          </button>
          <button
            onClick={() => handleOperator('^')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 text-xs sm:text-sm"
          >
            xʸ
          </button>
          <button
            onClick={() => evaluateScientific('fact')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] hover:opacity-80 text-xs sm:text-sm"
          >
            n!
          </button>
          <button
            onClick={handleBackspace}
            className="p-2 sm:p-2.5 rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 hover:opacity-80 flex items-center justify-center"
            aria-label="Backspace"
            title="Backspace"
          >
            ⌫
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleDigit('7')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] hover:bg-slate-50 text-base"
          >
            7
          </button>
          <button
            onClick={() => handleDigit('8')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] hover:bg-slate-50 text-base"
          >
            8
          </button>
          <button
            onClick={() => handleDigit('9')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] hover:bg-slate-50 text-base"
          >
            9
          </button>
          <button
            onClick={() => handleOperator('÷')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#0f766e]/10 dark:bg-[#2dd4bf]/15 text-[#0f766e] dark:text-[#2dd4bf] font-bold text-base"
            title="Divide (/)"
          >
            ÷
          </button>
          <button
            onClick={() => evaluateScientific('sqr')}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] text-xs sm:text-sm"
          >
            x²
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleDigit('4')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            4
          </button>
          <button
            onClick={() => handleDigit('5')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            5
          </button>
          <button
            onClick={() => handleDigit('6')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            6
          </button>
          <button
            onClick={() => handleOperator('×')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#0f766e]/10 dark:bg-[#2dd4bf]/15 text-[#0f766e] dark:text-[#2dd4bf] font-bold text-base"
            title="Multiply (*)"
          >
            ×
          </button>
          <button
            onClick={() => setDisplay(String(Math.PI))}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] text-xs sm:text-sm"
          >
            π
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleDigit('1')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            1
          </button>
          <button
            onClick={() => handleDigit('2')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            2
          </button>
          <button
            onClick={() => handleDigit('3')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            3
          </button>
          <button
            onClick={() => handleOperator('−')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#0f766e]/10 dark:bg-[#2dd4bf]/15 text-[#0f766e] dark:text-[#2dd4bf] font-bold text-base"
            title="Subtract (-)"
          >
            −
          </button>
          <button
            onClick={() => setDisplay(String(Math.E))}
            className="p-2 sm:p-2.5 rounded-lg bg-[#f4f7f5] dark:bg-[#19312b] text-[#0f766e] dark:text-[#2dd4bf] text-xs sm:text-sm"
          >
            e
          </button>

          {/* Row 6 */}
          <button
            onClick={() => evaluateScientific('neg')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            ±
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base"
          >
            0
          </button>
          <button
            onClick={() => {
              if (!display.includes('.')) setDisplay(display + '.');
            }}
            className="p-2.5 sm:p-3 rounded-lg bg-[#ffffff] dark:bg-[#1f3832] border border-[#d5e0dc] dark:border-[#243a35] text-[#0f2a24] dark:text-[#e6f2ee] text-base font-bold"
          >
            .
          </button>
          <button
            onClick={() => handleOperator('+')}
            className="p-2.5 sm:p-3 rounded-lg bg-[#0f766e]/10 dark:bg-[#2dd4bf]/15 text-[#0f766e] dark:text-[#2dd4bf] font-bold text-base"
            title="Add (+)"
          >
            +
          </button>
          <button
            onClick={handleEquals}
            className="p-2.5 sm:p-3 rounded-lg bg-[#0f766e] text-white dark:bg-[#2dd4bf] dark:text-[#04201c] font-extrabold text-base shadow-sm hover:opacity-90 active:scale-95"
            title="Calculate (Enter or =)"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
