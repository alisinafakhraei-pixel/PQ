"use client"

import type { ReactNode } from "react"
import {
  Home,
  Activity,
  Bell,
  Folder,
  Info,
  UserPlus,
  LayoutTemplate,
  FolderInput,
  Plus,
  User as UserIcon,
} from "lucide-react"
import { BrandMark } from "@/components/shared/brand-mark"
import { BackButton } from "@/components/shared/back-button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Activity, label: "Activity" },
]

const TOOLBAR_ACTIONS = [
  { icon: UserPlus, label: "Concierge" },
  { icon: LayoutTemplate, label: "Templates" },
  { icon: FolderInput, label: "Import" },
]

interface WorkspaceShellProps {
  /** A returning user with existing projects shows different sidebar counts than a first-timer. */
  hasProjects?: boolean
  onNewClick?: () => void
  /** Anchored popover rendered under the "+ New" button (e.g. the project-type menu). */
  newMenu?: ReactNode
  children: ReactNode
}

/** The workspace home shell (sidebar + top toolbar) shared by the funnel prototypes (PQ-39/40). */
export function WorkspaceShell({ hasProjects = false, onNewClick, newMenu, children }: WorkspaceShellProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          <BrandMark />
          <span className="text-sm font-semibold">Formaloo</span>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
          <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-border px-3 py-4 sm:flex">
          {NAV_ITEMS.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={cn(
                "mb-0.5 flex items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm font-medium",
                i === 0 ? "bg-secondary" : "text-foreground/80"
              )}
            >
              <Icon className="h-4 w-4 text-muted-foreground" /> {label}
            </div>
          ))}

          <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1">
            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Pinned</span>
            <Info className="h-3 w-3 text-muted-foreground/60" />
          </div>
          <p className="px-2.5 text-xs text-muted-foreground/60">{hasProjects ? "2 pinned" : "No pins!"}</p>

          <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1">
            <Folder className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Folders</span>
          </div>
          <p className="px-2.5 text-xs text-muted-foreground/60">{hasProjects ? "2 folders" : "No folders yet"}</p>

          <BackButton
            label="All prototypes"
            fallbackHref="/week-2"
            className="mt-auto rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs"
            iconClassName="h-3 w-3"
          />
        </aside>

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <Home className="h-4 w-4 text-muted-foreground" /> Home
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="hidden items-center gap-2 lg:flex">
                {TOOLBAR_ACTIONS.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex shrink-0 items-center gap-1.5 rounded-[var(--radius)] border border-border px-3 py-1.5 text-xs font-medium text-foreground/80"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" /> {label}
                  </span>
                ))}
              </div>
              <div className="relative shrink-0">
                <button
                  onClick={onNewClick}
                  className="flex items-center gap-1 rounded-[var(--radius)] px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ background: "var(--primary)" }}
                >
                  <Plus className="h-3.5 w-3.5" /> New
                </button>
                {newMenu}
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
