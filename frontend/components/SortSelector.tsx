'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SortOption } from '@/lib/data';

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSort = (searchParams.get('sort') as SortOption) || 'default';

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Par défaut' },
    { value: 'note-desc', label: 'Note ↓' },
    { value: 'note-asc', label: 'Note ↑' },
    { value: 'duree-desc', label: 'Durée ↓' },
    { value: 'duree-asc', label: 'Durée ↑' },
    { value: 'titre-asc', label: 'Titre A-Z' },
  ];

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <label className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Trier par :</label>
      <select
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 flex-1 sm:flex-initial shadow-sm hover:shadow-md cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
