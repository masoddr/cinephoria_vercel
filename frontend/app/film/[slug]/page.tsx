import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { loadSeancesData, slugify, getFilmDetails, sortSeancesByTime, formatDuration } from '@/lib/data';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function FilmDetailPage({ params }: PageProps) {
  const { slug } = params;
  const seancesData = await loadSeancesData();

  if (!seancesData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h1>
          <p className="text-gray-600">Impossible de charger les données des séances.</p>
        </div>
      </div>
    );
  }

  // Find the film by matching slug with title
  const filmSeances = seancesData.seances.filter(seance => {
    const seanceSlug = slugify(seance.titre);
    return seanceSlug === slug;
  });

  if (filmSeances.length === 0) {
    notFound();
  }

  const filmDetails = getFilmDetails(filmSeances);
  if (!filmDetails) {
    notFound();
  }

  // Group seances by city and cinema
  const seancesByCity = new Map<string, Map<string, typeof filmSeances>>();
  
  for (const seance of filmSeances) {
    const city = seance.city || 'toulouse';
    if (!seancesByCity.has(city)) {
      seancesByCity.set(city, new Map());
    }
    const cityMap = seancesByCity.get(city)!;
    if (!cityMap.has(seance.cinema)) {
      cityMap.set(seance.cinema, []);
    }
    cityMap.get(seance.cinema)!.push(seance);
  }

  // Determine the main city (first city found, or most common)
  const cities = Array.from(seancesByCity.keys());
  const mainCity = cities.length > 0 ? cities[0] : 'toulouse';

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(filmDetails.trailer_url);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <Link href={`/aujourdhui/${mainCity}`} className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm inline-block mb-2">
            ← Revenir aux films
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Poster */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="relative w-full h-96 md:h-full min-h-[400px] bg-slate-200">
                {filmDetails.poster && filmDetails.poster !== 'https://www.allocine.fr/skin/img/placeholder/poster.jpg' ? (
                  <Image
                    src={filmDetails.poster}
                    alt={filmDetails.titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-300">
                    <span className="text-slate-500">Affiche non disponible</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/3 lg:w-3/4 p-6 sm:p-8">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {filmDetails.titre}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-6">
                {filmDetails.version && (
                  <span className="px-3 py-1 text-sm font-semibold rounded bg-blue-100 text-blue-800">
                    {filmDetails.version}
                  </span>
                )}
                {filmDetails.duree && (
                  <span className="px-3 py-1 text-sm font-semibold rounded bg-gray-100 text-gray-800">
                    {formatDuration(filmDetails.duree)}
                  </span>
                )}
                {filmDetails.note && (
                  <span className="px-3 py-1 text-sm font-semibold rounded bg-yellow-100 text-yellow-800">
                    ⭐ {filmDetails.note.toFixed(1)}/10
                  </span>
                )}
                {filmDetails.date_sortie && (
                  <span className="px-3 py-1 text-sm font-semibold rounded bg-green-100 text-green-800">
                    Sortie: {new Date(filmDetails.date_sortie).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>

              {/* Synopsis */}
              {filmDetails.synopsis && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Synopsis</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {filmDetails.synopsis}
                  </p>
                </div>
              )}

              {/* Trailer */}
              {videoId && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Bande-annonce</h2>
                  <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Bande-annonce"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Showtimes by city */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Séances disponibles</h2>
                {Array.from(seancesByCity.entries()).map(([city, cinemasMap]) => {
                  const cityName = city === 'paris' ? 'Paris' : 'Toulouse';
                  return (
                    <div key={city} className="border-t pt-6 first:border-t-0 first:pt-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{cityName}</h3>
                      <div className="space-y-4">
                        {Array.from(cinemasMap.entries()).map(([cinema, seances]) => {
                          const sortedSeances = sortSeancesByTime(seances);
                          return (
                            <div key={cinema} className="bg-gray-50 rounded-lg p-4">
                              <p className="font-semibold text-gray-900 mb-2">{cinema}</p>
                              <div className="flex flex-wrap gap-2">
                                {sortedSeances.map((seance, idx) => (
                                  <Link
                                    key={idx}
                                    href={`/aujourdhui/${city}`}
                                    className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                  >
                                    {seance.heure}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
