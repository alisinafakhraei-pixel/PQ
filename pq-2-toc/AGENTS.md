<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project context

This repo is a hub of interactive prototypes for Formaloo product ideas (one per Linear PQ issue), built with shadcn + the Formaloo design system. Each issue gets a card on the home page (`app/page.tsx`, registered in `lib/issues.ts`) linking to `/{issue-slug}/{number}`, which renders that issue's demo (branched in `app/[slug]/[number]/page.tsx`). Full index with live links: [README.md](./README.md).

**Reuse before rebuilding.** Shared, cross-prototype UI lives in `components/shared/` and `lib/field-types.ts` — pull from there first. Prototype-specific components live in their own folder (e.g. `components/magic-id/`, `components/logic/`). When a new prototype needs something a past one already built (field list rows, an icon set, a settings-panel shell, a toast pattern), reuse or extend the existing component instead of re-implementing it, and promote it to `components/shared/` if a second prototype needs it too. The component library should get better and more complete with each new demo, not get rebuilt from scratch each time.

**Never push without explicit approval.** Build and verify every new prototype (or design change) locally first — start the dev server, click through it yourself. Do not `git commit`/`push` until Alisina explicitly says it's okay, no matter how confident the implementation is.

**Weeks.** The home page (`app/page.tsx`) lists "Week N" cards, not individual prototypes. `lib/prototype-list.ts` (`prototypesForWeek`, `WEEKS`) merges Linear-tied issues (`lib/issues.ts`, has a `week` field) with non-Linear one-offs (`lib/standalone-prototypes.ts`) and feeds `app/week-1/page.tsx` / `app/week-2/page.tsx` via the shared `components/shared/week-page.tsx` + `prototype-list.tsx`. Put new work in week 2 (or whatever the current week is) going forward.

**⚠️ CSS custom-property gotcha — read before styling with inline `style`.** Every color token in `app/globals.css` (`--primary`, `--secondary`, `--destructive`, `--border`, etc.) is defined as a **complete color value** (e.g. `--primary: hsl(217 79% 46%)`), *except* `--brand` (`--brand: 18 100% 50%`, a bare `H S% L%` triple — that's the one exception). So:
- `style={{ background: "var(--primary)" }}` ✅ — correct, since --primary already is a full color.
- `style={{ background: "hsl(var(--primary))" }}` ❌ — double-wraps a color inside `hsl()`, which is invalid CSS. The browser silently drops the whole declaration, leaving the element **transparent** (invisible, no error, no warning) — this exact bug made half the "Save"/"New"/"Create" buttons across the hub invisible for a while before it was caught by chance. `hsl(var(--brand))` is the only token that's correct to wrap this way.
- Tailwind utility classes (`bg-primary`, `text-primary-foreground`, `ring-primary/20`, etc.) are unaffected — they go through `@theme inline`'s own mapping and don't use this wrapping pattern.
- If a button/element renders with the right text/icon but an invisible or wrong-seeming background, check for a double-wrapped `hsl(var(--x))` first.

### Shared component inventory (`components/shared/`, `lib/`)

Check here before building something new:

| File | What it gives you |
| --- | --- |
| `lib/field-types.ts` | The canonical `FieldKind` union + `fieldKindLabels`. Add new field types here, not per-prototype. |
| `components/shared/field-icon.tsx` | `<FieldIcon kind={...} />` — the colored icon for any `FieldKind`. Use this instead of inlining lucide icons for field rows. |
| `lib/field-type-picker-data.ts` + `components/shared/field-type-picker.tsx` | The searchable, grouped "add a field" type picker (Text / Contact Info / Choice / Rating & Ranking / Date & Time / Form Structure / Other), matching the real Formaloo add-field dropdown. |
| `components/shared/segmented-toggle.tsx` | The small pill-shaped mode switcher (e.g. "At the top" vs "After each question", "Before" vs "After"). Use for any A/B-style prototype toggle. |
| `components/shared/editor-top-bar.tsx` | The shared editor top bar chrome (Back link, optional center slot, icon row, Save button). Pass `center`/`leadingActions`/`trailingActions`/`showIconRow`/`shareCallout`/`saveCallout` to fit a new page instead of rebuilding the bar. |
| `components/shared/anchored-callout.tsx` | `<AnchoredCallout description={...} onDismiss={...} align="left\|right\|center" offsetTop={n} />` — a small dismissible tooltip anchored under a `relative` parent. No title line by design (description text only). Use `offsetTop` to stack a second callout below a nearby one instead of letting them overlap. |
| `components/shared/loading-screen.tsx` | `<LoadingScreen title subtitle />` — the spinner + copy used for every simulated "creating/saving..." transition. |
| `components/shared/brand-mark.tsx` | The small orange Formaloo "F" square used in every header. |
| `components/shared/prototype-list.tsx` + `components/shared/week-page.tsx` | The card-list UI and Week-page shell described above. |
| `components/shared/project-view.tsx` + `project-view-sidebar.tsx` | The Formaloo "app/board" project view — grouped collapsible nav sidebar, breadcrumb + View/Edit toggle, gradient hero banner, tip callout, form summary card, response table. Fully prop-configurable (see `ProjectViewProps`); ships with a working default example. Not tied to a specific issue — reuse for any prototype that needs to show a project/board/data-table page. Root is `h-full` (nest it under an `h-svh` wrapper, same as `FormEditorDemo`). Pass `onAddPage` (+ optional `addPageMenu`) to light up the "New Page" entry points added for PQ-42. Pass `aboveContent`, `afterTable`, and/or `renderBlockWrapper(key: "tips" \| "form-card" \| "table", node)` to inject page-level or per-section affordances without forking the component — added for PQ-43, identity by default so other usages are unaffected. |

### Prototype folders

| Folder | Issue | Notable pieces worth reusing later |
| --- | --- | --- |
| `components/magic-id/` | PQ-1 | `ai-menu.tsx` (grouped AI dropdown pattern), `fields-sidebar.tsx` + `editor-canvas.tsx` (fields list / canvas shell). `FormEditorDemo` also accepts `showSaveTooltip`/`showShareTooltip`/`onDismissSave`/`onDismissShare` — this is the "real" rich form editor, reuse it directly as the destination whenever a prototype needs to show a form's editing canvas (don't build a simplified mock canvas). |
| `components/toc-*` (root of `components/`) | PQ-2 | Floating collapsed-toggle popover pattern (`toc-sidebar.tsx`) |
| `components/logic/` | PQ-6/44/45 | `add-field-control.tsx` + `field-type-picker` wiring for inserting a new field mid-flow. `logic-top-bar.tsx` now takes `activeTab`/`onTabChange`/`showIncompleteWarning` (defaults preserve PQ-6's look). `operator-dropdown.tsx` + `lib/logic-operators.ts` — a real condition-operator select that groups newly-added operators (`isNew: true`) under a "New" section header; `on-update-tab.tsx` + `on-update-condition-row.tsx` build the "On Update" trigger's condition list around it (PQ-45). `duplicate-field-card.tsx` + `duplicate-banner.tsx` + `lib/logic-duplicates.ts` — a rule box with a clickable duplicate-warning badge, and an error banner that names both duplicated fields; both scroll to the paired rule via `scrollIntoView` (PQ-44). |
| `components/piping/` | PQ-7 | `piping-menu.tsx` — recent-N + "search all" drill-down pattern, reusable anywhere a long list needs progressive disclosure |
| `components/formula/` | PQ-13 | `formula-token-editor.tsx` — inline token/pill text editor with `@`-mention insertion; `field-reference-picker.tsx` |
| `components/mobile-dropdown/` | PQ-15 | `dropdown-bottom-sheet.tsx` — mobile bottom-sheet pattern with conditional search |
| `components/onboarding/` | PQ-37 | `ai-build-prompt.tsx` (the real "What do you want to build?" home box, `highlighted` prop for a glowing first-look nudge) |
| `components/funnel/` | PQ-39/40/41 | `workspace-shell.tsx` (sidebar + toolbar home shell, `hasProjects` toggles empty vs populated state), `new-project-menu.tsx` + `project-setup-modal.tsx` (the 9-type menu + setup modal being removed for first projects) |
| `components/pages/` | PQ-42/43 | `new-page-setup-steps.tsx` (the shared step content: blank / new form (asks a form title) / linked-form-responses (form search, then Form/Table/Kanban/Gallery)), rendered by either `new-page-setup-modal.tsx` (centered popup) or `new-page-setup-dropdown.tsx` (anchored dropdown) — same steps, two UI treatments. `group-options-menu.tsx` (the sidebar group hover "..." menu, "New page" as its highlighted top item, "Live embed page" wired to the same flow). `blank-page-view.tsx` (an empty page result, `intentional` prop swaps confused-vs-calm copy). `add-block-variants-demo.tsx` (PQ-43) — always-visible / page-level-toolbar / end-of-content alternatives to the hover-only "+", rendered inside the real `ProjectView` via its `renderBlockWrapper`/`aboveContent`/`afterTable` hooks. |

When in doubt, grep the folder above for the closest existing pattern before writing a new component from scratch.
