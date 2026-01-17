'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LanguageFilter } from '@/lib/filters';

interface FilterChipsProps {
  resultCount: number;
}

export default function FilterChips({ resultCount }: FilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedLanguage = (searchParams.get('lang') as LanguageFilter) || 'all';

  const languages: { value: LanguageFilter; label: string }[] = [
    { value: 'all', label: 'Toutes' },
    { value: 'VF', label: 'VF' },
    { value: 'VO', label: 'VO' },
  ];

  const handleLanguageChange = (language: LanguageFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (language === 'all') {
      params.delete('lang');
    } else {
      params.set('lang', language);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
            className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              selectedLanguage === lang.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <div className="text-xs sm:text-sm text-gray-600">
        {resultCount} {resultCount === 1 ? 'film' : 'films'}
      </div>
    </div>
  );
}
