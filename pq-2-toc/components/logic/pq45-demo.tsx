"use client"

import { useState } from "react"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { LogicTopBar, type LogicTab } from "./logic-top-bar"
import { OnUpdateTab } from "./on-update-tab"
import type { OnUpdateCondition } from "./on-update-condition-row"
import { FieldLogicSection } from "./field-logic-section"
import { initialLogicFields } from "@/lib/logic-data"
import { ON_UPDATE_OPERATORS, ON_UPDATE_OPERATORS_BEFORE } from "@/lib/logic-operators"

type Mode = "before" | "after"

const BEFORE_CONDITIONS: OnUpdateCondition[] = [
  { id: "c1", fieldNumber: 10, fieldLabel: "Nurse's Approval Status", operator: "is-changed-to", value: "B. Approved" },
  { id: "c2", fieldNumber: 10, fieldLabel: "Nurse's Approval Status", operator: "is-changed-to", value: "C. Rejected" },
  { id: "c3", fieldNumber: 11, fieldLabel: "Appointment Status", operator: "is-changed-to", value: "A. Scheduled" },
  { id: "c4", fieldNumber: 11, fieldLabel: "Appointment Status", operator: "is-changed-to", value: "B. Confirmed" },
  { id: "c5", fieldNumber: 11, fieldLabel: "Appointment Status", operator: "is-changed-to", value: "C. Completed" },
  { id: "c6", fieldNumber: 11, fieldLabel: "Appointment Status", operator: "is-changed-to", value: "D. Cancelled" },
  { id: "c7", fieldNumber: 11, fieldLabel: "Appointment Status", operator: "is-changed-to", value: "E. No Show" },
]

const AFTER_CONDITIONS: OnUpdateCondition[] = [
  { id: "c1", fieldNumber: 11, fieldLabel: "Appointment Status", operator: "is-updated" },
]

/**
 * PQ-45 — the "On Update" trigger's condition operator only offers "is changed to", so
 * triggering logic on any change to a status field means one condition per possible value.
 * Adds an "is updated" operator so a single condition covers every value change.
 */
export function Pq45Demo() {
  const [mode, setMode] = useState<Mode>("before")
  const [tab, setTab] = useState<LogicTab>("On Update")

  const operators = mode === "before" ? ON_UPDATE_OPERATORS_BEFORE : ON_UPDATE_OPERATORS

  return (
    <div className="flex h-svh flex-col bg-secondary/20">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            The &ldquo;is changed to&rdquo; operator dropdown
          </span>
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

      <LogicTopBar activeTab={tab} onTabChange={setTab} showIncompleteWarning />

      <div className="flex-1 overflow-y-auto">
        {tab === "On Update" && (
          <OnUpdateTab
            operators={operators}
            initialConditions={mode === "before" ? BEFORE_CONDITIONS : AFTER_CONDITIONS}
            key={mode}
          />
        )}

        {tab === "Fields" && (
          <div className="mx-auto max-w-3xl space-y-4 px-8 py-8">
            {initialLogicFields.map((field, i) => (
              <FieldLogicSection
                key={field.id}
                field={field}
                index={i}
                showInlineAddField={false}
                onAddFieldAfter={() => {}}
              />
            ))}
          </div>
        )}

        {tab === "On Submit" && (
          <div className="mx-auto max-w-3xl px-8 py-16 text-center text-sm text-muted-foreground">
            Not part of this prototype — see the &ldquo;On Update&rdquo; tab for PQ-45.
          </div>
        )}
      </div>
    </div>
  )
}
