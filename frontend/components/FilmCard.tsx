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
    <Link href={`/film/${filmSlug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Poster */}
      <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 bg-slate-200">
        {firstSeance.poster && firstSeance.poster !== 'https://www.allocine.fr/skin/img/placeholder/poster.jpg' ? (
          <Image
            src={firstSeance.poster}
            alt={filmTitle}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 15vw"
            unoptimized // Allociné images may not support optimization
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-300">
            <span className="text-slate-500 text-sm">Affiche non disponible</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2">
          {filmTitle}
        </h3>

        {/* Film metadata */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
          {firstSeance.version && (
            <span className="px-1 sm:px-1.5 md:px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs font-semibold rounded bg-blue-100 text-blue-800">
              {firstSeance.version}
            </span>
          )}
          {firstSeance.duree && (
            <span className="px-1 sm:px-1.5 md:px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs font-semibold rounded bg-gray-100 text-gray-800">
              {formatDuration(firstSeance.duree)}
            </span>
          )}
          {firstSeance.note && (
            <span className="px-1 sm:px-1.5 md:px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
              ⭐ {firstSeance.note.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
