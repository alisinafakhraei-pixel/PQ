"use client"

import { useEffect, useState } from "react"
import { FileText, Table2, Kanban, GalleryHorizontalEnd, Sparkles, Zap, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type ShortcutAction = "page" | "table" | "kanban" | "gallery" | "ai-analyze"

interface ShortcutButtonDef {
  action: ShortcutAction
  icon: LucideIcon
  label: string
  /** Data-block buttons (everything but "New page") are disabled when not on a page. */
  requiresPage: boolean
}

const BUTTONS: ShortcutButtonDef[] = [
  { action: "page", icon: FileText, label: "New page", requiresPage: false },
  { action: "table", icon: Table2, label: "New table", requiresPage: true },
  { action: "kanban", icon: Kanban, label: "New Kanban", requiresPage: true },
  { action: "gallery", icon: GalleryHorizontalEnd, label: "New gallery", requiresPage: true },
  { action: "ai-analyze", icon: Sparkles, label: "New AI analyze", requiresPage: true },
]

const STORAGE_KEY = "pq82-shortcut-toolbar-open"

interface ShortcutToolbarProps {
  onAction: (action: ShortcutAction) => void
  /** True when the current page isn't a page (e.g. a form or responses view) — disables data-block buttons. */
  disableBlockButtons?: boolean
  className?: string
}

/**
 * PQ-82 — a collapsible row of one-click "create" shortcuts (New page / table / Kanban /
 * gallery / AI analyze) for project edit mode. Open/closed state is remembered per browser
 * (stands in for "per user") via localStorage, defaults open on first visit, and defaults
 * collapsed on narrow screens. Render only while the host page is in edit mode and the
 * viewer has edit access — same gating as the Insert menu.
 */
export function ShortcutToolbar({ onAction, disableBlockButtons = false, className }: ShortcutToolbarProps) {
  // Starts unhydrated (`open` unused until `ready`) so the server-rendered markup never has to
  // guess the per-browser localStorage/viewport state before the client can read it.
  const [state, setState] = useState({ open: true, ready: false })

  useEffect(() => {
    let initial = true
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        initial = stored === "true"
      } else if (window.matchMedia("(max-width: 640px)").matches) {
        initial = false
      }
    } catch {
      // localStorage unavailable (e.g. private mode) — fall back to open-by-default.
    }
    // One-time sync from an external system (localStorage + viewport) read on mount, not derived
    // from props/state — the documented exception to "don't setState in an effect".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ open: initial, ready: true })
  }, [])

  const { open, ready } = state
  function setOpen(next: boolean) {
    setState({ open: next, ready: true })
  }

  function toggle() {
    const next = !open
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      // ignore
    }
    setOpen(next)
  }

  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-4", className)}
      style={!ready ? { visibility: "hidden" } : undefined}
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-card/95 p-1.5 shadow-lg backdrop-blur">
        <button
          onClick={toggle}
          aria-label={open ? "Collapse shortcut toolbar" : "Expand shortcut toolbar"}
          aria-expanded={open}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            open ? "text-muted-foreground hover:bg-secondary hover:text-foreground" : "text-white"
          )}
          style={!open ? { background: "var(--primary)" } : undefined}
        >
          {open ? <X className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
        </button>

        {open && (
          <div className="flex items-center gap-0.5 pr-0.5">
            {BUTTONS.map(({ action, icon: Icon, label, requiresPage }) => {
              const disabled = requiresPage && disableBlockButtons
              return (
                <div key={action} className="group/tooltip relative">
                  <button
                    type="button"
                    onClick={() => !disabled && onAction(action)}
                    disabled={disabled}
                    aria-label={label}
                    aria-disabled={disabled}
                    className={cn(
                      "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      disabled
                        ? "cursor-not-allowed text-muted-foreground/50"
                        : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 hidden w-max max-w-[11rem] -translate-x-1/2 rounded-[var(--radius-sm)] bg-foreground px-2 py-1 text-center text-[11px] font-medium text-background group-hover/tooltip:block">
                    {disabled ? "Only available on a page" : label}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
