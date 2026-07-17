# Backend Engineering content authoring

The Backend Engineering Lab is a static, typed curriculum. It does not require Supabase. Importing `data/lab/backend/index.ts` parses the complete catalog and 13-level roadmap with Zod, so invalid content fails tests and `next build`.

## Files

- `index.ts` assembles the catalog, validates it, and defines published navigation order.
- `planned.ts` stores metadata-only future topics.
- `roadmap.ts` defines Levels 0–12 and their related catalog items.
- `items/*.ts` contains published narrative, lab, checklist, interview, and case-study bodies.
- `sources.ts` is the shared source registry. Each source has a title, publisher, type, HTTPS URL, and `accessedAt` date.
- `helpers.ts` creates the required section structure for narrative content.

## Add a planned topic

1. Add one `planned(...)` entry in `planned.ts` with a unique slug.
2. Choose a level from 0–12, a declared category, technologies, search keywords, prerequisites, learning objectives, difficulty, and at least one source.
3. Reference only catalog IDs that already exist. Do not self-reference or depend on an item from a later level.
4. Add the item ID to the appropriate roadmap level when it represents a primary topic for that level.
5. Run `npm run test`, `npm run typecheck`, and `npm run build`.

Planned entries are searchable and visible on the roadmap. They do not have article-body fields, are excluded from `backendPublishedOrder`, `generateStaticParams`, and the sitemap, and direct detail URLs return 404.

## Promote a topic to published

1. Move the entry from `planned.ts` to the appropriate `items/*.ts` file.
2. Choose the correct published shape:
   - Narrative: concept, guide, article, system, or case study.
   - Lab: overview sections plus at least three milestones with tasks, acceptance criteria, tests, risks, and production notes.
   - Checklist: introduction, grouped evidence checks, and release-decision rules.
   - Interview: introduction and at least eight structured questions.
3. Add the item ID to `backendPublishedOrder` at its intended previous/next navigation position.
4. Confirm its roadmap level references the item at the same progression level.
5. Check related and prerequisite links, metadata, JSON-LD type, and local progress behavior.
6. Run every quality gate documented in the root README.

## Required narrative sections

Every published narrative must contain these IDs: `what-it-is`, `why-it-matters`, `how-it-works`, `simple-example`, `backend-example`, `production-example`, `common-mistakes`, `best-practices`, `trade-offs`, `interview-questions`, `hands-on-task`, `related-topics`, and `references`.

Use `createNarrativeSections(...)` so section IDs and ordering stay consistent. Diagrams require a meaningful `textAlternative`; tables require headers matching every row; code blocks require a language and substantive code.

## Source and version policy

- Prefer official specifications and product documentation; use references or papers when they are the primary source for a pattern or theory.
- Use HTTPS and a real `YYYY-MM-DD` accessed date.
- State exact example baselines in `versionScope` and separate Java 21 implementation examples from newer JDK notes.
- Avoid unsupported benchmark numbers, absolute performance claims, mutable production artifacts, and unqualified security claims.
- Keep all voucher, fintech, incident, and architecture scenarios fictional. Never include employer-confidential systems, data, credentials, or internal workflows.
