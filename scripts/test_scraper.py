#!/usr/bin/env python
"""
Script de test pour le scraper Allociné.

Permet de tester le scraper avec une seule ville ou tous les cinémas.

Usage:
    python scripts/test_scraper.py [city]
    
Exemples:
    python scripts/test_scraper.py toulouse
    python scripts/test_scraper.py paris
    python scripts/test_scraper.py  # Toutes les villes
"""

import sys
import logging
from pathlib import Path
from datetime import datetime
import json

# Ajouter le répertoire parent au PYTHONPATH
sys.path.append(str(Path(__file__).parent.parent))

from scripts.scrapers.allocine import AllocineScraper

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_scraper(city: str = None):
    """
    Teste le scraper pour une ville spécifique ou toutes les villes.
    
    Args:
        city: 'paris', 'toulouse', ou None pour toutes les villes
    """
    logger.info("=" * 60)
    logger.info("TEST DU SCRAPER ALLOCINÉ")
    logger.info("=" * 60)
    
    if city:
        logger.info(f"Test pour la ville: {city}")
    else:
        logger.info("Test pour toutes les villes")
    
    logger.info("")
    
    try:
        scraper = AllocineScraper()
        
        # Test avec get_seances (sans synopsis pour aller plus vite)
        logger.info("Récupération des séances (sans synopsis)...")
        seances = scraper.get_seances(city=city)
        
        logger.info("")
        logger.info("=" * 60)
        logger.info("RÉSULTATS")
        logger.info("=" * 60)
        
        if not seances:
            logger.warning("⚠️  Aucune séance récupérée!")
            return
        
        # Statistiques par ville
        cities_stats = {}
        cinemas_stats = {}
        
        for seance in seances:
            city_name = seance.get('city', 'unknown')
            cinema_name = seance.get('cinema', 'unknown')
            
            if city_name not in cities_stats:
                cities_stats[city_name] = 0
            cities_stats[city_name] += 1
            
            if cinema_name not in cinemas_stats:
                cinemas_stats[cinema_name] = 0
            cinemas_stats[cinema_name] += 1
        
        logger.info(f"\nTotal de séances récupérées: {len(seances)}")
        logger.info("\nPar ville:")
        for city_name, count in sorted(cities_stats.items()):
            logger.info(f"  - {city_name}: {count} séances")
        
        logger.info("\nPar cinéma:")
        for cinema_name, count in sorted(cinemas_stats.items()):
            logger.info(f"  - {cinema_name}: {count} séances")
        
        # Afficher quelques exemples
        logger.info("\nExemples de séances (premières 5):")
        for i, seance in enumerate(seances[:5], 1):
            logger.info(f"  {i}. {seance['titre']} - {seance['cinema']} - {seance['heure']} ({seance.get('city', 'N/A')})")
        
        # Vérifier les champs requis
        logger.info("\nVérification des champs requis...")
        required_fields = ['titre', 'heure', 'jour', 'cinema', 'city', 'version']
        missing_fields = []
        
        for seance in seances:
            for field in required_fields:
                if field not in seance:
                    if field not in missing_fields:
                        missing_fields.append(field)
        
        if missing_fields:
            logger.warning(f"⚠️  Champs manquants dans certaines séances: {', '.join(missing_fields)}")
        else:
            logger.info("✅ Tous les champs requis sont présents")
        
        logger.info("")
        logger.info("=" * 60)
        logger.info("TEST TERMINÉ AVEC SUCCÈS")
        logger.info("=" * 60)
        
    except Exception as e:
        logger.error(f"❌ Erreur lors du test: {e}")
        logger.exception("Détails de l'erreur:")
        sys.exit(1)

if __name__ == "__main__":
    city = sys.argv[1] if len(sys.argv) > 1 else None
    
    if city and city not in ['paris', 'toulouse']:
        logger.error(f"Ville invalide: {city}. Utilisez 'paris' ou 'toulouse'")
        sys.exit(1)
    
    test_scraper(city)
