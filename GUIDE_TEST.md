# Guide de Test et Configuration

## Installation des dépendances

### Backend (Python)

```bash
cd scripts
pip install -r requirements.txt
```

### Frontend (Node.js)

```bash
cd frontend
npm install
```

## Tests des IDs Allociné

### Tester tous les IDs

```bash
# Tous les cinémas
python scripts/test_cinema_ids.py

# Toulouse uniquement
python scripts/test_cinema_ids.py toulouse

# Paris uniquement
python scripts/test_cinema_ids.py paris
```

### Trouver un ID manquant

```bash
python scripts/helpers/find_cinema_id.py "Nom du cinéma" "Ville"
```

Exemples :
```bash
python scripts/helpers/find_cinema_id.py "UGC Ciné Cité Les Halles" "Paris"
python scripts/helpers/find_cinema_id.py "Pathé Opéra" "Paris"
```

## Test du scraper

### Test avec une ville

```bash
# Toulouse (IDs validés)
python scripts/test_scraper.py toulouse

# Paris (seulement 4 cinémas fonctionnels pour l'instant)
python scripts/test_scraper.py paris
```

### Scraping complet

```bash
python scripts/update_seances.py
```

Ce script va :
1. Scraper les séances depuis Allociné
2. Enrichir avec TMDb
3. Générer `frontend/public/seances.json`

## État actuel des IDs

### ✅ Toulouse - Tous valides (sauf Le cratère)
- ABC (P0071) ✅
- American Cosmograph (P0235) ✅
- Utopia Borderouge (W3120) ✅
- Le cratère (P0056) ⚠️ Pas de résultats
- Pathé Wilson (P0057) ✅
- UGC Montaudran (W3140) ✅

### ⚠️ Paris - 4/12 valides
**Valides :**
- MK2 Bastille (P0003) ✅
- Pathé Wepler (P0005) ✅
- MK2 Quai de Seine (P0006) ✅
- Pathé Beaugrenelle (P0009) ✅

**À trouver :**
- UGC Ciné Cité Les Halles
- Pathé Opéra
- UGC George V
- UGC Opéra
- Le Grand Rex
- MK2 Nation
- UGC Ciné Cité La Défense
- Pathé La Villette

## Test du frontend

```bash
cd frontend
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Prochaines étapes

1. ✅ Tester le scraper avec Toulouse
2. 🔄 Trouver les IDs Allociné manquants pour Paris
3. 🔄 Tester le scraper complet avec toutes les villes
4. 🔄 Vérifier l'affichage sur le frontend
