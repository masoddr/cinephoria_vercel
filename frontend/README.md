# Cinephoria Frontend

Frontend Next.js pour l'agrégation des séances de cinéma à Paris et Toulouse.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Build

```bash
npm run build
npm start
```

## Structure

- `app/` - Pages Next.js (App Router)
- `components/` - Composants React réutilisables
- `lib/` - Utilitaires et logique métier
- `public/` - Fichiers statiques (incluant `seances.json` généré par le scraper)

## Données

Le fichier `public/seances.json` est généré automatiquement par le script Python de scraping (`scripts/update_seances.py`).
