#!/usr/bin/env python
"""
Script d'aide pour trouver l'ID Allociné d'un cinéma.

Usage:
    python scripts/helpers/find_cinema_id.py "Nom du cinéma" "Ville"
    
Exemple:
    python scripts/helpers/find_cinema_id.py "UGC Les Halles" "Paris"
"""

import sys
import requests
from bs4 import BeautifulSoup
import urllib.parse
from pathlib import Path

# Ajouter le répertoire parent au PYTHONPATH
sys.path.append(str(Path(__file__).parent.parent.parent))

def find_cinema_id(cinema_name: str, city: str = "Paris") -> None:
    """
    Recherche l'ID Allociné d'un cinéma en cherchant sur le site.
    
    Args:
        cinema_name: Nom du cinéma à rechercher
        city: Ville du cinéma
    """
    print(f"Recherche de l'ID Allociné pour: {cinema_name} ({city})")
    print("-" * 60)
    
    # Encoder les termes de recherche
    search_query = f"{cinema_name} {city}"
    encoded_query = urllib.parse.quote(search_query)
    
    # URL de recherche Allociné
    search_url = f"https://www.allocine.fr/rechercher/?q={encoded_query}"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Chercher les liens vers les pages de cinémas
        cinema_links = soup.find_all('a', href=True)
        
        found_cinemas = []
        for link in cinema_links:
            href = link.get('href', '')
            # Les URLs de cinémas contiennent généralement "salle_gen_csalle="
            if 'salle_gen_csalle=' in href:
                # Extraire l'ID depuis l'URL
                # Format: /seance/salle_gen_csalle={ID}.html
                try:
                    cinema_id = href.split('salle_gen_csalle=')[1].split('.')[0].split('&')[0]
                    cinema_text = link.get_text(strip=True)
                    if cinema_text:
                        found_cinemas.append({
                            'id': cinema_id,
                            'name': cinema_text,
                            'url': f"https://www.allocine.fr{href}"
                        })
                except IndexError:
                    continue
        
        if found_cinemas:
            print(f"\n✅ {len(found_cinemas)} cinéma(s) trouvé(s):\n")
            for i, cinema in enumerate(found_cinemas, 1):
                print(f"{i}. {cinema['name']}")
                print(f"   ID: {cinema['id']}")
                print(f"   URL: {cinema['url']}")
                print()
            
            # Tester le premier résultat avec l'API
            if found_cinemas:
                test_id = found_cinemas[0]['id']
                print(f"Test de l'ID {test_id} avec l'API Allociné...")
                test_url = f"https://www.allocine.fr/_/showtimes/theater-{test_id}/d-2025-01-15/p-1/"
                test_response = requests.get(test_url, headers=headers)
                if test_response.status_code == 200:
                    print(f"✅ L'ID {test_id} fonctionne correctement!")
                else:
                    print(f"⚠️  L'ID {test_id} ne retourne pas de données (code: {test_response.status_code})")
        else:
            print("\n❌ Aucun cinéma trouvé.")
            print("\nConseils:")
            print("1. Vérifiez l'orthographe du nom du cinéma")
            print("2. Essayez avec une recherche plus générale")
            print("3. Visitez manuellement Allociné et cherchez le cinéma")
            print("4. L'ID se trouve dans l'URL: https://www.allocine.fr/seance/salle_gen_csalle={ID}.html")
            
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Erreur lors de la recherche: {e}")
        print("\nVous pouvez trouver l'ID manuellement:")
        print("1. Allez sur Allociné et cherchez le cinéma")
        print("2. Ouvrez la page du cinéma")
        print("3. L'ID se trouve dans l'URL: /seance/salle_gen_csalle={ID}.html")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python find_cinema_id.py \"Nom du cinéma\" [Ville]")
        print('Exemple: python find_cinema_id.py "UGC Les Halles" "Paris"')
        sys.exit(1)
    
    cinema_name = sys.argv[1]
    city = sys.argv[2] if len(sys.argv) > 2 else "Paris"
    
    find_cinema_id(cinema_name, city)
