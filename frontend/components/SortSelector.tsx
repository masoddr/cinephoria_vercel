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
      <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Trier par :</label>
      <select
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
        className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all flex-1 sm:flex-initial"
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
