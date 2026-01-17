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
        # Cinémas indépendants de Paris
        'L_ARCHIPEL': {
            'id': 'C0134',
            'name': "L'Archipel",
            'district': 'Paris'
        },
        'L_ARLEQUIN': {
            'id': 'C0054',
            'name': "L'Arlequin",
            'district': 'Paris'
        },
        'LE_BALZAC': {
            'id': 'C0009',
            'name': 'Le Balzac',
            'district': 'Paris'
        },
        'LE_BRADY': {
            'id': 'C0023',
            'name': 'Le Brady',
            'district': 'Paris'
        },
        'LE_CHAMPO': {
            'id': None,  # À trouver
            'name': 'Le Champo - Espace Jacques-Tati',
            'district': 'Paris'
        },
        'CHRISTINE_CINEMA_CLUB': {
            'id': 'C0015',
            'name': 'Christine Cinéma Club',
            'district': 'Paris'
        },
        'CINEMA_DU_PANTHEON': {
            'id': 'C0076',
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
            'id': 'C0071',
            'name': 'Écoles Cinéma Club',
            'district': 'Paris'
        },
        'L_ENTREPOT': {
            'id': 'C0005',
            'name': "L'Entrepôt",
            'district': 'Paris'
        },
        'L_EPEE_DE_BOIS': {
            'id': 'W7504',
            'name': "L'Épée de bois",
            'district': 'Paris'
        },
        'L_ESCURIAL': {
            'id': 'C0147',
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
            'id': 'C0072',
            'name': 'Grand Action',
            'district': 'Paris'
        },
        'LE_LOUXOR': {
            'id': 'W7510',
            'name': 'Le Louxor',
            'district': 'Paris'
        },
        'LUCERNAIRE': {
            'id': 'C0093',
            'name': 'Lucernaire',
            'district': 'Paris'
        },
        'LUMINOR_HOTEL_DE_VILLE': {
            'id': 'C0013',
            'name': 'Luminor Hôtel de Ville',
            'district': 'Paris'
        },
        'MAJESTIC_BASTILLE': {
            'id': 'C0139',
            'name': 'Majestic Bastille',
            'district': 'Paris'
        },
        'MAJESTIC_PASSY': {
            'id': 'C0120',
            'name': 'Majestic Passy',
            'district': 'Paris'
        },
        'MAX_LINDER_PANORAMA': {
            'id': 'C0089',
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
            'id': 'C0041',
            'name': 'Nouvel Odéon',
            'district': 'Paris'
        },
        'LA_PAGODE': {
            'id': None,  # À trouver
            'name': 'La Pagode',
            'district': 'Paris'
        },
        'REFLET_MEDICIS': {
            'id': 'C0074',
            'name': 'Reflet Médicis',
            'district': 'Paris'
        },
        'SAINT_ANDRE_DES_ARTS': {
            'id': 'C0100',
            'name': 'Saint-André-des-Arts',
            'district': 'Paris'
        },
        'SEPT_PARNASSIENS': {
            'id': 'C0025',
            'name': 'Sept Parnassiens',
            'district': 'Paris'
        },
        'STUDIO_28': {
            'id': 'C0061',
            'name': 'Studio 28',
            'district': 'Paris'
        },
        'STUDIO_DES_URSULINES': {
            'id': 'C0083',
            'name': 'Studio des Ursulines',
            'district': 'Paris'
        },
        'STUDIO_GALANDE': {
            'id': 'C0016',
            'name': 'Studio Galande',
            'district': 'Paris'
        },
        'LES_3_LUXEMBOURG': {
            'id': 'C0095',
            'name': 'Les 3 Luxembourg',
            'district': 'Paris'
        },
        'JEU_DE_PAUME': {
            'id': 'W7588',
            'name': 'Jeu de Paume',
            'district': 'Paris'
        },
        'LES_ELYSEES_LINCOLN': {
            'id': 'C0108',
            'name': 'Les Elysées Lincoln',
            'district': 'Paris'
        },
        'CINEMA_DES_CINEASTES': {
            'id': 'C0004',
            'name': 'Cinéma des Cinéastes',
            'district': 'Paris'
        },
        'CLUB_DE_L_ETOILE': {
            'id': 'W7517',
            'name': "Club de l'Étoile",
            'district': 'Paris'
        },
        'LES_5_CAUMARTIN': {
            'id': 'C0012',
            'name': 'Les 5 Caumartin',
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