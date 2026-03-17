# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
pnpm dev      # Start development server on http://localhost:3000
pnpm build    # Production build
pnpm start    # Start production server
```

## Architecture

This is a **Next.js 16** PWA (Progressive Web App) using the App Router with TypeScript.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Database / Storage**: Supabase (`@supabase/supabase-js`)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/postcss`)

### Project Structure
```
src/
├── app/
│   ├── inscription/   # Member registration form
│   ├── me/            # Member space (home, layout with BottomNav)
│   └── layout.tsx     # Root layout with Geist fonts
├── components/
│   └── bottom-nav.tsx # Bottom navigation
└── lib/
    └── supabase.ts    # Supabase client (anon key)
```

### Path Aliases
- `@/*` maps to `./src/*`

### Supabase
- Client: `import { supabase } from "@/lib/supabase"`
- Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### Database Schema

#### Table `membres`
| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK, default `gen_random_uuid()` |
| `nom` | text | Required, stored uppercase |
| `prenoms` | text | Required |
| `email` | text | Unique, required |
| `telephone` | text | Optional, includes country code |
| `profession` | text | Required |
| `linkedin_url` | text | Optional |
| `photo_url` | text | Optional, Supabase Storage URL |
| `statut` | text | Default `'en_attente'` |
| `created_at` | timestamptz | Default `now()` |

#### Storage bucket
- `membres-photos` — public bucket for member profile photos

## Environment Variables

Required environment variables (see `.env`):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Supabase anon/publishable key
