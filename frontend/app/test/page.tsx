import { loadSeancesData } from '@/lib/data';

export default async function TestPage() {
  const seancesData = await loadSeancesData();
  
  if (!seancesData) {
    return <div>Erreur de chargement</div>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const parisSeances = seancesData.seances.filter(s => s.city === 'paris');
  const parisToday = parisSeances.filter(s => {
    const seanceDate = s.jour.split('T')[0];
    return seanceDate === dateStr;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test de chargement des données</h1>
      <div className="space-y-4">
        <div>
          <p><strong>Date d'aujourd'hui (serveur):</strong> {dateStr}</p>
          <p><strong>Total séances:</strong> {seancesData.seances.length}</p>
          <p><strong>Séances Paris (toutes dates):</strong> {parisSeances.length}</p>
          <p><strong>Séances Paris aujourd'hui ({dateStr}):</strong> {parisToday.length}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Exemples de séances Paris (toutes dates):</h2>
          <ul className="list-disc list-inside space-y-1">
            {parisSeances.slice(0, 10).map((s, i) => (
              <li key={i}>
                {s.titre} - {s.cinema} - {s.jour} - {s.city}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Séances Paris aujourd'hui:</h2>
          <ul className="list-disc list-inside space-y-1">
            {parisToday.slice(0, 10).map((s, i) => (
              <li key={i}>
                {s.titre} - {s.cinema} - {s.heure} - {s.jour}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
