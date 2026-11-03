/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { History, ArrowRight, Trash2, Calculator } from 'lucide-react';
import { RecentCalculation } from '../types';

interface RecentCalculationsProps {
  recentCalcs: RecentCalculation[];
  onSelectTool: (toolId: string) => void;
  onClear: () => void;
}

export const RecentCalculations: React.FC<RecentCalculationsProps> = ({
  recentCalcs,
  onSelectTool,
  onClear,
}) => {
  if (!recentCalcs || recentCalcs.length === 0) return null;

  const formatRelativeTime = (timestamp: number) => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" aria-labelledby="recent-calc-title">
      <div className="bg-[#ffffff] dark:bg-[#132420] p-5 sm:p-6 rounded-2xl border border-[#d5e0dc] dark:border-[#243a35] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#0f766e] dark:text-[#2dd4bf]" />
            <h2 id="recent-calc-title" className="font-display font-bold text-base sm:text-lg text-[#0f2a24] dark:text-[#e6f2ee]">
              Recent Calculations
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f4f7f5] dark:bg-[#0c1714] text-[#4f6b64] dark:text-[#9fb8b1]">
              Last {recentCalcs.length}
            </span>
          </div>
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-[#4f6b64] dark:text-[#9fb8b1] hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors p-1"
            title="Clear calculation history"
            aria-label="Clear calculation history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear History</span>
          </button>
        </div>

        {/* 5-item list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {recentCalcs.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTool(item.toolId)}
              className="text-left p-3.5 rounded-xl bg-[#f4f7f5] dark:bg-[#0c1714] border border-[#d5e0dc] dark:border-[#243a35] hover:border-[#0f766e] dark:hover:border-[#2dd4bf] hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#b4480f] dark:text-[#fb923c] truncate">
                    {item.toolName}
                  </span>
                  <span className="text-[10px] text-[#4f6b64] dark:text-[#9fb8b1] font-mono">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
                <div className="font-mono text-xs font-semibold text-[#0f2a24] dark:text-[#e6f2ee] line-clamp-2">
                  {item.summary}
                </div>
              </div>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-[#0f766e] dark:text-[#2dd4bf] opacity-80 group-hover:opacity-100">
                <span>Resume</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
