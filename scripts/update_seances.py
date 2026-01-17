#!/usr/bin/env python
"""
Script de production pour la mise à jour des séances de cinéma.

Ce script est destiné à être exécuté en production pour :
1. Scraper les nouvelles séances et les synopsis
2. Mettre à jour le cache backend (seances_cache.json)
3. Enrichir les données avec TMDb (durée, date de sortie, note)
4. Copier les données vers le frontend (public/seances.json)

Usage:
    ./update_seances.py
    # ou
    python update_seances.py

Output:
    - Met à jour backend/data/seances_cache.json
    - Met à jour backend/data/tmdb_cache.json
    - Met à jour frontend/public/seances.json avec les données enrichies
"""

import os
import sys
from pathlib import Path
import shutil
import logging
from datetime import datetime
import json

# Ajouter le répertoire parent au PYTHONPATH
sys.path.append(str(Path(__file__).parent.parent))

from scripts.scrapers.allocine import AllocineScraper
from scripts.get_tmdb_data import update_seances_with_tmdb_data

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def datetime_handler(obj):
    """Gestionnaire personnalisé pour la sérialisation JSON des objets datetime"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

def main():
    logger.info("Démarrage du scraping des séances...")
    
    # Définir les chemins
    cache_path = Path(__file__).parent.parent / 'data' / 'seances_cache.json'
    frontend_path = Path(__file__).parent.parent.parent / 'frontend' / 'public' / 'seances.json'
    
    # Créer les répertoires de destination s'ils n'existent pas
    os.makedirs(os.path.dirname(cache_path), exist_ok=True)
    os.makedirs(os.path.dirname(frontend_path), exist_ok=True)
    
    # 1. Scraping avec AllocineScraper
    scraper = AllocineScraper()
    
    # Récupérer les séances et les synopsis
    seances_data = scraper.get_seances_with_synopsis()
    
    # 2. Structurer les données avec metadata (format multi-villes)
    # Extraire les villes uniques depuis les séances
    cities = list(set(s.get('city', 'toulouse') for s in seances_data))
    
    output_data = {
        "last_update": datetime.now().isoformat(),
        "cities": cities,
        "seances": seances_data
    }
    
    # Sauvegarder dans le cache avec le gestionnaire personnalisé
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2, default=datetime_handler)
    logger.info(f"Cache backend mis à jour avec les synopsis : {cache_path}")
    logger.info(f"Villes trouvées : {', '.join(cities)}")
    
    # 3. Copie vers le frontend
    shutil.copy2(cache_path, frontend_path)
    logger.info(f"Cache frontend mis à jour : {frontend_path}")
    
    # 4. Enrichissement avec TMDb
    logger.info("Enrichissement des données avec TMDb...")
    update_seances_with_tmdb_data()
    logger.info("Données TMDb ajoutées avec succès")

if __name__ == "__main__":
    main() 