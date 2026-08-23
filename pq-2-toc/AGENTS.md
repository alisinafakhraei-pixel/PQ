<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project context

This repo is a hub of interactive prototypes for Formaloo product ideas (one per Linear PQ issue), built with shadcn + the Formaloo design system. Each issue gets a card on the home page (`app/page.tsx`, registered in `lib/issues.ts`) linking to `/{issue-slug}/{number}`, which renders that issue's demo (branched in `app/[slug]/[number]/page.tsx`).

**Reuse before rebuilding.** Shared, cross-prototype UI lives in `components/shared/` and `lib/field-types.ts` (field kind icons/labels, etc.) — pull from there first. Prototype-specific components live in their own folder (e.g. `components/magic-id/`, `components/logic/`). When a new prototype needs something a past one already built (field list rows, an icon set, a settings-panel shell, a toast pattern), reuse or extend the existing component instead of re-implementing it, and promote it to `components/shared/` if a second prototype needs it too. The component library should get better and more complete with each new demo, not get rebuilt from scratch each time.
