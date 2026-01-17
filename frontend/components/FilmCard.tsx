import Image from 'next/image';
import Link from 'next/link';
import { Seance, slugify, formatDuration } from '@/lib/data';

interface FilmCardProps {
  filmTitle: string;
  seances: Seance[];
}

export default function FilmCard({ filmTitle, seances }: FilmCardProps) {
  if (seances.length === 0) {
    return null;
  }

  const firstSeance = seances[0];
  
  // Generate slug for film detail page
  const filmSlug = slugify(filmTitle);

  return (
    <Link href={`/film/${filmSlug}`} className="block group">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-300 cursor-pointer border border-slate-200/60 hover:border-primary-200/60 hover:-translate-y-1">
        {/* Poster */}
      <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {firstSeance.poster && firstSeance.poster !== 'https://www.allocine.fr/skin/img/placeholder/poster.jpg' ? (
          <Image
            src={firstSeance.poster}
            alt={filmTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 15vw"
            unoptimized // Allociné images may not support optimization
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
            <span className="text-slate-500 text-sm font-medium">Affiche non disponible</span>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-2 sm:mb-2.5 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
          {filmTitle}
        </h3>

        {/* Film metadata */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {firstSeance.version && (
            <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-lg bg-primary-50 text-primary-700 border border-primary-100">
              {firstSeance.version}
            </span>
          )}
          {firstSeance.duree && (
            <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              {formatDuration(firstSeance.duree)}
            </span>
          )}
          {firstSeance.note && (
            <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
              ⭐ {firstSeance.note.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
