'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export type ViewMode = 'cards' | 'list';

export default function ViewToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = (searchParams.get('view') as ViewMode) || 'cards';

  const handleViewChange = (view: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString());
    if (view === 'cards') {
      params.delete('view');
    } else {
      params.set('view', view);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-white/80 backdrop-blur-sm shadow-sm">
      <button
        onClick={() => handleViewChange('cards')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
          currentView === 'cards'
            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
        aria-label="Vue cartes"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="hidden sm:inline">Cartes</span>
      </button>
      <button
        onClick={() => handleViewChange('list')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
          currentView === 'list'
            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
        aria-label="Vue liste"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="hidden sm:inline">Liste</span>
      </button>
    </div>
  );
}
