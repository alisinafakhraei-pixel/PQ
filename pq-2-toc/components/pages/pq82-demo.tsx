"use client"

import { useState } from "react"
import {
  ListChecks,
  Flag,
  UserCheck,
  Building2,
  Target,
  BarChart3,
  Mail,
  FileText,
  Table2,
  Kanban,
  GalleryHorizontalEnd,
  Sparkles,
  Check,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { LoadingScreen } from "@/components/shared/loading-screen"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { ProjectView } from "@/components/shared/project-view"
import type { ProjectNavGroup } from "@/components/shared/project-view-sidebar"
import type { ShortcutAction } from "@/components/shared/shortcut-toolbar"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"
import { NewPageSetupModal } from "./new-page-setup-modal"
import type { NewPageChoice } from "./new-page-setup-steps"
import { BlankPageView } from "./blank-page-view"

type Stage = "home" | "page-modal" | "page-creating" | "page-result"
type NavContext = "page" | "responses"
type BlockAction = Exclude<ShortcutAction, "page">

const NAV_GROUPS: ProjectNavGroup[] = [
  {
    title: "Doctor",
    items: [
      { icon: ListChecks, label: "All records" },
      { icon: Flag, label: "Follow-up status" },
      { icon: UserCheck, label: "Follow-up needed" },
      { icon: Building2, label: "All patients info" },
    ],
  },
  {
    title: "Patient",
    items: [
      { icon: Target, label: "My submissions" },
      { icon: BarChart3, label: "Charts & insights" },
      { icon: Mail, label: "Email & PDF template" },
      { icon: FileText, label: "Getting started & resources" },
    ],
  },
]

const VIEW_LABELS: Record<string, string> = {
  form: "Form",
  table: "Table",
  kanban: "Kanban",
  gallery: "Gallery",
}

const BLOCK_META: Record<BlockAction, { label: string; icon: LucideIcon }> = {
  table: { label: "Table", icon: Table2 },
  kanban: { label: "Kanban", icon: Kanban },
  gallery: { label: "Gallery", icon: GalleryHorizontalEnd },
  "ai-analyze": { label: "AI analyze", icon: Sparkles },
}

function newPageLabelFor(choice: NewPageChoice): string {
  if (choice.type === "blank") return "Untitled page"
  if (choice.type === "new-form") return choice.formTitle
  return choice.formName
}

/** Appends the just-created page to the nav so it visibly exists in the sidebar afterward. */
function navGroupsWithCreatedPage(label: string): ProjectNavGroup[] {
  return [...NAV_GROUPS, { title: "Pages", items: [{ icon: FileText, label }] }]
}

/**
 * PQ-82 — a collapsible shortcut toolbar in project edit mode with one-click New page / New
 * table / New Kanban / New gallery / New AI analyze buttons, so builders who repeat these
 * create actions don't have to go through the sidebar "+ New Page" or the Insert menu each
 * time. Lives on `ProjectView` itself (`onShortcutAction` + `shortcutBlocksDisabled`), gated
 * to Edit mode — toggle to Edit (top right) to see it appear. "New page" reuses the real
 * PQ-42 setup flow; the data-block buttons simulate an Insert-menu-style block drop. The
 * "On responses view" toggle simulates being off a page, disabling the data-block buttons
 * with a tooltip while "New page" stays active, per spec.
 */
export function Pq82Demo() {
  const [stage, setStage] = useState<Stage>("home")
  const [navContext, setNavContext] = useState<NavContext>("page")
  const [choice, setChoice] = useState<NewPageChoice | null>(null)
  const [insertedBlocks, setInsertedBlocks] = useState<{ id: string; action: BlockAction }[]>([])
  const [toast, setToast] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(null), 2200)
  }

  function handleShortcutAction(action: ShortcutAction) {
    if (action === "page") {
      setStage("page-modal")
      return
    }
    const id = `${action}-${Date.now()}`
    setInsertedBlocks((prev) => [...prev, { id, action }])
    showToast(`Inserted a new ${BLOCK_META[action].label} block.`)
  }

  function handleModalCreate(next: NewPageChoice) {
    setChoice(next)
    setStage("page-creating")
    window.setTimeout(() => setStage("page-result"), 1000)
  }

  const sidebarFooter = (
    <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3 w-3" />
  )

  if (stage === "page-creating") {
    return <LoadingScreen title="Creating your page..." subtitle="Just a second." />
  }

  if (stage === "page-result" && choice) {
    const newPageLabel = newPageLabelFor(choice)
    const navGroups = navGroupsWithCreatedPage(newPageLabel)

    if (choice.type === "blank") {
      return (
        <div className="h-svh">
          <BlankPageView
            pageTitle={newPageLabel}
            intentional
            navGroups={navGroups}
            activeNavLabel={newPageLabel}
            sidebarFooter={sidebarFooter}
          />
        </div>
      )
    }

    if (choice.type === "new-form") {
      return (
        <div className="relative h-svh">
          <FormEditorDemo formTitle={choice.formTitle} />
        </div>
      )
    }

    const viewLabel = VIEW_LABELS[choice.view]
    return (
      <div className="h-svh">
        <ProjectView
          breadcrumb={[newPageLabel]}
          pageTitle={newPageLabel}
          navGroups={navGroups}
          activeNavLabel={newPageLabel}
          formTitle={choice.formName}
          tips={
            <p className="text-sm leading-relaxed text-foreground/90">
              📊 This page shows <strong>{choice.formName}</strong>&apos;s responses as a <strong>{viewLabel}</strong>{" "}
              view.
            </p>
          }
          sidebarFooter={sidebarFooter}
          onShortcutAction={handleShortcutAction}
        />
      </div>
    )
  }

  const afterTable =
    insertedBlocks.length > 0 ? (
      <div className="mt-4 space-y-2">
        {insertedBlocks.map(({ id, action }) => {
          const meta = BLOCK_META[action]
          const Icon = meta.icon
          return (
            <div
              key={id}
              className="flex items-center gap-2 rounded-[var(--radius)] border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground"
            >
              <Icon className="h-3.5 w-3.5" /> New {meta.label} block
              <span className="text-[11px] text-muted-foreground/70">(simulated)</span>
            </div>
          )
        })}
      </div>
    ) : undefined

  return (
    <div className="relative flex h-svh flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Switch to <strong className="text-foreground">Edit</strong> (top right) to reveal the toolbar
          </span>
          <SegmentedToggle
            options={[
              { value: "page", label: "On a page" },
              { value: "responses", label: "On responses view" },
            ]}
            value={navContext}
            onChange={setNavContext}
          />
        </div>
      </div>

      {toast && (
        <div className="pointer-events-none absolute left-1/2 top-16 z-50 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
            <Check className="h-4 w-4" style={{ color: "hsl(var(--brand))" }} />
            {toast}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <ProjectView
          navGroups={NAV_GROUPS}
          activeNavLabel={navContext === "responses" ? "Charts & insights" : "All records"}
          breadcrumb={navContext === "responses" ? ["2. Test templates", "Charts & insights"] : undefined}
          pageTitle={navContext === "responses" ? "Charts & insights" : undefined}
          sidebarFooter={sidebarFooter}
          onShortcutAction={handleShortcutAction}
          shortcutBlocksDisabled={navContext === "responses"}
          afterTable={afterTable}
        />
      </div>

      {stage === "page-modal" && (
        <NewPageSetupModal onCreate={handleModalCreate} onClose={() => setStage("home")} />
      )}
    </div>
  )
}
