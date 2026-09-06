"use client"

import { useState } from "react"
import { ListChecks, Flag, UserCheck, Building2, Target, BarChart3, Mail, FileText, Check } from "lucide-react"
import { LoadingScreen } from "@/components/shared/loading-screen"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { ProjectView } from "@/components/shared/project-view"
import type { ProjectNavGroup } from "@/components/shared/project-view-sidebar"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"
import { NewPageSetupModal } from "./new-page-setup-modal"
import { NewPageSetupDropdown } from "./new-page-setup-dropdown"
import type { NewPageChoice } from "./new-page-setup-steps"
import { BlankPageView } from "./blank-page-view"

type Stage = "home" | "modal" | "creating" | "result"
type ModalVariant = "popup" | "dropdown"

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
 * PQ-42 — every "add a page" entry point (the sidebar's "+ New Page" link, the group hover
 * menu's "New page" / "Live embed page" items, and the "Page access | Page options" row) opens
 * one setup flow: blank vs. new form (asks for a form title) vs. linked form responses (a
 * form-search step, then Form/Table/Kanban/Gallery). Two UI treatments to compare: a centered
 * popup, or a dropdown anchored under the "+ New Page" button. Replaces the old behavior of
 * always creating a blank, disconnected page with no record of it in the sidebar.
 */
export function Pq42Demo() {
  const [stage, setStage] = useState<Stage>("home")
  const [modalVariant, setModalVariant] = useState<ModalVariant>("popup")
  const [choice, setChoice] = useState<NewPageChoice | null>(null)
  const [showCreatedToast, setShowCreatedToast] = useState(false)

  function handleAddPageClick() {
    setStage("modal")
  }

  function handleModalCreate(next: NewPageChoice) {
    setChoice(next)
    setStage("creating")
    window.setTimeout(() => {
      setStage("result")
      if (next.type === "new-form") {
        setShowCreatedToast(true)
        window.setTimeout(() => setShowCreatedToast(false), 3000)
      }
    }, 1200)
  }

  const sidebarFooter = (
    <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3 w-3" />
  )

  if (stage === "creating") {
    return <LoadingScreen title="Creating your page..." subtitle="Just a second." />
  }

  if (stage === "result" && choice) {
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
          {showCreatedToast && (
            <div className="absolute left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
              <Check className="h-4 w-4" style={{ color: "hsl(var(--brand))" }} />
              Page &ldquo;{choice.formTitle}&rdquo; created — now editing its form.
            </div>
          )}
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
        />
      </div>
    )
  }

  return (
    <div className="flex h-svh flex-col">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Try the + New Page link below, or the ⋯ menu on a group
          </span>
          <SegmentedToggle
            options={[
              { value: "popup", label: "1 — Popup" },
              { value: "dropdown", label: "2 — Dropdown" },
            ]}
            value={modalVariant}
            onChange={(next) => {
              setModalVariant(next)
              setStage("home")
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ProjectView
          navGroups={NAV_GROUPS}
          activeNavLabel="All records"
          onAddPage={handleAddPageClick}
          sidebarFooter={sidebarFooter}
          addPageMenu={
            modalVariant === "dropdown" && stage === "modal" ? (
              <NewPageSetupDropdown onCreate={handleModalCreate} onClose={() => setStage("home")} />
            ) : undefined
          }
        />
      </div>

      {modalVariant === "popup" && stage === "modal" && (
        <NewPageSetupModal onCreate={handleModalCreate} onClose={() => setStage("home")} />
      )}
    </div>
  )
}
