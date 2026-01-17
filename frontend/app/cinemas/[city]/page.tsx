import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CINEMAS_DATA, getGoogleMapsDirectionsUrl, type Cinema } from '@/lib/cinemas';

// Dynamically import the map component to avoid SSR issues with Leaflet
const CinemaMap = dynamic(() => import('@/components/CinemaMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-200/60 shadow-soft bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm mb-3 shadow-sm">
          <svg className="w-6 h-6 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-slate-600 font-medium">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

interface PageProps {
  params: {
    city: string;
  };
}

/**
 * Get center coordinates for a city
 */
function getCityCenter(city: string): [number, number] {
  const centers: Record<string, [number, number]> = {
    paris: [48.8566, 2.3522],
    toulouse: [43.6047, 1.4442],
  };
  return centers[city] || [48.8566, 2.3522];
}

export default function CinemasPage({ params }: PageProps) {
  const { city } = params;
  const validCities = ['paris', 'toulouse'];

  if (!validCities.includes(city)) {
    notFound();
  }

  const cinemas = CINEMAS_DATA[city] || [];
  const cityName = city === 'paris' ? 'Paris' : 'Toulouse';
  const center = getCityCenter(city);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Cinémas à {cityName}
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Map section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Carte des cinémas
          </h2>
          <CinemaMap cinemas={cinemas} center={center} />
        </div>

        {/* Cinemas list */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Liste des cinémas ({cinemas.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cinemas.map((cinema) => (
              <CinemaCard key={cinema.id} cinema={cinema} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Cinema card component
 */
function CinemaCard({ cinema }: { cinema: Cinema }) {
  const directionsUrl = getGoogleMapsDirectionsUrl(cinema.address);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft p-6 hover:shadow-soft-lg transition-all duration-300 border border-slate-200/60 hover:border-primary-200/60 hover:-translate-y-1">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{cinema.name}</h3>
      {cinema.district && (
        <p className="text-sm text-slate-500 mb-2 font-medium">{cinema.district}</p>
      )}
      <p className="text-slate-700 mb-5">{cinema.address}</p>
      <div className="flex flex-wrap gap-2">
        {cinema.website && (
          <a
            href={cinema.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-md shadow-primary-500/30 hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Site web
          </a>
        )}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-500/30 hover:shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Itinéraire
        </a>
      </div>
    </div>
  );
}
