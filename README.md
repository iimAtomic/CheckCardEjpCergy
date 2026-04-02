# CheckCardEjpCergy

Application web mobile-first en HTML/CSS/JS avec serveur Node:

- `index.html` : page d'accueil avec QR code
- `card.html` : carte qui affiche automatiquement un verset
- `verses.json` : liste des versets
- `fond.png` : image de fond de la carte
- `server.js` : serveur Node (fichiers statiques + API versets uniques)

## Personnaliser les versets

Edite `verses.json` avec ce format:

```json
[
  { "reference": "Jean 3:16", "text": "..." },
  { "reference": "Psaume 23:1", "text": "..." }
]
```

## Lancer en local (Node)

```bash
npm start
```

Puis ouvre `http://localhost:3000`.

## API

- `GET /api/verse`
- Retourne un verset unique a chaque appel (pas de doublon tant que la liste n'est pas epuisee)
- Quand tous les versets ont ete servis, la pile est melangee et recommence

## Deploiement Vercel

1. Importer ce dossier dans Vercel
2. Framework Preset: `Other`
3. Build Command: vide
4. Output Directory: vide
5. Deploy
