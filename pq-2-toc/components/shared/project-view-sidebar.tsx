"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight, PanelLeftClose, Plus } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { GroupOptionsMenu } from "@/components/pages/group-options-menu"
import { cn } from "@/lib/utils"

export interface ProjectNavItem {
  icon: LucideIcon
  label: string
}

export interface ProjectNavGroup {
  title: string
  items: ProjectNavItem[]
}

interface ProjectViewSidebarProps {
  groups: ProjectNavGroup[]
  activeLabel: string
  onSelect?: (label: string) => void
  /** Rendered pinned to the bottom of the sidebar, e.g. a BackButton out of the prototype. */
  footer?: ReactNode
  /**
   * When provided, adds "New Page" entry points: a hover "..." menu on each group header
   * (with "New page" as its top, highlighted item) and a "+ New Page" link at the end of the nav.
   */
  onAddPage?: () => void
}

/** The grouped, collapsible nav sidebar for a Formaloo app/board ("project") view. */
export function ProjectViewSidebar({ groups, activeLabel, onSelect, footer, onAddPage }: ProjectViewSidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  function toggleGroup(title: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <div className="h-6 w-6 rounded-md bg-secondary" />
        <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map((group) => {
          const collapsed = collapsedGroups.has(group.title)
          return (
            <div key={group.title} className="mb-3">
              <div className="group/header flex items-center gap-1 px-2 py-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex flex-1 items-center gap-1 text-left text-sm font-semibold text-foreground"
                >
                  {collapsed ? (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {group.title}
                </button>
                {onAddPage && <GroupOptionsMenu onNewPage={onAddPage} />}
              </div>
              {!collapsed && (
                <div className="mt-0.5 space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = item.label === activeLabel
                    return (
                      <button
                        key={item.label}
                        onClick={() => onSelect?.(item.label)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm transition-colors",
                          isActive
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-foreground/80 hover:bg-secondary"
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {onAddPage && (
          <button
            onClick={onAddPage}
            className="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <span className="flex items-center gap-2">
              <Plus className="h-3.5 w-3.5" /> New Page
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </nav>

      {footer && <div className="border-t border-border p-2">{footer}</div>}
    </aside>
  )
}
