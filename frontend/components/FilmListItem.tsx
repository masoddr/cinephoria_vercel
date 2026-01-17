import Link from 'next/link';
import { Seance, slugify, formatDuration, sortSeancesByTime } from '@/lib/data';

interface FilmListItemProps {
  filmTitle: string;
  seances: Seance[];
}

export default function FilmListItem({ filmTitle, seances }: FilmListItemProps) {
  if (seances.length === 0) {
    return null;
  }

  const firstSeance = seances[0];
  const sortedSeances = sortSeancesByTime(seances);
  
  // Get unique cinemas for this film
  const cinemas = Array.from(new Set(seances.map(s => s.cinema)));
  
  // Generate slug for film detail page
  const filmSlug = slugify(filmTitle);

  return (
    <Link href={`/film/${filmSlug}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
        <div className="p-3 sm:p-4">
          {/* Title and metadata in one line */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {filmTitle}
            </h3>
            {firstSeance.version && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                {firstSeance.version}
              </span>
            )}
            {firstSeance.duree && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                {formatDuration(firstSeance.duree)}
              </span>
            )}
            {firstSeance.note && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
                ⭐ {firstSeance.note.toFixed(1)}/10
              </span>
            )}
          </div>

          {/* Showtimes grouped by cinema - compact layout */}
          <div className="flex flex-wrap items-start gap-x-4 gap-y-1 text-xs sm:text-sm">
            {cinemas.map(cinema => {
              const cinemaSeances = sortedSeances.filter(s => s.cinema === cinema);
              return (
                <div key={cinema} className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-700">{cinema}:</span>
                  <div className="flex flex-wrap gap-1">
                    {cinemaSeances.map((seance, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded"
                      >
                        {seance.heure}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
