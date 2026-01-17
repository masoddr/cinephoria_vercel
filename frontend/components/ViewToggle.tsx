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
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white">
      <button
        onClick={() => handleViewChange('cards')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all ${
          currentView === 'cards'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Vue cartes"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="hidden sm:inline">Cartes</span>
      </button>
      <button
        onClick={() => handleViewChange('list')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all ${
          currentView === 'list'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Vue liste"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="hidden sm:inline">Liste</span>
      </button>
    </div>
  );
}
