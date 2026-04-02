# CheckCardEjpCergy (Next.js)

Application web mobile-first avec:

- `/` : page QR code
- `/card` : carte verset automatique
- `/api/verse` : API verset
- `/api/fond` : image `fond.png`

## Personnaliser les versets

Edite `verses.json` avec ce format:

```json
[
  { "reference": "Jean 3:16", "text": "..." },
  { "reference": "Psaume 23:1", "text": "..." }
]
```

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvre `http://localhost:3000`.

## Deploiement Vercel

1. Importer le repo dans Vercel
2. Framework detecte automatiquement: `Next.js`
3. Deploy
