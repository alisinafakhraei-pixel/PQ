"use client"

import type { ReactNode } from "react"
import { Home, FileText } from "lucide-react"
import { ProjectViewSidebar, type ProjectNavGroup } from "@/components/shared/project-view-sidebar"

interface BlankPageViewProps {
  pageTitle: string
  /** Whether the user knowingly chose "blank" (calmer copy) vs. it just happened to them (confused copy). */
  intentional?: boolean
  navGroups: ProjectNavGroup[]
  activeNavLabel: string
  sidebarFooter?: ReactNode
}

/** A newly created page with nothing on it yet — the result of picking "Blank page", or (today) the only outcome. */
export function BlankPageView({ pageTitle, intentional = false, navGroups, activeNavLabel, sidebarFooter }: BlankPageViewProps) {
  return (
    <div className="flex h-full bg-background">
      <ProjectViewSidebar groups={navGroups} activeLabel={activeNavLabel} footer={sidebarFooter} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-border px-5 py-2.5 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>/</span>
          <span className="font-medium text-foreground">{pageTitle}</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-10 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">{pageTitle}</h2>
          {intentional ? (
            <p className="max-w-xs text-sm text-muted-foreground">
              This page is blank for now, just like you asked. Add a form or table to it whenever you&apos;re ready.
            </p>
          ) : (
            <p className="max-w-xs text-sm text-muted-foreground">
              This page was just created. It isn&apos;t connected to a form or table yet, so there&apos;s nothing to
              see here — or a clear way to fix that.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
