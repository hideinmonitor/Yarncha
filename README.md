# Yarncha

Yarncha is a local-first project tracker and toolkit for knitters, crocheters, and other yarn-craft makers.

## Development

```bash
npm install
npm run dev
```

The application root is this repository root. Do not place another Yarncha application folder inside the repository.

## Vercel

- Framework preset: `Vite`
- Root Directory: leave blank (`.` / repository root)
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The production environment also needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` when cloud features are enabled.
