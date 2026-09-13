"use client"

import { CalendarPlus, Sparkles } from "lucide-react"
import { BackButton } from "@/components/shared/back-button"
import { EditorTopBar } from "@/components/shared/editor-top-bar"
import { OnUpdateTab } from "./on-update-tab"
import type { OnUpdateCondition } from "./on-update-condition-row"
import { ON_UPDATE_OPERATORS } from "@/lib/logic-operators"

const CONDITIONS: OnUpdateCondition[] = [
  { id: "c1", fieldNumber: 11, fieldLabel: "Appointment Status", fieldKind: "single_choice", operator: "is-changed", value: "A. Scheduled" },
  { id: "c2", fieldNumber: 10, fieldLabel: "Nurse's Approval Status", fieldKind: "single_choice", operator: "is-changed" },
  { id: "c3", fieldNumber: 12, fieldLabel: "Patient Email", fieldKind: "email", operator: "is-changed" },
]

/**
 * PQ-45 — per Farokh's follow-up, "is changed to" and "is updated" collapse into one "is
 * changed" operator. Every field can use it bare ("Field is changed"); a choice-based field
 * additionally gets an optional "to <option>" pill to narrow it to one specific value.
 */
export function Pq45Demo() {
  return (
    <div className="flex h-svh flex-col bg-secondary/20">
      <div className="flex items-center border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
      </div>

      <EditorTopBar
        showIconRow={false}
        center={<span className="text-sm font-semibold">On Update</span>}
        trailingActions={
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <CalendarPlus className="h-4 w-4" /> Add scoring
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "hsl(var(--brand))" }}>
              <Sparkles className="h-4 w-4" /> Magic Logic
            </span>
            <span className="text-sm font-medium text-destructive">Logic rules are incomplete</span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <OnUpdateTab operators={ON_UPDATE_OPERATORS} initialConditions={CONDITIONS} />
      </div>
    </div>
  )
}
