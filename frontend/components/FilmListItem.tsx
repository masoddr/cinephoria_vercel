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
    <Link href={`/film/${filmSlug}`} className="block group">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-slate-200/60 hover:shadow-soft-lg hover:border-primary-200/60 transition-all duration-200 hover:-translate-y-0.5">
        <div className="p-4 sm:p-5">
          {/* Title and metadata in one line */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors duration-200">
              {filmTitle}
            </h3>
            {firstSeance.version && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-primary-50 text-primary-700 border border-primary-100">
                {firstSeance.version}
              </span>
            )}
            {firstSeance.duree && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                {formatDuration(firstSeance.duree)}
              </span>
            )}
            {firstSeance.note && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
                ⭐ {firstSeance.note.toFixed(1)}/10
              </span>
            )}
          </div>

          {/* Showtimes grouped by cinema - compact layout */}
          <div className="flex flex-wrap items-start gap-x-4 gap-y-2 text-xs sm:text-sm">
            {cinemas.map(cinema => {
              const cinemaSeances = sortedSeances.filter(s => s.cinema === cinema);
              return (
                <div key={cinema} className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{cinema}:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cinemaSeances.map((seance, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors duration-150"
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
