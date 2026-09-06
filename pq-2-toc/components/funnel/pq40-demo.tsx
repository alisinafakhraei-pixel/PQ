"use client"

import { useState } from "react"
import { Inbox, Settings } from "lucide-react"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { LoadingScreen } from "@/components/shared/loading-screen"
import { BackButton } from "@/components/shared/back-button"
import { ProjectView, type ProjectViewColumn } from "@/components/shared/project-view"
import type { ProjectNavGroup } from "@/components/shared/project-view-sidebar"
import { WorkspaceShell } from "./workspace-shell"
import { ExistingProjectsGrid } from "./existing-projects-grid"
import { NewProjectMenu } from "./new-project-menu"
import { ProjectSetupModal } from "./project-setup-modal"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"

type Mode = "before" | "after"
type Stage = "home" | "menu" | "modal" | "creating" | "destination"

const NAV_GROUPS: ProjectNavGroup[] = [
  { title: "Home", items: [{ icon: Inbox, label: "Responses" }, { icon: Settings, label: "Settings" }] },
]

const COLUMNS: ProjectViewColumn[] = [{ key: "submitted_at", label: "Submitted at" }]

/**
 * PQ-40 — for a returning user with existing projects, does a newly created form land in the
 * editor or on its (empty) project view? Unlike PQ-39, the type menu / setup modal stay as-is —
 * only the destination after creation changes.
 */
export function Pq40Demo() {
  const [mode, setMode] = useState<Mode>("before")
  const [stage, setStage] = useState<Stage>("home")

  function changeMode(next: Mode) {
    setMode(next)
    setStage("home")
  }

  function handleCreateFromModal() {
    setStage("creating")
    window.setTimeout(() => setStage("destination"), 1200)
  }

  if (stage === "creating") {
    return <LoadingScreen title="Creating your form..." subtitle="Just a second." />
  }

  if (stage === "destination") {
    return (
      <div className="h-svh">
        {mode === "before" ? (
          <ProjectView
            breadcrumb={["Registration form"]}
            pageTitle="Registration form"
            navGroups={NAV_GROUPS}
            activeNavLabel="Responses"
            formTitle="Registration form"
            formShortId="New"
            formUrl="alisinafakhraei.formaloo.me/registration-form"
            columns={COLUMNS}
            rows={[]}
            tips={
              <p className="text-sm leading-relaxed text-foreground/90">
                ✏️ <strong>Registration form</strong> was just created and doesn&apos;t have any fields or
                responses yet. Click <strong>Edit</strong> above to start building it.
              </p>
            }
            sidebarFooter={<BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3 w-3" />}
          />
        ) : (
          <FormEditorDemo />
        )}
      </div>
    )
  }

  return (
    <div className="flex h-svh flex-col">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Where a new form lands</span>
          <SegmentedToggle
            options={[
              { value: "before", label: "Before" },
              { value: "after", label: "After" },
            ]}
            value={mode}
            onChange={changeMode}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <WorkspaceShell
          hasProjects
          onNewClick={() => setStage("menu")}
          newMenu={
            stage === "menu" ? (
              <NewProjectMenu
                onSelect={() => setStage("modal")}
                onClose={() => setStage("home")}
                className="absolute right-0 top-full z-30 mt-2"
              />
            ) : undefined
          }
        >
          <ExistingProjectsGrid />
        </WorkspaceShell>
      </div>

      {stage === "modal" && (
        <ProjectSetupModal onCreate={handleCreateFromModal} onClose={() => setStage("home")} />
      )}
    </div>
  )
}
