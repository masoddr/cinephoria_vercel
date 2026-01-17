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