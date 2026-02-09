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
- **Auth**: Better Auth with PostgreSQL (via `pg` pool)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/postcss`)
- **Database**: PostgreSQL (Supabase connection string)

### Project Structure
```
src/
├── app/           # Next.js App Router pages
│   ├── auth/      # Authentication pages (sign-in, sign-up, forgot password)
│   └── layout.tsx # Root layout with Geist fonts
├── api/
│   └── auth/[...all]/route.ts  # Better Auth API handler
└── lib/
    ├── auth.ts        # Server-side Better Auth config
    └── auth-client.ts # Client-side auth (React hooks)
```

### Path Aliases
- `@/*` maps to `./src/*`

### Authentication
- Better Auth configured with email/password + social providers (Google, LinkedIn)
- Server auth: `import { auth } from "@/lib/auth"`
- Client auth: `import { authClient } from "@/lib/auth-client"`
- Auth API routes handled via catch-all route at `/api/auth/[...all]`

### User Model (Additional Fields)
Extended user schema with `user.additionalFields`:
| Field | Type | Default | Input | Description |
|-------|------|---------|-------|-------------|
| `numero` | string | `""` | true | Numéro de téléphone |
| `profession` | string | `""` | true | Profession de l'utilisateur |
| `linkedinUrl` | string | `""` | true | Lien vers le profil LinkedIn |
| `role` | string | `"user"` | false | Rôle (non modifiable à l'inscription) |

## Environment Variables

Required environment variables (see `.env`):
- `NEXT_PUBLIC_SUPABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` - Google OAuth
- `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth
