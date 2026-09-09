"use client"

import { useRef, useState } from "react"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { LogicTopBar } from "./logic-top-bar"
import { DuplicateFieldCard } from "./duplicate-field-card"
import { DuplicateBanner } from "./duplicate-banner"
import { DUPLICATE_DEMO_FIELDS } from "@/lib/logic-duplicates"

type Mode = "before" | "after"

const FIRST_DUPLICATE_ID = "f1"
const SECOND_DUPLICATE_ID = "f4"

/**
 * PQ-44 — when Advanced Logic flags a duplicate rule, it doesn't say which two fields are
 * duplicated, so finding the conflict means manually comparing every rule. After: the two
 * duplicate rule boxes get a clickable yellow warning badge, and the error banner names both
 * fields — clicking a name (or the badge, or the banner itself) scrolls straight to its pair.
 */
export function Pq44Demo() {
  const [mode, setMode] = useState<Mode>("before")
  const [justJumpedTo, setJustJumpedTo] = useState<string | null>(null)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  function jumpTo(id: string) {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" })
    setJustJumpedTo(id)
    window.setTimeout(() => setJustJumpedTo((current) => (current === id ? null : current)), 1500)
  }

  const showDuplicates = mode === "after"

  return (
    <div className="flex h-svh flex-col bg-secondary/20">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Duplicate logic detection</span>
          <SegmentedToggle
            options={[
              { value: "before", label: "Before" },
              { value: "after", label: "After" },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
      </div>

      <LogicTopBar />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-4 px-8 py-8">
          <DuplicateBanner
            detailed={showDuplicates}
            pair={
              showDuplicates
                ? {
                    aLabel: "What's your name?",
                    bLabel: "Phone Number",
                    onJumpToA: () => jumpTo(FIRST_DUPLICATE_ID),
                    onJumpToB: () => jumpTo(SECOND_DUPLICATE_ID),
                  }
                : undefined
            }
            onJumpToFirst={() => jumpTo(FIRST_DUPLICATE_ID)}
          />

          {DUPLICATE_DEMO_FIELDS.map((field) => (
            <DuplicateFieldCard
              key={field.id}
              registerRef={(el) => {
                refs.current[field.id] = el
              }}
              fieldNumber={field.number}
              fieldKind={field.kind}
              fieldTitle={field.title}
              rule={field.rule}
              isDuplicate={showDuplicates && !!field.duplicateOf}
              onJumpToPair={field.duplicateOf ? () => jumpTo(field.duplicateOf!) : undefined}
              justJumpedTo={justJumpedTo === field.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
