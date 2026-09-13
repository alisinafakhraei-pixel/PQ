"use client"

import { Pin } from "lucide-react"
import { cn } from "@/lib/utils"

interface PinButtonProps {
  pinned: boolean
  onToggle: () => void
  showLabel?: boolean
  className?: string
}

/** The reusable pin/unpin icon button — shared by every placement variant. */
export function PinButton({ pinned, onToggle, showLabel, className }: PinButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={pinned}
      title={pinned ? "Unpin from sidebar" : "Pin to sidebar"}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] px-1.5 py-1 text-xs font-medium transition-colors",
        pinned ? "text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        className
      )}
    >
      <Pin className="h-3.5 w-3.5" fill={pinned ? "currentColor" : "none"} />
      {showLabel && <span>{pinned ? "Pinned" : "Pin to sidebar"}</span>}
    </button>
  )
}
