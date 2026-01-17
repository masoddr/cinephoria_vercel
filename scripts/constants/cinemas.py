"""
Constantes pour les cinémas de Paris et Toulouse
Format:
    'VILLE': {
        'CODE_CINEMA': {
            'id': 'ID_ALLOCINE',  # ID utilisé par Allociné
            'name': 'Nom Affiché',  # Nom qui sera affiché sur le site
            'district': 'Arrondissement/Quartier'  # Optionnel
        }
    }
"""

from .tarifs import TARIFS_CINEMA

CINEMAS = {
    'paris': {
        # IDs validés et fonctionnels
        'MK2_BASTILLE': {
            'id': 'P0003',
            'name': 'MK2 Bastille',
            'district': '11e arrondissement'
        },
        'PATHÉ_WEPLER': {
            'id': 'P0005',
            'name': 'Pathé Wepler',
            'district': '18e arrondissement'
        },
        'MK2_QUAI_DE_SEINE': {
            'id': 'P0006',
            'name': 'MK2 Quai de Seine',
            'district': '19e arrondissement'
        },
        'PATHÉ_BEAUGRENELLE': {
            'id': 'P0009',
            'name': 'Pathé Beaugrenelle',
            'district': '15e arrondissement'
        },
        # Cinémas indépendants de Paris - IDs à trouver (utiliser find_cinema_id.py)
        'L_ARCHIPEL': {
            'id': None,  # À trouver
            'name': "L'Archipel",
            'district': 'Paris'
        },
        'L_ARLEQUIN': {
            'id': None,  # À trouver
            'name': "L'Arlequin",
            'district': 'Paris'
        },
        'LE_BALZAC': {
            'id': None,  # À trouver
            'name': 'Le Balzac',
            'district': 'Paris'
        },
        'LE_BRADY': {
            'id': None,  # À trouver
            'name': 'Le Brady',
            'district': 'Paris'
        },
        'LE_CHAMPO': {
            'id': None,  # À trouver
            'name': 'Le Champo - Espace Jacques-Tati',
            'district': 'Paris'
        },
        'CHRISTINE_CINEMA_CLUB': {
            'id': None,  # À trouver
            'name': 'Christine Cinéma Club',
            'district': 'Paris'
        },
        'CINEMA_DU_PANTHEON': {
            'id': None,  # À trouver
            'name': 'Cinéma du Panthéon',
            'district': 'Paris'
        },
        'LE_MAC_MAHON': {
            'id': None,  # À trouver
            'name': 'Le Mac Mahon',
            'district': 'Paris'
        },
        'LA_CLEF': {
            'id': None,  # À trouver
            'name': 'La Clef',
            'district': 'Paris'
        },
        'DULAC_CINEMAS': {
            'id': None,  # À trouver
            'name': 'Dulac Cinémas',
            'district': 'Paris'
        },
        'ECOLES_CINEMA_CLUB': {
            'id': None,  # À trouver
            'name': 'Écoles Cinéma Club',
            'district': 'Paris'
        },
        'L_ENTREPOT': {
            'id': None,  # À trouver
            'name': "L'Entrepôt",
            'district': 'Paris'
        },
        'L_EPEE_DE_BOIS': {
            'id': None,  # À trouver
            'name': "L'Épée de bois",
            'district': 'Paris'
        },
        'L_ESCURIAL': {
            'id': None,  # À trouver
            'name': "L'Escurial",
            'district': 'Paris'
        },
        'ESPACE_SAINT_MICHEL': {
            'id': None,  # À trouver
            'name': 'Espace Saint-Michel',
            'district': 'Paris'
        },
        'LA_FILMOTHEQUE_DU_QUARTIER_LATIN': {
            'id': None,  # À trouver
            'name': 'La Filmothèque du Quartier latin',
            'district': 'Paris'
        },
        'GRAND_ACTION': {
            'id': None,  # À trouver
            'name': 'Grand Action',
            'district': 'Paris'
        },
        'LE_LOUXOR': {
            'id': None,  # À trouver
            'name': 'Le Louxor',
            'district': 'Paris'
        },
        'LUCERNAIRE': {
            'id': None,  # À trouver
            'name': 'Lucernaire',
            'district': 'Paris'
        },
        'LUMINOR_HOTEL_DE_VILLE': {
            'id': None,  # À trouver
            'name': 'Luminor Hôtel de Ville',
            'district': 'Paris'
        },
        'MAJESTIC_BASTILLE': {
            'id': None,  # À trouver
            'name': 'Majestic Bastille',
            'district': 'Paris'
        },
        'MAJESTIC_PASSY': {
            'id': None,  # À trouver
            'name': 'Majestic Passy',
            'district': 'Paris'
        },
        'MAX_LINDER_PANORAMA': {
            'id': None,  # À trouver
            'name': 'Max Linder Panorama',
            'district': 'Paris'
        },
        'MISTRAL': {
            'id': None,  # À trouver
            'name': 'Mistral',
            'district': 'Paris'
        },
        'MK2_BASTILLE_BEAUMARCHAIS': {
            'id': None,  # À trouver
            'name': 'MK2 Bastille (côté Beaumarchais)',
            'district': 'Paris'
        },
        'MK2_BASTILLE_FAUBOURG_SAINT_ANTOINE': {
            'id': None,  # À trouver
            'name': 'MK2 Bastille (côté Faubourg Saint-Antoine)',
            'district': 'Paris'
        },
        'MK2_BEAUBOURG': {
            'id': None,  # À trouver
            'name': 'MK2 Beaubourg',
            'district': 'Paris'
        },
        'MK2_ODEON_SAINT_MICHEL': {
            'id': None,  # À trouver
            'name': 'MK2 Odéon (côté Saint-Michel)',
            'district': 'Paris'
        },
        'MK2_PARNASSE': {
            'id': None,  # À trouver
            'name': 'MK2 Parnasse',
            'district': 'Paris'
        },
        'NOUVEL_ODEON': {
            'id': None,  # À trouver
            'name': 'Nouvel Odéon',
            'district': 'Paris'
        },
        'LA_PAGODE': {
            'id': None,  # À trouver
            'name': 'La Pagode',
            'district': 'Paris'
        },
        'REFLET_MEDICIS': {
            'id': None,  # À trouver
            'name': 'Reflet Médicis',
            'district': 'Paris'
        },
        'SAINT_ANDRE_DES_ARTS': {
            'id': None,  # À trouver
            'name': 'Saint-André-des-Arts',
            'district': 'Paris'
        },
        'SEPT_PARNASSIENS': {
            'id': None,  # À trouver
            'name': 'Sept Parnassiens',
            'district': 'Paris'
        },
        'STUDIO_28': {
            'id': None,  # À trouver
            'name': 'Studio 28',
            'district': 'Paris'
        },
        'STUDIO_DES_URSULINES': {
            'id': None,  # À trouver
            'name': 'Studio des Ursulines',
            'district': 'Paris'
        },
        'STUDIO_GALANDE': {
            'id': None,  # À trouver
            'name': 'Studio Galande',
            'district': 'Paris'
        },
        'LES_3_LUXEMBOURG': {
            'id': None,  # À trouver
            'name': 'Les 3 Luxembourg',
            'district': 'Paris'
        },
        # IDs à trouver/corriger (utiliser find_cinema_id.py)
        # 'UGC_LES_HALLES': {
        #     'id': 'P0001',  # ❌ Invalide
        #     'name': 'UGC Ciné Cité Les Halles',
        #     'district': '1er arrondissement'
        # },
        # 'PATHÉ_OPÉRA': {
        #     'id': 'P0002',  # ❌ Invalide
        #     'name': 'Pathé Opéra',
        #     'district': '9e arrondissement'
        # },
        # 'UGC_GEORGE_V': {
        #     'id': 'P0004',  # ❌ Invalide
        #     'name': 'UGC George V',
        #     'district': '8e arrondissement'
        # },
        # 'UGC_OPÉRA': {
        #     'id': 'P0007',  # ❌ Pas de résultats
        #     'name': 'UGC Opéra',
        #     'district': '9e arrondissement'
        # },
        # 'LE_GRAND_REX': {
        #     'id': 'P0008',  # ❌ Invalide
        #     'name': 'Le Grand Rex',
        #     'district': '2e arrondissement'
        # },
        # 'MK2_NATION': {
        #     'id': 'P0010',  # ❌ Invalide
        #     'name': 'MK2 Nation',
        #     'district': '12e arrondissement'
        # },
        # 'UGC_CINÉ_CITÉ_LA_DÉFENSE': {
        #     'id': 'P0011',  # ❌ Invalide
        #     'name': 'UGC Ciné Cité La Défense',
        #     'district': 'La Défense'
        # },
        # 'PATHÉ_LA_VILLETTE': {
        #     'id': 'P0012',  # ❌ Pas de résultats
        #     'name': 'Pathé La Villette',
        #     'district': '19e arrondissement'
        # },
    },
    'toulouse': {
        'ABC': {
            'id': 'P0071',
            'name': 'ABC'
        },
        'AMERICAN_COSMOGRAPH': {
            'id': 'P0235',
            'name': 'American Cosmograph'
        },
        'UTOPIA_BORDEROUGE': {
            'id': 'W3120',
            'name': 'Utopia Borderouge'
        },
        'CRATERE': {
            'id': 'P0056',
            'name': 'Le cratère'
        },
        'PATHE_WILSON': {  # TODO: problème avec le pathé wilson
            'id': 'P0057',
            'name': 'Pathé Wilson'
        },
        'UGC_MONTAUDRAN': {
            'id': 'W3140',
            'name': 'UGC Montaudran'
        }
    }
}