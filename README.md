# Cinephoria

Site d'agrégation des séances de cinéma à Paris et Toulouse.

## Structure du projet

```
cinephoria2/
├── scripts/              # Scripts Python de scraping
│   ├── scrapers/        # Scrapers (Allociné)
│   ├── constants/       # Configuration (cinémas, tarifs)
│   ├── helpers/         # Scripts d'aide
│   ├── update_seances.py    # Script principal
│   ├── get_tmdb_data.py     # Enrichissement TMDb
│   └── sync_to_vercel.py     # Synchronisation Vercel
├── frontend/            # Application Next.js
│   ├── app/             # Pages Next.js
│   ├── components/       # Composants React
│   ├── lib/             # Utilitaires
│   └── public/          # Fichiers statiques (seances.json)
└── data/                # Cache backend
    ├── seances_cache.json
    └── tmdb_cache.json
```

## Installation

### Backend (Scraping)

```bash
cd scripts
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Configuration

### Cinémas

Les cinémas sont configurés dans `scripts/constants/cinemas.py`. Pour ajouter un nouveau cinéma :

1. Trouver l'ID Allociné du cinéma :
   ```bash
   python scripts/helpers/find_cinema_id.py "Nom du cinéma" "Ville"
   ```

2. Ajouter le cinéma dans `scripts/constants/cinemas.py` :
   ```python
   'paris': {
       'NOM_CINEMA': {
           'id': 'PXXXX',  # ID Allociné
           'name': 'Nom Affiché',
           'district': 'Arrondissement'  # Optionnel
       }
   }
   ```

### TMDb API

La clé API TMDb est actuellement hardcodée dans `scripts/get_tmdb_data.py`. Pour utiliser votre propre clé :

1. Obtenir une clé sur [themoviedb.org](https://www.themoviedb.org/settings/api)
2. Modifier `TMDB_API_KEY` dans `scripts/get_tmdb_data.py`

## Utilisation

### Scraping manuel

```bash
python scripts/update_seances.py
```

Ce script :
1. Scrape les séances depuis Allociné
2. Enrichit avec les données TMDb
3. Génère `frontend/public/seances.json`

### Synchronisation vers Vercel

```bash
# Méthode Git (recommandée)
python scripts/sync_to_vercel.py --method git
```

### Frontend

```bash
cd frontend
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Déploiement

### VPS - Cron Job

Ajouter dans le crontab :

```bash
# Mise à jour quotidienne à 1h du matin
0 1 * * * cd /chemin/vers/projet && python scripts/update_seances.py >> /var/log/cinephoria.log 2>&1
```

### Vercel

1. Connecter le repository GitHub à Vercel
2. Configurer le build : `cd frontend && npm install && npm run build`
3. Le déploiement se fera automatiquement à chaque push

## Format des données

Le fichier `seances.json` a la structure suivante :

```json
{
  "last_update": "2025-01-15T06:30:00Z",
  "cities": ["paris", "toulouse"],
  "seances": [
    {
      "titre": "Nom du film",
      "heure": "20h30",
      "jour": "2025-01-15",
      "cinema": "UGC Les Halles",
      "city": "paris",
      "version": "VF",
      "duree": 120,
      "poster": "https://...",
      "tmdb_id": 123456,
      "note": 8.5,
      "trailer_url": "https://...",
      "synopsis": "..."
    }
  ]
}
```

## Notes

- Les IDs Allociné des cinémas Paris doivent être vérifiés et mis à jour si nécessaire
- Le scraper récupère les séances pour 7 jours (aujourd'hui + 6 jours suivants)
- Les données sont mises à jour quotidiennement via cron
