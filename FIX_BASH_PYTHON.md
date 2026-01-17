# Fix du problème Python dans Bash

## Problème

Dans Git Bash, la commande `python` pointe vers Python312 qui n'existe pas :
```
bash: /c/Users/tassa/AppData/Local/Programs/Python/Python312/python.exe: No such file or directory
```

Mais Python 3.11.9 est installé et fonctionne dans PowerShell.

## Solutions

### Option 1 : Utiliser PowerShell (Recommandé)

Les scripts fonctionnent parfaitement dans PowerShell :

```powershell
python scripts/test_scraper.py toulouse
python scripts/update_seances.py
```

### Option 2 : Corriger le chemin dans Bash

1. Vérifier où se trouve Python :
```bash
which python3
# ou
ls /c/Users/tassa/AppData/Local/Programs/Python/
```

2. Créer un alias dans `~/.bashrc` :
```bash
alias python='/c/Users/tassa/AppData/Local/Programs/Python/Python311/python.exe'
alias python3='/c/Users/tassa/AppData/Local/Programs/Python/Python311/python.exe'
```

3. Recharger la configuration :
```bash
source ~/.bashrc
```

### Option 3 : Utiliser python3 directement

Si `python3` fonctionne dans bash :
```bash
python3 scripts/test_scraper.py toulouse
```

## Test réussi

Le scraper a été testé avec succès :
- ✅ 398 séances récupérées pour Toulouse
- ✅ Tous les champs requis présents
- ✅ 6 cinémas fonctionnels
