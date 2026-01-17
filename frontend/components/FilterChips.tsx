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
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              selectedLanguage === lang.value
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30 hover:bg-primary-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <div className="text-xs sm:text-sm text-slate-600 font-medium">
        {resultCount} {resultCount === 1 ? 'film' : 'films'}
      </div>
    </div>
  );
}
