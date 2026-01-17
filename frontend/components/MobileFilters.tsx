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
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-all"
        >
          <span className="text-sm font-medium text-gray-700">Filtres et options</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Mobile: Expanded filters */}
        {isOpen && (
          <div className="mt-2 space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Langue</label>
                <FilterChips resultCount={resultCount} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Tri et vue</label>
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
