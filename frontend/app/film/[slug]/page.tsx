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

  // Format release date
  const formatReleaseDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4">
          <Link href={`/aujourdhui/${mainCity}`} className="text-blue-600 hover:text-blue-800 text-sm inline-block">
            ← Revenir aux films
          </Link>
        </div>
      </header>

      {/* Main content - Three column layout */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
          {/* Left Column - Poster with overlay title */}
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <div className="relative w-full aspect-[2/3] bg-slate-200 overflow-hidden">
              {filmDetails.poster && filmDetails.poster !== 'https://www.allocine.fr/skin/img/placeholder/poster.jpg' ? (
                <>
                  <Image
                    src={filmDetails.poster}
                    alt={filmDetails.titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    unoptimized
                  />
                  {/* Title overlay on poster - inspired by the design */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-8">
                    <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {filmDetails.titre.toUpperCase()}
                    </h1>
                    {filmDetails.version && (
                      <p className="text-white/90 text-sm font-medium mb-2">{filmDetails.version}</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-300">
                  <span className="text-slate-500">Affiche non disponible</span>
                </div>
              )}
            </div>
          </div>

          {/* Center Column - Title, duration, date, synopsis */}
          <div className="lg:col-span-5 mb-8 lg:mb-0">
            {/* Title (duplicate for better mobile experience) */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:hidden">
              {filmDetails.titre}
            </h1>

            {/* Duration and release date */}
            <div className="flex items-center gap-3 text-gray-700 mb-8">
              {filmDetails.duree && (
                <span className="text-base font-medium">
                  {formatDuration(filmDetails.duree)}
                </span>
              )}
              {filmDetails.duree && filmDetails.date_sortie && (
                <span className="text-gray-400">•</span>
              )}
              {filmDetails.date_sortie && (
                <span className="text-base font-medium">
                  {formatReleaseDate(filmDetails.date_sortie)}
                </span>
              )}
            </div>

            {/* Synopsis */}
            {filmDetails.synopsis && (
              <div className="mb-8">
                <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line">
                  {filmDetails.synopsis}
                </p>
              </div>
            )}

            {/* Trailer */}
            {videoId && (
              <div className="mb-8">
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
                  <div key={city} className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{cityName}</h3>
                    <div className="space-y-4">
                      {Array.from(cinemasMap.entries()).map(([cinema, seances]) => {
                        const sortedSeances = sortSeancesByTime(seances);
                        return (
                          <div key={cinema} className="bg-gray-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-900 mb-3">{cinema}</p>
                            <div className="flex flex-wrap gap-2">
                              {sortedSeances.map((seance, idx) => (
                                <Link
                                  key={idx}
                                  href={`/aujourdhui/${city}`}
                                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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

          {/* Right Column - Metadata sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Rating */}
              {filmDetails.note && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Note
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    ⭐ {filmDetails.note.toFixed(1)}<span className="text-base text-gray-500">/10</span>
                  </p>
                </div>
              )}

              {/* Version */}
              {filmDetails.version && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Version
                  </h3>
                  <p className="text-gray-900 font-medium">{filmDetails.version}</p>
                </div>
              )}

              {/* Duration */}
              {filmDetails.duree && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Durée
                  </h3>
                  <p className="text-gray-900 font-medium">{formatDuration(filmDetails.duree)}</p>
                </div>
              )}

              {/* Release date */}
              {filmDetails.date_sortie && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Date de sortie
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {formatReleaseDate(filmDetails.date_sortie)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
