"use client"

import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnchoredCalloutProps {
  description: string
  onDismiss: () => void
  className?: string
}

/**
 * A small dismissible tooltip card — description text only, no title.
 * Unpositioned by design: wrap one or more of these in an absolutely-positioned
 * flex column (see EditorTopBar) so multiple callouts stack instead of overlapping.
 */
export function AnchoredCallout({ description, onDismiss, className }: AnchoredCalloutProps) {
  return (
    <div
      className={cn(
        "relative w-52 rounded-[var(--radius-lg)] border border-border bg-popover p-3 text-left shadow-lg",
        className
      )}
    >
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="absolute right-1.5 top-1.5 text-muted-foreground hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <p className="pr-4 text-xs text-foreground">{description}</p>
    </div>
  )
}
