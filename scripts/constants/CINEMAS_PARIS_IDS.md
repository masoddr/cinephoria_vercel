# IDs Allociné pour les cinémas Paris

⚠️ **IMPORTANT** : Les IDs ci-dessous sont des exemples et doivent être vérifiés.

## Comment trouver un ID Allociné

1. Utiliser le script d'aide :
   ```bash
   python scripts/helpers/find_cinema_id.py "Nom du cinéma" "Paris"
   ```

2. Méthode manuelle :
   - Aller sur Allociné et chercher le cinéma
   - Ouvrir la page du cinéma
   - L'ID se trouve dans l'URL : `https://www.allocine.fr/seance/salle_gen_csalle={ID}.html`
   - Tester l'ID avec l'API : `https://www.allocine.fr/_/showtimes/theater-{ID}/d-2025-01-15/p-1/`

## Cinémas Paris à configurer

Les IDs suivants dans `cinemas.py` doivent être vérifiés et mis à jour :

- UGC Les Halles (P0001) - À vérifier
- Pathé Opéra (P0002) - À vérifier
- MK2 Bastille (P0003) - À vérifier
- UGC George V (P0004) - À vérifier
- Pathé Wepler (P0005) - À vérifier
- MK2 Quai de Seine (P0006) - À vérifier
- UGC Opéra (P0007) - À vérifier
- Le Grand Rex (P0008) - À vérifier
- Pathé Beaugrenelle (P0009) - À vérifier
- MK2 Nation (P0010) - À vérifier
- UGC Ciné Cité La Défense (P0011) - À vérifier
- Pathé La Villette (P0012) - À vérifier

## Exemple de recherche

```bash
python scripts/helpers/find_cinema_id.py "UGC Ciné Cité Les Halles" "Paris"
```
