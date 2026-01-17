#!/usr/bin/env python
"""
Script pour récupérer les informations complètes d'un cinéma depuis Allociné.
Récupère l'adresse et les coordonnées GPS.

Usage:
    python scripts/helpers/get_cinema_info.py C0134
"""

import sys
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import json
import re

# Ajouter le répertoire parent au PYTHONPATH
sys.path.append(str(Path(__file__).parent.parent.parent))

def get_cinema_info(cinema_id: str) -> dict:
    """
    Récupère les informations d'un cinéma depuis Allociné.
    
    Args:
        cinema_id: ID Allociné du cinéma (ex: C0134, P0003)
    
    Returns:
        dict avec les informations du cinéma (name, address, lat, lng, website)
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    # URL de la page du cinéma
    url = f"https://www.allocine.fr/seance/salle_gen_csalle={cinema_id}.html"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extraire le nom du cinéma
        name = None
        name_elem = soup.find('h1', class_='entity-title')
        if name_elem:
            name = name_elem.get_text(strip=True)
        
        # Extraire l'adresse
        address = None
        address_elem = soup.find('div', class_='theater-address') or soup.find('span', class_='theater-address')
        if address_elem:
            address = address_elem.get_text(strip=True)
        else:
            # Chercher dans les meta tags ou autres emplacements
            for elem in soup.find_all(['div', 'span', 'p']):
                text = elem.get_text(strip=True)
                if 'Paris' in text and any(char.isdigit() for char in text):
                    address = text
                    break
        
        # Extraire les coordonnées GPS depuis les scripts JSON-LD ou les meta tags
        lat = None
        lng = None
        
        # Chercher dans les scripts JSON-LD
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and 'geo' in data:
                    geo = data['geo']
                    if 'latitude' in geo:
                        lat = float(geo['latitude'])
                    if 'longitude' in geo:
                        lng = float(geo['longitude'])
            except (json.JSONDecodeError, KeyError, ValueError):
                continue
        
        # Chercher dans les meta tags
        if not lat or not lng:
            for meta in soup.find_all('meta', property=re.compile(r'geo|latitude|longitude', re.I)):
                prop = meta.get('property', '').lower()
                content = meta.get('content', '')
                if 'latitude' in prop:
                    try:
                        lat = float(content)
                    except ValueError:
                        pass
                elif 'longitude' in prop:
                    try:
                        lng = float(content)
                    except ValueError:
                        pass
        
        # Chercher dans les données JavaScript
        if not lat or not lng:
            for script in soup.find_all('script'):
                if script.string:
                    # Chercher des patterns comme lat: 48.xxx ou latitude: 48.xxx
                    lat_match = re.search(r'lat(itude)?["\']?\s*[:=]\s*([0-9]+\.[0-9]+)', script.string, re.I)
                    lng_match = re.search(r'lng|lon(?:gitude)?["\']?\s*[:=]\s*([0-9]+\.[0-9]+)', script.string, re.I)
                    if lat_match:
                        try:
                            lat = float(lat_match.group(2))
                        except ValueError:
                            pass
                    if lng_match:
                        try:
                            lng = float(lng_match.group(1))
                        except ValueError:
                            pass
        
        # Extraire le site web
        website = None
        website_elem = soup.find('a', class_='theater-website') or soup.find('a', href=re.compile(r'http'))
        if website_elem:
            website = website_elem.get('href', [None])[0]
        
        return {
            'id': cinema_id,
            'name': name,
            'address': address,
            'lat': lat,
            'lng': lng,
            'website': website,
        }
        
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la récupération: {e}")
        return {
            'id': cinema_id,
            'name': None,
            'address': None,
            'lat': None,
            'lng': None,
            'website': None,
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python get_cinema_info.py CINEMA_ID")
        print('Exemple: python get_cinema_info.py C0134')
        sys.exit(1)
    
    cinema_id = sys.argv[1]
    info = get_cinema_info(cinema_id)
    print(json.dumps(info, indent=2, ensure_ascii=False))
