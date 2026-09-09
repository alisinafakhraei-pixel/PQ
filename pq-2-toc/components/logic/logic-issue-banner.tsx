"use client"

import type { ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogicIssueBannerProps {
  tone: "amber" | "red"
  /** Clicking anywhere on the banner not otherwise handled jumps to the first flagged field. */
  onJumpToFirst?: () => void
  children: ReactNode
}

const TONE_STYLES = {
  amber: "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100",
  red: "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15",
}

/** The top-of-page error notice for a logic issue — one tone per issue type (PQ-44). */
export function LogicIssueBanner({ tone, onJumpToFirst, children }: LogicIssueBannerProps) {
  return (
    <div
      onClick={onJumpToFirst}
      className={cn(
        "flex items-start gap-2 rounded-[var(--radius)] border px-4 py-3 text-sm transition-colors",
        TONE_STYLES[tone],
        onJumpToFirst && "cursor-pointer"
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
