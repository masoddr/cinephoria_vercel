/**
 * Utilities for loading and filtering seances data
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

export interface Seance {
  titre: string;
  heure: string;
  jour: string;
  cinema: string;
  city: string;
  version: string;
  duree?: number;
  tags: string[];
  poster: string;
  tmdb_id?: number;
  date_sortie?: string;
  note?: number;
  trailer_url?: string;
  synopsis?: string;
}

export interface SeancesData {
  last_update: string;
  cities: string[];
  seances: Seance[];
}

/**
 * Load seances data from JSON file
 * Works in both Server Components and Client Components
 */
export async function loadSeancesData(): Promise<SeancesData | null> {
  try {
    // In Server Components, read from file system
    if (typeof window === 'undefined') {
      const filePath = join(process.cwd(), 'public', 'seances.json');
      try {
        const fileContents = await readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContents);
        
        // Handle both old format (list) and new format (object with seances)
        if (Array.isArray(data)) {
          return {
            last_update: new Date().toISOString(),
            cities: ['toulouse'], // Default for old format
            seances: data.map(s => ({ ...s, city: s.city || 'toulouse' }))
          };
        }
        
        return data as SeancesData;
      } catch (fsError: any) {
        if (fsError.code === 'ENOENT') {
          console.error('Fichier seances.json introuvable');
          console.error('Solution: Exécutez le script de scraping: python scripts/update_seances.py');
        } else {
          console.error('Erreur de lecture du fichier:', fsError);
        }
        return null;
      }
    }
    
    // In Client Components, use fetch
    const response = await fetch('/seances.json', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error('Fichier seances.json introuvable (404)');
        console.error('Solution: Exécutez le script de scraping: python scripts/update_seances.py');
        return null;
      }
      throw new Error(`Failed to load seances: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both old format (list) and new format (object with seances)
    if (Array.isArray(data)) {
      return {
        last_update: new Date().toISOString(),
        cities: ['toulouse'], // Default for old format
        seances: data.map(s => ({ ...s, city: s.city || 'toulouse' }))
      };
    }
    
    return data as SeancesData;
  } catch (error) {
    console.error('Error loading seances data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('Error details:', errorMessage);
    return null;
  }
}

/**
 * Filter seances by city and date
 */
export function filterSeancesByCityAndDate(
  seances: Seance[],
  city: string,
  date: Date
): Seance[] {
  // Get date string in YYYY-MM-DD format, handling timezone correctly
  // Use local date components to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;
  
  return seances.filter(seance => {
    // Extract date part from ISO string or date string
    // Handle format: "2026-01-17T00:00:00" or "2026-01-17"
    let seanceDateStr: string;
    if (typeof seance.jour === 'string') {
      // Extract YYYY-MM-DD from "2026-01-17T00:00:00" or "2026-01-17"
      seanceDateStr = seance.jour.substring(0, 10);
    } else {
      // If it's already a Date object (shouldn't happen with JSON)
      const d = new Date(seance.jour);
      seanceDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    
    const cityMatch = seance.city === city;
    const dateMatch = seanceDateStr === dateStr;
    
    return cityMatch && dateMatch;
  });
}

/**
 * Filter seances by city and date range (week)
 */
export function filterSeancesByCityAndWeek(
  seances: Seance[],
  city: string,
  startDate: Date
): Seance[] {
  // Get all dates in the week (7 days)
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    date.setHours(0, 0, 0, 0);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    weekDates.push(`${year}-${month}-${day}`);
  }
  
  return seances.filter(seance => {
    // Extract date part from ISO string or date string
    let seanceDateStr: string;
    if (typeof seance.jour === 'string') {
      seanceDateStr = seance.jour.substring(0, 10);
    } else {
      const d = new Date(seance.jour);
      seanceDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    
    const cityMatch = seance.city === city;
    const dateMatch = weekDates.includes(seanceDateStr);
    
    return cityMatch && dateMatch;
  });
}

/**
 * Group seances by film
 */
export function groupSeancesByFilm(seances: Seance[]): Map<string, Seance[]> {
  const grouped = new Map<string, Seance[]>();
  
  for (const seance of seances) {
    const titre = seance.titre;
    if (!grouped.has(titre)) {
      grouped.set(titre, []);
    }
    grouped.get(titre)!.push(seance);
  }
  
  return grouped;
}

/**
 * Sort seances by time
 */
export function sortSeancesByTime(seances: Seance[]): Seance[] {
  return [...seances].sort((a, b) => {
    // Extract time from "HHhMM" format
    const timeA = a.heure.replace('h', ':');
    const timeB = b.heure.replace('h', ':');
    return timeA.localeCompare(timeB);
  });
}

/**
 * Generate a URL-friendly slug from a film title
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Find seances for a specific film by title
 */
export function findSeancesByTitle(seances: Seance[], title: string): Seance[] {
  return seances.filter(s => s.titre === title);
}

/**
 * Format duration in minutes to "XhYY" format (e.g., 100 min -> "1h40")
 */
export function formatDuration(minutes?: number): string {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}min`;
  }
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h${mins.toString().padStart(2, '0')}`;
}

/**
 * Get film details from seances (first seance contains all metadata)
 */
export function getFilmDetails(seances: Seance[]): {
  titre: string;
  synopsis?: string;
  trailer_url?: string;
  poster: string;
  note?: number;
  duree?: number;
  version?: string;
  date_sortie?: string;
  tmdb_id?: number;
} | null {
  if (seances.length === 0) return null;
  
  const firstSeance = seances[0];
  return {
    titre: firstSeance.titre,
    synopsis: firstSeance.synopsis,
    trailer_url: firstSeance.trailer_url,
    poster: firstSeance.poster,
    note: firstSeance.note,
    duree: firstSeance.duree,
    version: firstSeance.version,
    date_sortie: firstSeance.date_sortie,
    tmdb_id: firstSeance.tmdb_id,
  };
}

/**
 * Sort options for films
 */
export type SortOption = 'default' | 'note-desc' | 'note-asc' | 'duree-desc' | 'duree-asc' | 'titre-asc';

/**
 * Get average note for a film (from its seances)
 */
function getFilmNote(seances: Seance[]): number {
  const notes = seances
    .map(s => s.note)
    .filter((note): note is number => note !== undefined && note !== null);
  
  if (notes.length === 0) return 0;
  return notes.reduce((sum, note) => sum + note, 0) / notes.length;
}

/**
 * Get average duration for a film (from its seances)
 */
function getFilmDuree(seances: Seance[]): number {
  const durees = seances
    .map(s => s.duree)
    .filter((duree): duree is number => duree !== undefined && duree !== null);
  
  if (durees.length === 0) return 0;
  return durees.reduce((sum, duree) => sum + duree, 0) / durees.length;
}

/**
 * Sort films map entries by the specified option
 */
export function sortFilms(
  films: [string, Seance[]][],
  sortOption: SortOption
): [string, Seance[]][] {
  if (sortOption === 'default') {
    return films;
  }

  const sorted = [...films].sort(([titleA, seancesA], [titleB, seancesB]) => {
    switch (sortOption) {
      case 'note-desc':
        return getFilmNote(seancesB) - getFilmNote(seancesA);
      
      case 'note-asc':
        return getFilmNote(seancesA) - getFilmNote(seancesB);
      
      case 'duree-desc':
        return getFilmDuree(seancesB) - getFilmDuree(seancesA);
      
      case 'duree-asc':
        return getFilmDuree(seancesA) - getFilmDuree(seancesB);
      
      case 'titre-asc':
        return titleA.localeCompare(titleB, 'fr', { sensitivity: 'base' });
      
      default:
        return 0;
    }
  });

  return sorted;
}
