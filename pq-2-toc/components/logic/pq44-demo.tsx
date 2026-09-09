"use client"

import { useRef, useState } from "react"
import { BackButton } from "@/components/shared/back-button"
import { LogicTopBar } from "./logic-top-bar"
import { LogicIssueCard } from "./logic-issue-card"
import { LogicIssueBanner } from "./logic-issue-banner"
import { LOGIC_ISSUE_FIELDS } from "@/lib/logic-issues"

const FIRST_DUPLICATE_ID = "f1"
const SECOND_DUPLICATE_ID = "f4"
const INCOMPLETE_ID = "f5"

/**
 * PQ-44 — when Advanced Logic flags a problem, it doesn't say which field(s) are involved, so
 * finding the conflict means manually comparing every rule. Two issue types, each with its own
 * top notice and a matching highlight on the affected box(es): duplicate rules (yellow) and
 * incomplete rules (red). Clicking a field name, a badge, or the notice itself scrolls straight
 * to the field.
 */
export function Pq44Demo() {
  const [justJumpedTo, setJustJumpedTo] = useState<string | null>(null)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  function jumpTo(id: string) {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" })
    setJustJumpedTo(id)
    window.setTimeout(() => setJustJumpedTo((current) => (current === id ? null : current)), 1500)
  }

  return (
    <div className="flex h-svh flex-col bg-secondary/20">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <span className="text-xs font-medium text-muted-foreground">Duplicate &amp; incomplete logic detection</span>
      </div>

      <LogicTopBar />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-4 px-8 py-8">
          <LogicIssueBanner tone="amber" onJumpToFirst={() => jumpTo(FIRST_DUPLICATE_ID)}>
            <strong>Logic rules are duplicated:</strong>{" "}
            <button
              onClick={(e) => {
                e.stopPropagation()
                jumpTo(FIRST_DUPLICATE_ID)
              }}
              className="underline underline-offset-2 hover:text-amber-700"
            >
              What&apos;s your name?
            </button>{" "}
            and{" "}
            <button
              onClick={(e) => {
                e.stopPropagation()
                jumpTo(SECOND_DUPLICATE_ID)
              }}
              className="underline underline-offset-2 hover:text-amber-700"
            >
              Phone Number
            </button>{" "}
            have the exact same rule. Click a field name — or anywhere on this message — to jump to it.
          </LogicIssueBanner>

          <LogicIssueBanner tone="red" onJumpToFirst={() => jumpTo(INCOMPLETE_ID)}>
            <strong>Logic rules are incomplete:</strong>{" "}
            <button
              onClick={(e) => {
                e.stopPropagation()
                jumpTo(INCOMPLETE_ID)
              }}
              className="underline underline-offset-2 hover:text-destructive/80"
            >
              Company Name
            </button>{" "}
            is missing a &ldquo;Then&rdquo; action. Click the field name — or anywhere on this message — to jump to it.
          </LogicIssueBanner>

          {LOGIC_ISSUE_FIELDS.map((field) => (
            <LogicIssueCard
              key={field.id}
              registerRef={(el) => {
                refs.current[field.id] = el
              }}
              fieldNumber={field.number}
              fieldKind={field.kind}
              fieldTitle={field.title}
              rule={field.rule}
              issue={field.issue}
              onJumpToPair={field.duplicateOf ? () => jumpTo(field.duplicateOf!) : undefined}
              justJumpedTo={justJumpedTo === field.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
