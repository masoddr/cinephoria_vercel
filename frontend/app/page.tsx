import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-4">
          Cinephoria
        </h1>
        <p className="text-xl text-slate-300 mb-12">
          Découvrez les séances de cinéma du jour
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/aujourdhui/paris"
            className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Paris</h2>
              <p className="text-slate-300">Voir les séances du jour</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          
          <Link
            href="/aujourdhui/toulouse"
            className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Toulouse</h2>
              <p className="text-slate-300">Voir les séances du jour</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>
      </div>
    </main>
  );
}
