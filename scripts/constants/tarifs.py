TARIFS_CINEMA = {
    "AMERICAN_COSMOGRAPH": {
        "normal": 8.00,
        "carnet": {
            "prix": 55.00,
            "nombre_places": 10,
            "description": "Carnet non-nominatif, valable éternellement au Cosmo et dans tous les Utopia"
        },
        "reduit": {
            "prix": 4.50,
            "conditions": [
                "moins de 14 ans",
                "mercredi toute la journée",
                "séances avant 13h tous les jours",
                "séances après 21h mardi et jeudi"
            ]
        }
    },
    "ABC": {
        "normal": 8.00,
        "reduit": {
            "prix": 6.00,
            "conditions": [
                "moins de 26 ans",
                "chômeurs",
                "invalides",
                "RSA",
                "carte Toulouse Culture"
            ]
        },
        "moins_14_ans": 4.50,
        "mercredi_dimanche_matin": 4.50,
        "accompagnant_moins_14_ans": 6.00
    },
    "UTOPIA_BORDEROUGE": {
        "normal": 8.00,
        "carnet": {
            "prix": 55.00,
            "nombre_places": 10,
            "description": "Places non nominatives, valables dans tous les Utopia"
        },
        "premiere_seance": 4.50
    },
    "PATHE_WILSON": {
        "normal": 15.60,
        "moins_14_ans": 7.90,
        "etudiant_scolaire": 11.30
    },
    "UGC_MONTAUDRAN": {
        "normal": 12.20,
        "avant_12h": 8.20,
        "moins_26_ans": 7.80,
        "etudiant_apprenti": 7.80
    }
}
