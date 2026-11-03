/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ToolCategory = 'Finance' | 'Health' | 'Math' | 'Date' | 'Everyday';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  shortDesc: string;
  keywords: string[];
  popular?: boolean;
  formula?: string;
  guide?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface RecentCalculation {
  id: string;
  toolId: string;
  toolName: string;
  summary: string;
  timestamp: number;
}
