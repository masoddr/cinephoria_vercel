'use client';

import { useState } from 'react';
import FilterChips from './FilterChips';
import SortSelector from './SortSelector';
import ViewToggle, { ViewMode } from './ViewToggle';

interface MobileFiltersProps {
  resultCount: number;
}

export default function MobileFilters({ resultCount }: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile: Button to toggle filters */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="text-sm font-medium text-slate-700">Filtres et options</span>
          <svg
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Mobile: Expanded filters */}
        {isOpen && (
          <div className="mt-2 space-y-3 p-4 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-2 block">Langue</label>
                <FilterChips resultCount={resultCount} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-2 block">Tri et vue</label>
                <div className="space-y-2">
                  <SortSelector />
                  <ViewToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Always visible filters */}
      <div className="hidden md:flex md:items-center md:justify-between md:w-full md:gap-4">
        <FilterChips resultCount={resultCount} />
        <div className="flex items-center gap-2 sm:gap-4">
          <SortSelector />
          <ViewToggle />
        </div>
      </div>
    </>
  );
}
