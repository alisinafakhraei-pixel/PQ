# Formaloo PQ Prototypes

An interactive prototype hub for Formaloo product ideas. The home page (`/`) lists **Week** cards — `/week-1`, `/week-2`, etc. — each listing that week's prototypes, reachable at `/{issue-slug}/{number}`.

**Live:** https://pq.alisinafakhraei.site

See [AGENTS.md](./AGENTS.md) for how this repo is organized and — most importantly — the **reuse-before-rebuild** rule and a CSS gotcha worth reading before styling anything with inline `style`.

## Week 1 — live

| Issue | Prototype | Route |
| --- | --- | --- |
| [PQ-1](https://linear.app/formaloo/issue/PQ-1) | Magic ID — bulk-generate IDs for fields missing one | `/add-magic-id-generation-button-to-bulk-assign-ids-to-manually-created-fields/1` |
| [PQ-2](https://linear.app/formaloo/issue/PQ-2) | Table of contents sidebar for 1QAT & paginated forms | `/add-table-of-contents-sidebar-to-one-question-at-a-time-and-paginated-forms/2` |
| [PQ-6](https://linear.app/formaloo/issue/PQ-6) | "Add field" button in Advanced Logic, with a top-vs-per-question toggle | `/add-add-field-button-directly-in-the-logic-page/6` |
| [PQ-7](https://linear.app/formaloo/issue/PQ-7) | "Connect your forms" in the answer-piping dropdown | `/add-form-fields-to-the-answer-piping-dropdown-in-email-templates/7` |
| [PQ-13](https://linear.app/formaloo/issue/PQ-13) | Full formula editor for calculated fields | `/add-a-full-formula-editor-for-calculated-fields/13` |
| [PQ-15](https://linear.app/formaloo/issue/PQ-15) | Mobile bottom-sheet dropdowns | `/optimized-mobile-dropdowns/15` |

Each live row's Linear issue has a `Demo: <url>` comment linking to its route.

## Week 2 — live

| Issue | Prototype | Route |
| --- | --- | --- |
| [PQ-37](https://linear.app/formaloo/issue/PQ-37) | Collapse onboarding to one screen (name + workspace only) | `/collapse-onboarding-to-one-page-with-just-name-and-workspace-title/37` |
| [PQ-39](https://linear.app/formaloo/issue/PQ-39) | Skip the type menu + setup modal for a first project | `/skip-menu-and-modal-land-first-project-directly-in-the-form-editor/39` |
| [PQ-40](https://linear.app/formaloo/issue/PQ-40) | Land every new form in the editor, not the Responses tab | `/land-all-newly-created-forms-in-the-form-editor-not-the-project-or-responses-view/40` |
| [PQ-41](https://linear.app/formaloo/issue/PQ-41) | Save + Share tooltips on first editor open | `/add-save-and-share-tooltips-to-the-form-editor/41` |
| [PQ-42](https://linear.app/formaloo/issue/PQ-42) | Setup modal for New Page (blank / new form / linked form view), two UI treatments (popup + dropdown) | `/add-a-setup-modal-for-new-page-creation-blank-new-form-or-linked-form-view/42` |
| [PQ-43](https://linear.app/formaloo/issue/PQ-43) | Discoverable "add block" button — always-visible, page-level toolbar, and end-of-content variants | `/make-the-in-page-add-block-button-easier-to-discover/43` |
| [PQ-45](https://linear.app/formaloo/issue/PQ-45) | "is updated" operator on the Advanced Logic "On Update" trigger | `/add-is-updated-operator-to-advanced-logic-on-update-trigger/45` |
| [PQ-44](https://linear.app/formaloo/issue/PQ-44) | Duplicate (yellow) and incomplete (red) logic notices + badges, click a field name to jump to it | `/highlight-the-duplicated-fields-when-duplicate-logic-is-detected/44` |

Each live row's Linear issue has a `Demo: <url>` comment linking to its route.

## Component previews

Some shared components ship without being tied to a specific issue. They're reachable directly under `/component-preview/*`, outside the Week index:

| Component | Route |
| --- | --- |
| `ProjectView` (app/board project page: sidebar, hero, tips, response table) | `/component-preview/project-view` |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 and click into any prototype from the home page.

## Adding a new prototype

1. Add the issue to `lib/issues.ts` with the current `week` (id, number, title, summary — slug is derived from the title). For a non-Linear one-off, add it to `lib/standalone-prototypes.ts` instead.
2. Build the demo in its own `components/<name>/` folder, reusing whatever fits from `components/shared/` and `lib/field-types.ts` first (see AGENTS.md).
3. Branch to it in `app/[slug]/[number]/page.tsx`.
4. Verify locally, then push and comment the live demo link on the Linear issue.

## Stack

Next.js (App Router) + Tailwind v4 + shadcn/ui (`base-nova` preset) + lucide-react icons, deployed on Vercel.
