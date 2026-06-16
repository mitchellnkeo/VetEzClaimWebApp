# VetEZ Claim — Web App (`frontend-web`)

Next.js web application (login, VA forms, donate, calculators). Deploy to Vercel; point **`app.vetezclaim.com`** via DNS when ready.

## Local development

```bash
npm install
cp .env.example .env.local   # or use existing .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (personal GitHub)

### 1. Push to your personal repo

If you created an empty repo on GitHub (e.g. `mitchellnkeo/frontend-web`):

```bash
cd frontend-web

# Keep org remote as backup (optional)
git remote rename origin vetezclaim-org

# Replace REPO_NAME with your personal repo name
git remote add origin https://github.com/mitchellnkeo/REPO_NAME.git

# Push production branch (Vercel can use branch "production" in project settings)
git push -u origin production

# Or push as main if your Vercel project expects main:
# git push -u origin production:main
```

### 2. Import in Vercel

1. [vercel.com/new](https://vercel.com/new) → Import your personal repo
2. Framework: **Next.js** (auto-detected)
3. **Production Branch:** `production` (or `main` if you pushed that way)
4. Add **all** environment variables below (Production + Preview)
5. Deploy

### 3. Environment variables (required in Vercel)

Copy from `.env.example` / your local `.env`. Names must match exactly — this app uses `publicRuntimeConfig` in `next.config.js`.

```bash
BASE_API_URL=https://api.vetezclaim.com/api/

API_KEY=
AUTH_DOMAIN=vetez-53126.firebaseapp.com
PROJECT_ID=vetez-53126
STORAGE_BUCKET=vetez-53126.appspot.com
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=

ACCESS_ID=
ACCESS_PASSWORD=

NEXT_PUBLIC_ZEFFY_DONATION_FORM_URL=https://www.zeffy.com/en-US/donation-form/suppourt-assisting-veterans
NEXT_PUBLIC_ZEFFY_EMBED_FORM_URL=https://www.zeffy.com/embed/donation-form/suppourt-assisting-veterans?modal=true
```

Redeploy after changing env vars (they are baked in at build time).

### 4. Firebase

Firebase Console → **Authentication** → **Settings** → **Authorized domains**:

- `your-project.vercel.app`
- `app.vetezclaim.com` (when custom domain is live)

### 5. Custom domain `app.vetezclaim.com`

1. Vercel → Project → **Settings** → **Domains** → add `app.vetezclaim.com`
2. Update DNS (Google Domains / Cloudflare): change `app` CNAME from  
   `frontend-web-qbdpk.ondigitalocean.app` → Vercel’s CNAME target
3. Wait for SSL, then smoke-test `/login` and `/subscription`

See also [WEB-DEPLOY-GUIDE.md](../WEB-DEPLOY-GUIDE.md) in the monorepo root.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (same as Vercel) |
| `npm run start` | Run production build locally |

## Notes

- **API** stays at `https://api.vetezclaim.com` — no need to move API for web deploy
- **DigitalOcean** frontend app can remain until DNS is switched; no DO login required for cutover
- Org repo `VetEzClaim/frontend-web` can stay as upstream (`vetezclaim-org` remote)
