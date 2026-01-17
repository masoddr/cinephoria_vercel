#!/usr/bin/env python
"""
Script pour tester les IDs Allociné des cinémas.

Vérifie que chaque ID retourne bien des données depuis l'API Allociné.

Usage:
    python scripts/test_cinema_ids.py [city]
    
Exemples:
    python scripts/test_cinema_ids.py toulouse
    python scripts/test_cinema_ids.py paris
    python scripts/test_cinema_ids.py  # Toutes les villes
"""

import sys
import requests
from pathlib import Path
from datetime import datetime, timedelta
import logging

# Ajouter le répertoire parent au PYTHONPATH
sys.path.append(str(Path(__file__).parent.parent))

from scripts.constants.cinemas import CINEMAS

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_cinema_id(cinema_id: str, cinema_name: str, city: str) -> bool:
    """
    Teste un ID Allociné en appelant l'API.
    
    Returns:
        True si l'ID fonctionne, False sinon
    """
    # Tester avec la date d'aujourd'hui
    today = datetime.now().strftime("%Y-%m-%d")
    url = f"https://www.allocine.fr/_/showtimes/theater-{cinema_id}/d-{today}/p-1/"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('results'):
                return True
            else:
                logger.warning(f"  ⚠️  API répond mais pas de résultats")
                return False
        else:
            logger.warning(f"  ❌ Code HTTP {response.status_code}")
            return False
            
    except requests.exceptions.Timeout:
        logger.warning(f"  ⏱️  Timeout")
        return False
    except requests.exceptions.RequestException as e:
        logger.warning(f"  ❌ Erreur: {e}")
        return False
    except Exception as e:
        logger.warning(f"  ❌ Erreur inattendue: {e}")
        return False

def test_all_cinemas(city: str = None):
    """
    Teste tous les IDs de cinémas pour une ville ou toutes les villes.
    """
    logger.info("=" * 60)
    logger.info("TEST DES IDs ALLOCINÉ")
    logger.info("=" * 60)
    
    if city:
        logger.info(f"Test pour la ville: {city}")
        cities_to_test = [city]
    else:
        logger.info("Test pour toutes les villes")
        cities_to_test = list(CINEMAS.keys())
    
    logger.info("")
    
    total_cinemas = 0
    working_ids = 0
    broken_ids = []
    
    for city_key in cities_to_test:
        city_cinemas = CINEMAS.get(city_key, {})
        if not city_cinemas:
            logger.warning(f"⚠️  Aucun cinéma trouvé pour {city_key}")
            continue
        
        logger.info(f"\n{city_key.upper()}:")
        logger.info("-" * 60)
        
        for cinema_code, cinema_info in city_cinemas.items():
            cinema_id = cinema_info.get('id')
            cinema_name = cinema_info['name']
            
            # Skip cinemas without IDs
            if not cinema_id:
                logger.warning(f"⚠️ {cinema_name}: ID manquant (à trouver)")
                continue
            
            total_cinemas += 1
            logger.info(f"Test: {cinema_name} (ID: {cinema_id})")
            
            if test_cinema_id(cinema_id, cinema_name, city_key):
                logger.info(f"  ✅ ID valide")
                working_ids += 1
            else:
                logger.error(f"  ❌ ID invalide ou ne retourne pas de données")
                broken_ids.append({
                    'city': city_key,
                    'code': cinema_code,
                    'name': cinema_name,
                    'id': cinema_id
                })
    
    # Résumé
    logger.info("")
    logger.info("=" * 60)
    logger.info("RÉSUMÉ")
    logger.info("=" * 60)
    logger.info(f"Total de cinémas testés: {total_cinemas}")
    logger.info(f"IDs valides: {working_ids}")
    logger.info(f"IDs invalides: {len(broken_ids)}")
    
    if broken_ids:
        logger.info("\n⚠️  IDs à corriger:")
        for broken in broken_ids:
            logger.info(f"  - {broken['name']} ({broken['city']}): ID {broken['id']}")
        logger.info("\nUtilisez le script find_cinema_id.py pour trouver les bons IDs:")
        logger.info("  python scripts/helpers/find_cinema_id.py \"Nom du cinéma\" \"Ville\"")
    else:
        logger.info("\n✅ Tous les IDs sont valides!")

if __name__ == "__main__":
    city = sys.argv[1] if len(sys.argv) > 1 else None
    
    if city and city not in ['paris', 'toulouse']:
        logger.error(f"Ville invalide: {city}. Utilisez 'paris' ou 'toulouse'")
        sys.exit(1)
    
    test_all_cinemas(city)
