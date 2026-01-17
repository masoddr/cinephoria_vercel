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

### Cinémas multiplexes (IDs à vérifier)

- UGC Les Halles (P0001) - À vérifier
- Pathé Opéra (P0002) - À vérifier
- MK2 Bastille (P0003) - ✅ Validé
- UGC George V (P0004) - À vérifier
- Pathé Wepler (P0005) - ✅ Validé
- MK2 Quai de Seine (P0006) - ✅ Validé
- UGC Opéra (P0007) - À vérifier
- Le Grand Rex (P0008) - À vérifier
- Pathé Beaugrenelle (P0009) - ✅ Validé
- MK2 Nation (P0010) - À vérifier
- UGC Ciné Cité La Défense (P0011) - À vérifier
- Pathé La Villette (P0012) - À vérifier

### Cinémas indépendants de Paris (IDs à trouver)

**A**
- L'Archipel
- L'Arlequin

**B**
- Le Balzac
- Le Brady

**C**
- Le Champo - Espace Jacques-Tati
- Christine Cinéma Club
- Cinéma du Panthéon
- Le Mac Mahon
- La Clef

**D**
- Dulac Cinémas

**E**
- Écoles Cinéma Club
- L'Entrepôt
- L'Épée de bois
- L'Escurial
- Espace Saint-Michel

**F**
- La Filmothèque du Quartier latin

**G**
- Grand Action

**L**
- Le Louxor
- Lucernaire
- Luminor Hôtel de Ville

**M**
- Majestic Bastille
- Majestic Passy
- Max Linder Panorama
- Mistral
- MK2 Bastille (côté Beaumarchais)
- MK2 Bastille (côté Faubourg Saint-Antoine)
- MK2 Beaubourg
- MK2 Odéon (côté Saint-Michel)
- MK2 Parnasse

**N**
- Nouvel Odéon

**P**
- La Pagode

**R**
- Reflet Médicis

**S**
- Saint-André-des-Arts
- Sept Parnassiens
- Studio 28
- Studio des Ursulines
- Studio Galande

**T**
- Les 3 Luxembourg

## Exemple de recherche

```bash
python scripts/helpers/find_cinema_id.py "UGC Ciné Cité Les Halles" "Paris"
```
