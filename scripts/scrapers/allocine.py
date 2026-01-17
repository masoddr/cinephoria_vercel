import logging
from datetime import datetime, date, timedelta
import json
from .base_scraper import BaseScraper
import requests
from bs4 import BeautifulSoup
import urllib.parse
import unicodedata
from scripts.constants.cinemas import CINEMAS
import os
from scripts.get_tmdb_data import search_movie_tmdb
import time

logger = logging.getLogger(__name__)

class AllocineAPI:
    def get_showtime(self, id_cinema, date_str):
        """Version modifiée qui traite directement la réponse JSON"""
        url = f"https://www.allocine.fr/_/showtimes/theater-{id_cinema}/d-{date_str}/p-1/"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers)
        
        logger.debug(f"URL appelée: {url}")
        logger.debug(f"Status code: {response.status_code}")
        
        if response.status_code != 200:
            return []
        
        try:
            data = response.json()
            if not data or 'results' not in data:
                logger.debug(f"Pas de résultats dans la réponse. Contenu: {data}")
                return []
            
            movies = []
            for movie_data in data.get('results', []):
                if not movie_data or 'movie' not in movie_data:
                    logger.debug(f"Données de film invalides: {movie_data}")
                    continue
                
                movie = movie_data['movie']
                
                # Debug de la structure complète
                logger.debug(f"Structure complète du movie_data: {json.dumps(movie_data, indent=2)}")
                
                # Extraire le titre depuis la structure appropriée
                title = None
                if isinstance(movie, dict):
                    if 'title' in movie:
                        title = movie['title']
                    elif 'originalTitle' in movie:
                        title = movie['originalTitle']
                    elif 'data' in movie and isinstance(movie['data'], dict):
                        title = movie['data'].get('title')
                
                if not title:
                    logger.warning(f"Impossible de trouver le titre pour: {movie}")
                    continue
                
                # Récupérer toutes les séances depuis les différentes catégories
                all_showtimes = []
                
                # Vérifier si nous avons la nouvelle structure avec l'objet showtimes
                if 'showtimes' in movie_data:
                    showtimes_obj = movie_data['showtimes']
                    if isinstance(showtimes_obj, dict):
                        # Parcourir toutes les catégories de séances
                        for category in ['dubbed', 'original', 'local', 'multiple']:
                            if category in showtimes_obj:
                                all_showtimes.extend(showtimes_obj[category])
                    else:
                        # Ancien format où showtimes est une liste
                        all_showtimes.extend(movie_data['showtimes'])
                
                # Traiter les horaires trouvés
                movie_showtimes = []
                for showtime in all_showtimes:
                    if isinstance(showtime, dict):
                        start_time = showtime.get('startsAt')
                        # Détecter la version en fonction de la catégorie ou du champ diffusionVersion
                        version = showtime.get('diffusionVersion', 'LOCAL')
                        if start_time:
                            movie_showtimes.append({
                                'startsAt': start_time,
                                'diffusionVersion': version
                            })
                
                if movie_showtimes:  # N'ajouter que si nous avons des horaires
                    movies.append({
                        'title': title,
                        'showtimes': movie_showtimes
                    })
                else:
                    logger.warning(f"Aucun horaire trouvé pour le film: {title}")
            
            logger.debug(f"Films extraits: {json.dumps(movies, indent=2)}")
            return movies
            
        except Exception as e:
            logger.error(f"Erreur lors du parsing JSON: {str(e)}")
            logger.debug(f"Contenu qui a causé l'erreur: {response.text[:500]}...")
            return []

class AllocineScraper(BaseScraper):
    def __init__(self):
        self.cinemas = CINEMAS
        self.api = AllocineAPI()  # Utiliser notre propre implémentation
        self.base_url = "https://www.allocine.fr"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def _is_old_format(self):
        """Check if CINEMAS is in old format (flat dict) or new format (nested by city)"""
        if not self.cinemas:
            return True
        first_key = list(self.cinemas.keys())[0]
        return first_key not in ['paris', 'toulouse']

    def clean_title(self, title):
        """Nettoie et normalise le titre pour gérer les caractères spéciaux"""
        if isinstance(title, bytes):
            try:
                title = title.decode('utf-8')
            except UnicodeDecodeError:
                try:
                    title = title.decode('latin-1')
                except UnicodeDecodeError:
                    title = title.decode('utf-8', errors='ignore')
        
        # Normaliser les caractères spéciaux
        title = unicodedata.normalize('NFKC', str(title))
        return title

    def get_movie_details(self, movie_title):
        """Récupère les détails d'un film, y compris son affiche et son synopsis"""
        try:
            # Encoder le titre pour l'URL
            encoded_title = urllib.parse.quote(movie_title)
            
            # Essayer d'abord la recherche via l'API
            search_url = f"https://www.allocine.fr/rechercher/movie?q={encoded_title}"
            response = requests.get(search_url, headers=self.headers)
            
            logger.debug(f"URL de recherche: {search_url}")
            logger.debug(f"Status code: {response.status_code}")
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Récupérer le synopsis
            synopsis = ""
            synopsis_element = soup.select_one('.content-txt')
            if synopsis_element:
                synopsis = synopsis_element.text.strip()
            
            # Essayer plusieurs sélecteurs pour trouver l'affiche
            poster_selectors = [
                '.thumbnail-img',
                '.entity-card-img img',
                '.mdl-card__media img',
                '.card-entity-list img',
                '.meta-title-thumbnail img',
                '.thumbnail img',
                'figure.thumbnail img',
                '.movie-card-poster img'
            ]
            
            # Essayer chaque sélecteur jusqu'à trouver une affiche
            for selector in poster_selectors:
                poster_elements = soup.select(selector)
                for poster_img in poster_elements:
                    # Vérifier si le titre du film correspond approximativement
                    alt_text = poster_img.get('alt', '').lower()
                    if movie_title.lower() in alt_text:
                        # Essayer différents attributs pour l'URL
                        poster_url = (
                            poster_img.get('data-src') or
                            poster_img.get('src') or
                            poster_img.get('content')
                        )
                        
                        if poster_url:
                            # Convertir en haute qualité si possible
                            poster_url = poster_url.replace('c_160_213', 'c_310_420')
                            poster_url = poster_url.replace('r_160_213', 'r_310_420')
                            
                            # S'assurer que l'URL est absolue
                            if not poster_url.startswith('http'):
                                poster_url = f"https:{poster_url}"
                            
                            logger.info(f"Affiche et synopsis trouvés pour '{movie_title}'")
                            return {
                                'poster': poster_url,
                                'synopsis': synopsis
                            }
            
            # Si aucune affiche n'est trouvée, essayer une recherche plus générale
            fallback_url = f"https://www.allocine.fr/film/fichefilm_gen_cfilm={movie_title}.html"
            response = requests.get(fallback_url, headers=self.headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            poster_img = soup.select_one('.poster-img')
            if poster_img:
                poster_url = poster_img.get('src')
                if poster_url:
                    if not poster_url.startswith('http'):
                        poster_url = f"https:{poster_url}"
                    logger.info(f"Affiche trouvée (fallback) pour '{movie_title}': {poster_url}")
                    return {
                        'poster': poster_url,
                        'synopsis': synopsis
                    }
            
            # Si toujours rien trouvé, utiliser une image par défaut
            logger.warning(f"Aucune affiche trouvée pour '{movie_title}'")
            return {
                'poster': 'https://www.allocine.fr/skin/img/placeholder/poster.jpg',
                'synopsis': synopsis
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des détails du film '{movie_title}': {e}")
            return {
                'poster': 'https://www.allocine.fr/skin/img/placeholder/poster.jpg',
                'synopsis': ''
            }

    def get_movie_poster_from_cinema_page(self, movie_title, cinema_id):
        """Récupère l'affiche d'un film depuis la page du cinéma"""
        try:
            # URL de la page du cinéma sur Allociné
            cinema_url = f"{self.base_url}/seance/salle_gen_csalle={cinema_id}.html"
            response = requests.get(cinema_url, headers=self.headers)
            
            if response.status_code != 200:
                logger.warning(f"Impossible d'accéder à la page du cinéma: {cinema_url}")
                return None
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Chercher l'image du film par son titre
            movie_elements = soup.find_all('span', {'class': 'thumbnail-container'})
            for element in movie_elements:
                if element.get('title') == movie_title:
                    img = element.find('img', {'class': 'thumbnail-img'})
                    if img and 'data-src' in img.attrs:
                        poster_url = img['data-src']
                        # Convertir en haute qualité
                        poster_url = poster_url.replace('c_160_213', 'c_310_420')
                        logger.info(f"Affiche trouvée pour '{movie_title}': {poster_url}")
                        return poster_url
            
            logger.warning(f"Pas d'affiche trouvée pour '{movie_title}' sur la page du cinéma")
            return None
            
        except Exception as e:
            logger.error(f"Erreur lors de la recherche de l'affiche pour '{movie_title}': {e}")
            return None

    def get_seances_cinema(self, cinema_id, cinema_name):
        logger.info(f"Récupération des séances pour {cinema_name}")
        
        try:
            all_seances = []
            # Récupérer les séances pour aujourd'hui et les 6 prochains jours
            for i in range(7):
                current_date = (date.today() + timedelta(days=i)).strftime("%Y-%m-%d")
                logger.info(f"Requête API pour {cinema_name} (ID: {cinema_id}) à la date {current_date}")
                
                seances_data = self.api.get_showtime(cinema_id, current_date)
                
                if not seances_data:
                    logger.warning(f"Aucune donnée retournée par l'API pour {cinema_name} à la date {current_date}")
                    continue
                
                for movie in seances_data:
                    titre = movie.get('title', '')
                    
                    # On ne récupère l'affiche et le synopsis qu'une seule fois par film
                    if not any(s['titre'] == titre for s in all_seances):
                        # Chercher l'affiche sur la page du cinéma
                        poster_url = self.get_movie_poster_from_cinema_page(titre, cinema_id)
                        synopsis = ''
                        
                        # Si pas trouvé, essayer l'autre méthode
                        if not poster_url:
                            movie_details = self.get_movie_details(titre)
                            poster_url = movie_details.get('poster', '')
                            synopsis = movie_details.get('synopsis', '')
                        
                        logger.info(f"Film '{titre}' - URL de l'affiche: {poster_url}")
                    else:
                        # Réutiliser l'URL de l'affiche et le synopsis déjà trouvés
                        existing_seance = next(s for s in all_seances if s['titre'] == titre)
                        poster_url = existing_seance['poster']
                        synopsis = existing_seance.get('synopsis', '')

                    # Pour chaque séance du film
                    for seance in movie.get('showtimes', []):
                        try:
                            horaire = seance.get('startsAt')
                            version = seance.get('diffusionVersion', '')
                            
                            # Convertir le format de version
                            if version == 'ORIGINAL':
                                version = 'VO'
                            elif version in ['DUBBED', 'LOCAL']:
                                version = 'VF'
                            
                            dt = datetime.fromisoformat(horaire)
                            all_seances.append({
                                'titre': titre,
                                'heure': dt.strftime('%Hh%M'),
                                'jour': dt.replace(hour=0, minute=0, second=0, microsecond=0),
                                'cinema': cinema_name,
                                'version': version,
                                'duree': '',
                                'tags': [],
                                'poster': poster_url,
                                'synopsis': synopsis
                            })
                        except ValueError as e:
                            logger.error(f"Format d'horaire invalide {horaire}: {e}")
                
            logger.info(f"Nombre total de séances trouvées : {len(all_seances)}")

            # Ajouter après la boucle de récupération des séances
            missing_posters = set()
            for seance in all_seances:
                if not seance['poster']:
                    missing_posters.add(seance['titre'])

            if missing_posters:
                logger.warning(f"Films sans affiche pour {cinema_name}: {', '.join(missing_posters)}")

            return all_seances
            
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des séances : {str(e)}")
            logger.exception("Détails de l'erreur:")
            return []

    def get_seances(self, city: str = None):
        """
        Récupère les séances pour une ville spécifique ou toutes les villes.
        
        Args:
            city: 'paris', 'toulouse', ou None pour toutes les villes
        """
        try:
            seances = []
            
            # Support ancien format (rétrocompatibilité)
            if self._is_old_format():
                logger.info("Format ancien détecté (Toulouse uniquement)")
                for cinema_id, cinema_info in self.cinemas.items():
                    logger.info(f"Récupération des séances pour {cinema_info['name']} (ID: {cinema_info['id']})")
                    cinema_seances = self.get_seances_cinema(
                        cinema_info['id'], 
                        cinema_info['name']
                    )
                    logger.info(f"Nombre de séances trouvées pour {cinema_info['name']}: {len(cinema_seances)}")
                    
                    if len(cinema_seances) == 0:
                        logger.warning(f"⚠️ Aucune séance trouvée pour {cinema_info['name']} - Vérifiez l'ID: {cinema_info['id']}")
                    
                    for seance in cinema_seances:
                        seance['titre'] = self.clean_title(seance['titre'])
                        seance['city'] = 'toulouse'  # Valeur par défaut pour ancien format
                    seances.extend(cinema_seances)
            else:
                # Nouveau format multi-villes
                cities_to_process = [city] if city else self.cinemas.keys()
                
                for city_key in cities_to_process:
                    city_cinemas = self.cinemas.get(city_key, {})
                    if not city_cinemas:
                        logger.warning(f"Aucun cinéma trouvé pour la ville: {city_key}")
                        continue
                    
                    logger.info(f"Traitement de la ville: {city_key} ({len(city_cinemas)} cinémas)")
                    
                    for cinema_id, cinema_info in city_cinemas.items():
                        logger.info(f"Récupération des séances pour {cinema_info['name']} (ID: {cinema_info['id']})")
                        cinema_seances = self.get_seances_cinema(
                            cinema_info['id'], 
                            cinema_info['name']
                        )
                        logger.info(f"Nombre de séances trouvées pour {cinema_info['name']}: {len(cinema_seances)}")
                        
                        if len(cinema_seances) == 0:
                            logger.warning(f"⚠️ Aucune séance trouvée pour {cinema_info['name']} - Vérifiez l'ID: {cinema_info['id']}")
                        
                        # Ajouter le champ city à chaque séance
                        for seance in cinema_seances:
                            seance['titre'] = self.clean_title(seance['titre'])
                            seance['city'] = city_key
                        seances.extend(cinema_seances)
            
            # Résumé final
            logger.info("Résumé des séances par ville:")
            cities_summary = {}
            for seance in seances:
                city_name = seance.get('city', 'toulouse')
                if city_name not in cities_summary:
                    cities_summary[city_name] = 0
                cities_summary[city_name] += 1
            
            for city_name, count in cities_summary.items():
                logger.info(f"{city_name}: {count} séances")
            
            return seances
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des séances: {e}")
            logger.exception("Détails de l'erreur:")
            return []

    def save_to_json(self, filename='seances.json'):
        """Sauvegarde toutes les séances dans un fichier JSON"""
        seances = self.get_seances()
        
        # Convertir les dates en string pour le JSON
        for seance in seances:
            seance['jour'] = seance['jour'].isoformat()
        
        # Créer le répertoire parent si nécessaire
        os.makedirs(os.path.dirname(filename), exist_ok=True)
            
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(seances, f, ensure_ascii=False, indent=2)

    def get_seances_with_synopsis(self):
        """
        Récupère les séances et les synopsis des films
        """
        seances = self.get_seances()  # méthode existante
        
        # Garder une trace des synopsis déjà récupérés pour éviter les doublons
        synopsis_cache = {}
        
        # Pour chaque film, récupérer le synopsis et convertir les dates
        for seance in seances:
            # Convertir l'objet datetime en string pour la sérialisation JSON
            if isinstance(seance.get('jour'), datetime):
                seance['jour'] = seance['jour'].isoformat()
            
            titre = seance['titre']
            
            # Vérifier si on a déjà le synopsis pour ce film
            if titre in synopsis_cache:
                seance['synopsis'] = synopsis_cache[titre]
                continue
                
            # Essayer d'abord avec Allociné
            synopsis = ""
            film_id = seance.get('allocine_id')
            if film_id:
                synopsis = self.get_film_synopsis(film_id)
            
            # Si pas de synopsis sur Allociné, essayer avec TMDb
            if not synopsis or synopsis.isspace():
                logger.info(f"Recherche du synopsis sur TMDb pour : {titre}")
                tmdb_data = search_movie_tmdb(titre)
                if tmdb_data and tmdb_data.get('synopsis'):
                    synopsis = tmdb_data['synopsis']
                    logger.info(f"Synopsis trouvé sur TMDb pour : {titre}")
            
            # Sauvegarder le synopsis dans le cache et la séance
            synopsis_cache[titre] = synopsis
            seance['synopsis'] = synopsis
            
            # Petit délai pour éviter de surcharger les APIs
            time.sleep(0.2)
        
        return seances
    
    def get_film_synopsis(self, film_id):
        """
        Récupère le synopsis d'un film à partir de son ID Allociné
        """
        url = f"https://www.allocine.fr/film/fichefilm_gen_cfilm={film_id}.html"
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Recherche du synopsis dans la page
            synopsis_div = soup.find('div', class_='content-txt')
            if synopsis_div:
                return synopsis_div.text.strip()
            
        except Exception as e:
            logger.error(f"Erreur lors de la récupération du synopsis pour le film {film_id}: {e}")
        
        return ""