Tu es un lead engineer. Je veux un PLAN détaillé (pas de code) pour reconstruire Cinephoria : un site qui agrège les séances de cinéma à Paris et Toulouse.

Objectifs produit
- Page d’accueil : choix de ville (Paris / Toulouse).
- Page “Aujourd’hui” : affiche les films à l’affiche dans la journée pour la ville choisie.
- UI : mosaïque de cartes par film. Chaque carte contient : affiche (si possible), titre, et liste des séances du jour (heure + cinéma).
- Recherche : champ de recherche global (film ou cinéma) + filtres (ex: arrondissement/quartier si dispo, VF/VOST, 2D/3D/IMAX si dispo).
- Performance : chargement rapide, pagination ou “load more” si nécessaire.

Contrainte infra
- Frontend : hébergé sur Vercel (Next.js ou Astro, à recommander).
- Backend data : un script Python de scraping tourne sur mon VPS (cron). Il collecte les séances et produit une base de fichiers JSON pour chaque ville
- Le front ne doit pas scraper : il consomme des fichiers statiques JSON générés.

Ce que j’attends de toi en mode Plan (sortie structurée)

2) Schéma de données minimal (JSON) : City, Cinema, Film, Showtime, sources, timestamps, déduplication.
4) Stratégie de normalisation : unifier noms de films/cinés, gestion des variantes de titres, langues (VF/VOST), formats, et comment éviter les doublons entre sources.
6) Sécurité & conformité : robots.txt/ToS à considérer, user-agent, rate limiting, stockage des logs, exposition minimale.
7) Plan de dev en étapes (MVP -> v1) avec checklist de tâches.
8) Recommandations UX : structure des pages, composants (mosaïque, recherche, filtres), états vides, loading, SEO (metadata, sitemap).
10) Déploiement : cron sur VPS

Contexte
- Deux villes : Paris et Toulouse. Possibilité d’ajouter d’autres villes plus tard.
- Je veux une solution robuste mais simple à maintenir, avec un bon cache et un comportement “toujours des données à jour pour aujourd’hui”.
- Propose une solution par défaut, mais mentionne une alternative plus ambitieuse si ça vaut le coup.

Règles
- Pas de code dans cette réponse, uniquement un plan concret et actionnable.
- Fais des choix et explique-les, ne reste pas vague.