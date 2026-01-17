/**
 * Filter utilities for seances
 */

import { Seance } from './data';

export type LanguageFilter = 'all' | 'VF' | 'VO';

/**
 * Filter seances by language
 */
export function filterByLanguage(
  seances: Seance[],
  language: LanguageFilter
): Seance[] {
  if (language === 'all') {
    return seances;
  }
  
  return seances.filter(seance => seance.version === language);
}

/**
 * Filter seances by cinema name (search)
 */
export function filterByCinema(
  seances: Seance[],
  searchTerm: string
): Seance[] {
  if (!searchTerm.trim()) {
    return seances;
  }
  
  const term = searchTerm.toLowerCase();
  return seances.filter(
    seance => seance.cinema.toLowerCase().includes(term)
  );
}

/**
 * Filter seances by film title (search)
 */
export function filterByFilmTitle(
  seances: Seance[],
  searchTerm: string
): Seance[] {
  if (!searchTerm.trim()) {
    return seances;
  }
  
  const term = searchTerm.toLowerCase();
  return seances.filter(
    seance => seance.titre.toLowerCase().includes(term)
  );
}

/**
 * Combined search filter (film title or cinema)
 */
export function filterBySearch(
  seances: Seance[],
  searchTerm: string
): Seance[] {
  if (!searchTerm.trim()) {
    return seances;
  }
  
  const term = searchTerm.toLowerCase();
  return seances.filter(
    seance =>
      seance.titre.toLowerCase().includes(term) ||
      seance.cinema.toLowerCase().includes(term)
  );
}
