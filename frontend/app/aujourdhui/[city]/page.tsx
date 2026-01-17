import { notFound } from 'next/navigation';
import { loadSeancesData, filterSeancesByCityAndDate, filterSeancesByCityAndWeek, groupSeancesByFilm, sortFilms, SortOption } from '@/lib/data';
import { filterByLanguage, filterBySearch } from '@/lib/filters';
import FilmCard from '@/components/FilmCard';
import FilmListItem from '@/components/FilmListItem';
import SearchBar from '@/components/SearchBar';
import MobileFilters from '@/components/MobileFilters';
import WeekSelector from '@/components/WeekSelector';
import { LanguageFilter } from '@/lib/filters';
import { ViewMode } from '@/components/ViewToggle';
import Link from 'next/link';

interface PageProps {
  params: {
    city: string;
  };
  searchParams: {
    search?: string;
    lang?: LanguageFilter;
    sort?: SortOption;
    view?: ViewMode;
    date?: string;
  };
}

export default async function AujourdhuiPage({ params, searchParams }: PageProps) {
  const { city } = params;
  const validCities = ['paris', 'toulouse'];
  
  if (!validCities.includes(city)) {
    notFound();
  }

  const seancesData = await loadSeancesData();
  
  if (!seancesData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-primary-50/20">
        <div className="text-center max-w-2xl px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft-lg p-8 border border-slate-200/60">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Erreur de chargement</h1>
            <p className="text-slate-600 mb-6">
              Impossible de charger les données des séances.
            </p>
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-5 text-left mb-6">
              <p className="text-sm text-amber-800 font-semibold mb-3">Solution :</p>
              <ol className="text-sm text-amber-700 list-decimal list-inside space-y-2">
                <li>Exécutez le script de scraping :</li>
                <li className="ml-4 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  python scripts/update_seances.py
                </li>
                <li>Vérifiez que le fichier <code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">frontend/public/seances.json</code> existe</li>
                <li>Redémarrez le serveur de développement si nécessaire</li>
              </ol>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200 shadow-md shadow-primary-500/30 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get selected date from URL or default to today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let selectedDate = today;
  if (searchParams.date) {
    const parsedDate = new Date(searchParams.date);
    if (!isNaN(parsedDate.getTime())) {
      selectedDate = parsedDate;
      selectedDate.setHours(0, 0, 0, 0);
    }
  }

  // Filter by city and selected date
  let filteredSeances = filterSeancesByCityAndDate(seancesData.seances, city, selectedDate);

  // Apply search filter
  const searchTerm = searchParams.search || '';
  if (searchTerm) {
    filteredSeances = filterBySearch(filteredSeances, searchTerm);
  }

  // Apply language filter
  const selectedLanguage = (searchParams.lang as LanguageFilter) || 'all';
  filteredSeances = filterByLanguage(filteredSeances, selectedLanguage);

  // Group by film
  const filmsMap = groupSeancesByFilm(filteredSeances);
  let films = Array.from(filmsMap.entries());
  
  // Apply sorting
  const sortOption = (searchParams.sort as SortOption) || 'default';
  films = sortFilms(films, sortOption);
  
  // Get view mode
  const viewMode = (searchParams.view as ViewMode) || 'cards';

  // Format city name for display
  const cityName = city === 'paris' ? 'Paris' : 'Toulouse';
  const selectedDateStr = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-4">
          {/* Top row: Title and date */}
          <div className="mb-2 sm:mb-3 lg:mb-3">
            <div className="flex items-start justify-between gap-2 lg:items-center">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight">{cityName}</h1>
                  <p className="text-slate-600 text-xs sm:text-sm hidden lg:block font-medium">{selectedDateStr}</p>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5 sm:mt-1 lg:hidden font-medium">{selectedDateStr}</p>
              </div>
            </div>
          </div>
          
          {/* Desktop: Week selector and search on same line */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 lg:mb-3">
            <div className="flex-1">
              <WeekSelector />
            </div>
            <div className="w-80">
              <SearchBar />
            </div>
          </div>
          
          {/* Mobile: Week selector */}
          <div className="mb-2 sm:mb-3 lg:hidden">
            <WeekSelector />
          </div>
          
          {/* Mobile: Search and Filters */}
          <div className="space-y-2 sm:space-y-3 lg:hidden">
            <SearchBar />
            <MobileFilters resultCount={films.length} />
          </div>
          
          {/* Desktop: Filters only */}
          <div className="hidden lg:block">
            <MobileFilters resultCount={films.length} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {films.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-600 text-lg font-medium">
              {searchTerm
                ? `Aucun film trouvé pour "${searchTerm}"`
                : `Aucune séance disponible le ${selectedDateStr}`}
            </p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3 sm:space-y-4">
            {films.map(([filmTitle, seances]) => (
              <FilmListItem key={filmTitle} filmTitle={filmTitle} seances={seances} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {films.map(([filmTitle, seances]) => (
              <FilmCard key={filmTitle} filmTitle={filmTitle} seances={seances} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
