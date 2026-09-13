"use client"

import { useState } from "react"
import {
  Home,
  Eye,
  Pencil,
  Users,
  Share2,
  HelpCircle,
  Settings,
  PanelLeftClose,
  ListChecks,
  BarChart3,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PinButton } from "./pin-button"
import type { PinPlacementProps } from "./types"

type NavLabel = "Responses" | "Charts & Insights"

const NAV_ITEMS: { label: NavLabel; icon: typeof ListChecks }[] = [
  { label: "Responses", icon: ListChecks },
  { label: "Charts & Insights", icon: BarChart3 },
]

const SKELETON_ROWS = [
  "w-40",
  "w-full",
  "w-24",
  "w-full",
  "w-20",
]

/** Recreates the project sub-sidebar + top navbar chrome shown when you're inside a project. */
export function ProjectShell({ variant, pinned, onTogglePin }: PinPlacementProps) {
  const [activeNav, setActiveNav] = useState<NavLabel>("Responses")
  const [view, setView] = useState<"view" | "edit">("view")

  return (
    <div className="flex h-[420px] w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background shadow-sm">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border">
        <div className="flex items-center justify-between gap-1.5 border-b border-border px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-xs font-semibold text-white">
              A
            </div>
            <span className="truncate text-sm font-semibold">Appointment...</span>
            {variant === "title-row" && <PinButton pinned={pinned} onToggle={onTogglePin} />}
          </div>
          <PanelLeftClose className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>

        {variant === "below-title" && (
          <div className="border-b border-border px-3 py-1.5">
            <PinButton pinned={pinned} onToggle={onTogglePin} showLabel className="w-full justify-start" />
          </div>
        )}

        <nav className="flex-1 space-y-0.5 px-2 py-2.5">
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = label === activeNav
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm transition-colors",
                  isActive ? "bg-accent font-medium text-accent-foreground" : "text-foreground/80 hover:bg-secondary"
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                {label}
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
          <div className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
            <Home className="h-4 w-4 shrink-0" />
            <span>/</span>
            <span className="truncate">CC whatsapp</span>
            <span>/</span>
            <span className="truncate font-medium text-foreground">{activeNav}</span>
            {variant === "breadcrumb" && <PinButton pinned={pinned} onToggle={onTogglePin} />}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center rounded-[var(--radius)] border border-border p-0.5">
              <button
                onClick={() => setView("view")}
                className={cn(
                  "flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium transition-colors",
                  view === "view" ? "bg-secondary" : "text-muted-foreground"
                )}
              >
                <Eye className="h-3.5 w-3.5" /> View
              </button>
              <button
                onClick={() => setView("edit")}
                className={cn(
                  "flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium transition-colors",
                  view === "edit" ? "bg-secondary" : "text-muted-foreground"
                )}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground md:flex">
              <Users className="h-3.5 w-3.5" /> User Directory
            </span>
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground md:flex">
              <Share2 className="h-3.5 w-3.5" /> Share
            </span>
            {variant === "top-right" && <PinButton pinned={pinned} onToggle={onTogglePin} />}
            <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Sun className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Settings className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="h-6 w-6 shrink-0 rounded-full bg-secondary" />
          </div>
        </div>

        <div className="flex-1 space-y-3 px-8 py-8">
          {SKELETON_ROWS.map((width, i) => (
            <div key={i} className={cn("h-4 animate-pulse rounded bg-secondary", width)} />
          ))}
        </div>
      </div>
    </div>
  )
}
