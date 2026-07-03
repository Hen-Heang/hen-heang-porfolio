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
| [**KoriAI**](https://henheang.site/projects/koriai) ⭐ | Korean learning platform with an AI tutor, grammar correction, and spaced-repetition vocabulary | Next.js, TypeScript, OpenAI API |
| [**Warehouse Master**](https://henheang.site/projects/warehouse-master) | B2B inventory system with hierarchical RBAC and concurrent stock control | Spring Boot, Spring Security + JWT, Redis |
| [**Money Flow**](https://henheang.site/projects/money-flow) | Personal finance tracker with multi-currency support and SQL-side aggregations | Next.js, Auth.js, PostgreSQL |
| [**Dev Notes**](https://henheang.site/projects/enterprise-learning-hub) | Documentation site for Korean enterprise patterns: eGovFramework, MyBatis, SQL tuning | Next.js, MDX |

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

The contact form needs Supabase credentials in `.env.local` (everything else works without them):

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

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
