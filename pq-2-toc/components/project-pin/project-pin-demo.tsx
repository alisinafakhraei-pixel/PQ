"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { ProjectShell } from "./project-shell"
import type { PinVariant } from "./types"

const VARIANTS: { value: PinVariant; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "title-row", label: "A — Next to title" },
  { value: "below-title", label: "B — Row below title" },
  { value: "breadcrumb", label: "C — In the breadcrumb ✓ Winner" },
  { value: "top-right", label: "D — Top-right icon cluster" },
]

const VARIANT_NOTES: Record<PinVariant, string> = {
  today:
    "Today, pinning a project only happens from outside it — hovering a project in the home sidebar list and clicking its \"...\" menu. There's no way to pin the project you're currently looking at without leaving it.",
  "title-row":
    "Puts the pin icon right in the project's title row, next to its name in the sub-sidebar header. Closest to the thing being pinned, but that row is already tight (avatar, truncating title, collapse button) — a good, on-brand icon-only spot with almost no room for a label.",
  "below-title":
    "Gives the pin action its own thin row directly under the title, with room for a text label (\"Pin to sidebar\"). Most explicit and discoverable, but adds a row of vertical space to every project page, all the time — most people won't need it after pinning once.",
  breadcrumb:
    "Places it in the top navbar, right in the breadcrumb next to the current page name. Lives in the global chrome that's always visible, but breadcrumbs are read as \"where am I,\" not as a set of actions — an icon button there is a slightly odd fit.",
  "top-right":
    "Adds it to the top-right icon cluster, alongside User Directory / Share / Help / Settings — the existing home for project-level actions. Consistent with how those other actions already live, but it's the most crowded part of the bar, and a pin icon there competes with Share for attention.",
}

/** Standalone exploration: where should a "pin this project" icon live while you're inside the project? */
export function ProjectPinDemo() {
  const [variant, setVariant] = useState<PinVariant>("breadcrumb")
  const [pinned, setPinned] = useState(false)

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <BackButton label="All prototypes" className="mb-6" />

        <h1 className="text-xl font-bold">Pin a project from inside it — placement ideas</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Where should a pin icon live so people can pin the project they&apos;re currently viewing, without going
          back to the home sidebar list? Flip through four placement ideas.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-[var(--radius)] border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <Trophy className="h-4 w-4 shrink-0" />
          <span>
            <strong className="font-semibold">Decision:</strong> Farokh picked Option C — In the breadcrumb.
          </span>
        </div>

        <div className="mt-6">
          <SegmentedToggle options={VARIANTS} value={variant} onChange={setVariant} className="flex-wrap" />
        </div>

        <div className="mt-3 rounded-[var(--radius)] border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
          {VARIANT_NOTES[variant]}
        </div>

        <div className="mt-6 flex justify-center rounded-[var(--radius-lg)] bg-muted/40 p-8">
          <ProjectShell variant={variant} pinned={pinned} onTogglePin={() => setPinned((p) => !p)} />
        </div>
      </div>
    </div>
  )
}
