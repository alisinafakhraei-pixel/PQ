"use client"

import type { ReactNode } from "react"
import { Settings, Paintbrush, Bell, Eye, Share2 } from "lucide-react"
import { BackButton } from "./back-button"
import { cn } from "@/lib/utils"

interface EditorTopBarProps {
  /** Rendered between the Back link and the right-hand action cluster, e.g. page tabs. */
  center?: ReactNode
  /** Rendered before the icon row (e.g. an AI menu trigger). */
  leadingActions?: ReactNode
  /** Rendered after the icon row, before Save (e.g. "Add scoring" / "Magic Logic" labels). */
  trailingActions?: ReactNode
  /** The Settings/Paintbrush/Bell/Eye/Share icon row. Defaults to shown. */
  showIconRow?: boolean
  /** A dismissible callout for the Share icon — also glows the icon while shown. */
  shareCallout?: ReactNode
  /** A dismissible callout for the Save button — also glows the button while shown. Stacks under shareCallout, never overlaps it. */
  saveCallout?: ReactNode
}

const GLOW_STYLE = {
  boxShadow: "0 0 0 3px hsl(var(--brand) / 0.55), 0 0 20px 4px hsl(var(--brand) / 0.3)",
}

/**
 * The chrome shared by every Formaloo editor-style prototype: a Back link, an optional
 * center slot (tabs, mode toggles), and a right-hand cluster ending in Save.
 * Used by the magic-id, logic, formula, and funnel prototypes — reuse this before building a new top bar.
 */
export function EditorTopBar({
  center,
  leadingActions,
  trailingActions,
  showIconRow = true,
  shareCallout,
  saveCallout,
}: EditorTopBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
      <BackButton fallbackHref="/" />

      {center}

      <div className="flex items-center gap-2">
        {leadingActions}
        {showIconRow &&
          [Settings, Paintbrush, Bell, Eye, Share2].map((Icon, i) => {
            const glow = Icon === Share2 && !!shareCallout
            return (
              <button
                key={i}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[var(--radius)] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  glow && "animate-pulse"
                )}
                style={glow ? GLOW_STYLE : undefined}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        {trailingActions}
        <div className="relative">
          <button
            className={cn(
              "ml-1 rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
              !!saveCallout && "animate-pulse"
            )}
            style={{ background: "var(--primary)", ...(saveCallout ? GLOW_STYLE : {}) }}
          >
            Save
          </button>

          {(shareCallout || saveCallout) && (
            <div className="absolute right-0 top-full z-30 mt-2 flex flex-col items-end gap-2">
              {shareCallout}
              {saveCallout}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
