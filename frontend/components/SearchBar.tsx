'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Rechercher un film ou un cinéma..." }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounce
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, router, searchParams]);

  // Focus input when mobile search opens
  useEffect(() => {
    if (isMobileSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleMobileSearchClose = () => {
    setIsMobileSearchOpen(false);
    if (!searchTerm) {
      handleClear();
    }
  };

  const searchInput = (
    <div className="relative group">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 lg:py-3 pl-11 pr-10 text-slate-900 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all duration-200 text-sm lg:text-base placeholder:text-slate-400 hover:border-slate-300 shadow-sm hover:shadow-md"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
        <svg
          className="w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: Compact search bar */}
      <div className="hidden lg:block w-full">
        {searchInput}
      </div>
      
      {/* Tablet: Full search bar */}
      <div className="hidden md:block lg:hidden w-full max-w-2xl mx-auto">
        {searchInput}
      </div>

      {/* Mobile: Button to open search */}
      <div className="md:hidden">
        {!isMobileSearchOpen ? (
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3 text-slate-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-sm">
                {searchTerm || placeholder}
              </span>
            </div>
            {searchTerm && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </button>
        ) : (
          <div className="relative">
            {searchInput}
            <button
              onClick={handleMobileSearchClose}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
