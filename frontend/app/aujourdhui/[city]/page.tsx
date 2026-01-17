import { notFound } from 'next/navigation';
import { loadSeancesData, filterSeancesByCityAndDate, filterSeancesByCityAndWeek, groupSeancesByFilm, sortFilms, SortOption } from '@/lib/data';
import { filterByLanguage, filterBySearch } from '@/lib/filters';
import FilmCard from '@/components/FilmCard';
import FilmListItem from '@/components/FilmListItem';
import SearchBar from '@/components/SearchBar';
import MobileFilters from '@/components/MobileFilters';
import WeekSelector from '@/components/WeekSelector';
import { LanguageFilter } from '@/lib/filters';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-2xl px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h1>
            <p className="text-gray-600 mb-4">
              Impossible de charger les données des séances.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
              <p className="text-sm text-yellow-800 font-semibold mb-2">Solution :</p>
              <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                <li>Exécutez le script de scraping :</li>
                <li className="ml-4 font-mono bg-gray-100 px-2 py-1 rounded">
                  python scripts/update_seances.py
                </li>
                <li>Vérifiez que le fichier <code className="bg-gray-100 px-1 rounded">frontend/public/seances.json</code> existe</li>
                <li>Redémarrez le serveur de développement si nécessaire</li>
              </ol>
            </div>
            <Link
              href="/"
              className="mt-6 inline-block text-blue-600 hover:text-blue-800 underline"
            >
              ← Retour à l'accueil
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="mb-2 sm:mb-3 lg:mb-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <Link href="/" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm mb-1 sm:mb-2 inline-block">
                  ← Retour
                </Link>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{cityName}</h1>
                <p className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">{selectedDateStr}</p>
              </div>
            </div>
          </div>
          
          {/* Week selector - more compact on mobile */}
          <div className="mb-2 sm:mb-3">
            <WeekSelector />
          </div>
          
          {/* Search and Filters */}
          <div className="space-y-2 sm:space-y-3">
            <SearchBar />
            <MobileFilters resultCount={films.length} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {films.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
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
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {films.map(([filmTitle, seances]) => (
              <FilmCard key={filmTitle} filmTitle={filmTitle} seances={seances} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
