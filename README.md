## Avada-like Drag-and-Drop Site Builder

Monorepo with `client` (Next.js + Tailwind) and `server` (Express + JWT + uploads). Build pages with a drag-and-drop UI and render them dynamically by slug.

### Quick start

1. Copy env files:
   - `cp server/.env.example server/.env`
   - `cp client/.env.local.example client/.env.local`
2. Install deps:
   - `npm install` (installs root dev deps only)
   - `npm --prefix server install`
   - `npm --prefix client install`
3. Run dev:
   - `npm run dev`

Server: http://localhost:4000
Client: http://localhost:3000

Default admin: `admin@local` / `admin123`

### Features
- Drag-and-drop page builder (blocks palette, canvas, inspector)
- Dynamic page rendering by slug (e.g., `/about`)
- Media uploads with previews
- JWT auth via HTTP-only cookies
- Themeable UI via Tailwind and CSS variables
