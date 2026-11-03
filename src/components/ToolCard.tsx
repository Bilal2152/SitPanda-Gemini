/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  onSelect: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(tool.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(tool.id);
        }
      }}
      className="group cursor-pointer text-left flex flex-col justify-between gap-3 p-5 sm:p-6 rounded-2xl bg-[#ffffff] dark:bg-[#132420] border border-[#d5e0dc] dark:border-[#243a35] hover:border-[#0f766e] dark:hover:border-[#2dd4bf] hover:-translate-y-1 transition-all duration-200 shadow-2xs hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] dark:focus-visible:ring-[#2dd4bf] relative"
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#b4480f] dark:text-[#fb923c]">
            {tool.category}
          </span>
          <div className="flex items-center gap-1.5">
            {/* Heart Favorite Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(tool.id);
              }}
              className="p-1.5 rounded-lg hover:bg-[#f4f7f5] dark:hover:bg-[#19312b] transition-colors focus-visible:ring-2 focus-visible:ring-[#0f766e]"
              aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite
                    ? 'fill-rose-500 text-rose-500'
                    : 'text-[#4f6b64] dark:text-[#9fb8b1] group-hover:text-rose-400'
                }`}
              />
            </button>
            <ArrowUpRight className="w-4 h-4 text-[#4f6b64] dark:text-[#9fb8b1] group-hover:text-[#0f766e] dark:group-hover:text-[#2dd4bf] transition-colors" />
          </div>
        </div>
        <h3 className="font-display font-bold text-lg text-[#0f2a24] dark:text-[#e6f2ee] group-hover:text-[#0f766e] dark:group-hover:text-[#2dd4bf] transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#4f6b64] dark:text-[#9fb8b1] line-clamp-2 leading-relaxed">
          {tool.shortDesc}
        </p>
      </div>

      <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#0f766e] dark:text-[#2dd4bf] opacity-90 group-hover:opacity-100">
        <span>Calculate now</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>
  );
};
