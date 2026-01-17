import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
      <div className="text-center space-y-10 max-w-4xl w-full">
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
            Cinephoria
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 font-medium">
            Découvrez les séances de cinéma du jour
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/aujourdhui/paris"
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-soft hover:shadow-soft-lg border border-slate-200/60 hover:border-primary-200"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 mb-4 flex items-center justify-center shadow-md shadow-primary-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">Paris</h2>
              <p className="text-slate-600">Voir les séances du jour</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="/aujourdhui/toulouse"
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-soft hover:shadow-soft-lg border border-slate-200/60 hover:border-accent-200"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 mb-4 flex items-center justify-center shadow-md shadow-accent-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-accent-700 transition-colors duration-200">Toulouse</h2>
              <p className="text-slate-600">Voir les séances du jour</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Link
            href="/cinemas/paris"
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl p-6 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-soft hover:shadow-soft-lg border border-slate-200/60 hover:border-primary-200"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 mb-3 flex items-center justify-center shadow-md shadow-primary-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">Cinémas à Paris</h2>
              <p className="text-slate-600 text-sm">Carte et liste des cinémas</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="/cinemas/toulouse"
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl p-6 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-soft hover:shadow-soft-lg border border-slate-200/60 hover:border-accent-200"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 mb-3 flex items-center justify-center shadow-md shadow-accent-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-accent-700 transition-colors duration-200">Cinémas à Toulouse</h2>
              <p className="text-slate-600 text-sm">Carte et liste des cinémas</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </main>
  );
}
