<div align="center">

# Hen Heang — Developer Portfolio

**Java & Spring Boot Full-Stack Developer · Seoul, South Korea 🇰🇷**

Building enterprise web applications with Java, Spring Boot, MyBatis, and PostgreSQL on the backend, and Next.js + TypeScript on the frontend.

[**🌐 Live Site**](https://henheang.site) · [**📄 CV**](https://henheang.site/cv) · [**💼 LinkedIn**](https://www.linkedin.com/in/hen-heang) · [**💬 Telegram**](https://t.me/henheang)

![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

</div>

---

## 👋 About Me

I'm a full-stack developer with 2+ years of experience in the Korean enterprise sector — currently at **Bizplay** in Seoul, previously at **KOSIGN**, where I built B2B FinTech platforms (billing, payments, inventory). My day-to-day stack is Java, Spring Boot, MyBatis, and PostgreSQL/Oracle on the backend, with Next.js and TypeScript on the frontend.

- 🌏 Cambodia → Korea: trained at the Korea Software HRD Center, now working in Korean-language enterprise teams
- 🗣️ Khmer (native) · English (professional) · Korean (intermediate)
- 📫 Reach me at **henheang15@gmail.com**

## ✨ What's in This Portfolio

This site is not just a project list — each major project is a full **engineering case study**:

- **Business problem → solution** narrative for every project
- **Architecture flow** (e.g. Next.js → Spring Boot → MyBatis → PostgreSQL) rendered per project
- **Database design** — core tables and data models
- **API showcase** — real endpoint examples with methods and descriptions
- **Challenges & solutions** and **lessons learned** for each build
- Interactive CV page with print-perfect **PDF download**
- Dark/light theme, per-page SEO metadata, dynamic Open Graph images, sitemap and robots
- Contact form backed by Supabase (server actions, no exposed write API)

## 🚀 Featured Projects

| Project | What it is | Stack |
|---------|-----------|-------|
| [**Hengo**](https://henheang.site/projects/hengo) ⭐ | AI companion for daily growth — goals, daily missions, and Korean learning with an AI coach and spaced repetition | Next.js, TypeScript, TanStack Query, Spring Boot |
| [**H-Phsar**](https://henheang.site/projects/h-phsar) ⭐ | Cambodian B2B marketplace API — distributor/retailer stores, order state machine, OTP auth, real-time notifications | Spring Boot 3, MyBatis, PostgreSQL, WebSocket |
| [**Money Flow**](https://henheang.site/projects/money-flow) | Personal finance PWA with budgets, savings goals, AI chat, and push alerts — Supabase with a daily Neon backup | Next.js, Supabase, Google Gemini |
| [**We Commerce**](https://henheang.site/projects/we-commerce) | Full-stack multi-vendor marketplace — DB-tracked JWT auth, cart/checkout with simulated ABA Pay & KHQR | Spring Boot 3, Java 21, Next.js, TanStack Query |

## 🛠️ Tech Stack

**This site:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Supabase · Vercel Analytics & Speed Insights

**What I work with professionally:** Java · Spring Boot · Spring Security · MyBatis · PostgreSQL · Oracle · Redis · eGovFramework · Next.js · TypeScript

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── about/            # About page (experience, education, skills)
│   ├── projects/         # Project list + [slug] case-study pages
│   ├── contact/          # Contact form (Supabase server actions)
│   ├── cv/               # Interactive CV with PDF download
│   ├── sitemap.ts        # Generated sitemap
│   └── opengraph-image.tsx
├── data/                 # Single source of truth for all content
│   ├── profile.ts        # Personal info, links, languages
│   ├── projects.ts       # Project case studies (architecture, APIs, ERD)
│   ├── experience.ts     # Work history
│   └── cv-data.ts        # CV content
├── src/
│   ├── components/       # UI components (sections, dashboard, cv, ui)
│   └── lib/              # Types, Supabase clients, utilities
└── public/               # Images, project previews, CV PDF
```

All content lives in `data/` — updating the portfolio means editing typed data files, not JSX.

## 🏁 Getting Started

```bash
# Clone and install
git clone https://github.com/Hen-Heang/hen-heang-porfolio.git
cd hen-heang-porfolio
npm install

# Run the dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local` and fill in what you need — see that file for the full list. None are required to run the site:

- **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`/`_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) — optional. Profile/dashboard/CV/projects/skills/experience/education/achievements are all served from Supabase when configured, and automatically fall back to the typed data in `data/*.ts` when it's absent or a query fails — the public site never renders empty because of a Supabase outage. The contact form specifically needs the service-role key to accept submissions.
- **`OPENAI_API_KEY`** / `OPENAI_MODEL` — optional. Without it the AI assistant returns a graceful "not configured" message.
- **`UPSTASH_REDIS_REST_URL`** / `_TOKEN` — optional. Rate limiting (AI chat + contact form) uses Upstash Redis when configured, which is required for correctness across Vercel's multiple serverless instances; without it, both fall back to an in-memory limiter that's fine for local dev only.

### Content workflow

Public content (profile, dashboard, CV, projects, skills, experience, education, achievements, contact messages) is editable at `/admin` by the owner account (gated by Supabase RLS + an email check). Admin-entered JSON is validated against the same Zod schemas (`src/lib/schemas/content.ts`) the public site uses before it's saved, so malformed content can't reach — or break — the live pages. Editing the static files in `data/*.ts` changes only the fallback shown when Supabase is unavailable.

### Testing

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm run test        # Vitest unit tests
npm run test:watch  # Vitest in watch mode
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, test, and build on every push/PR to `master`.

### Theme

Dark and light themes are both fully supported (`next-themes`), defaulting to dark. Toggle from the header (desktop) or the mobile dock.

## ☁️ Deployment

Deployed on [Vercel](https://vercel.com) with automatic deployments from `master`. Push to deploy:

```bash
npm run build   # verify the production build locally
git push
```

## 📬 Contact

- **Email:** [henheang15@gmail.com](mailto:henheang15@gmail.com)
- **LinkedIn:** [linkedin.com/in/hen-heang](https://www.linkedin.com/in/hen-heang)
- **GitHub:** [github.com/Hen-Heang](https://github.com/Hen-Heang)
- **Telegram:** [t.me/henheang](https://t.me/henheang)

---

<div align="center">
Open to Java / Spring Boot / Full-Stack opportunities · Based in Seoul 🇰🇷
</div>

<!--
Note: the GitHub repository is currently named `hen-heang-porfolio` (typo).
Recommended rename: `hen-heang-portfolio`. Renaming on GitHub automatically
sets up a redirect from the old name, but any hardcoded references to
`hen-heang-porfolio` in CI badges, deployment configs, or external links
should be updated afterward.
-->
