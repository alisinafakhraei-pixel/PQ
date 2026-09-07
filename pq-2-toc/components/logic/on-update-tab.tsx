"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { OnUpdateConditionRow, type OnUpdateCondition } from "./on-update-condition-row"
import { LogicChip } from "./logic-chip"
import type { ConditionOperator, OperatorOption } from "@/lib/logic-operators"

interface OnUpdateTabProps {
  operators: OperatorOption[]
  initialConditions: OnUpdateCondition[]
}

export function OnUpdateTab({ operators, initialConditions }: OnUpdateTabProps) {
  const [conditions, setConditions] = useState<OnUpdateCondition[]>(initialConditions)

  function handleOperatorChange(id: string, operator: ConditionOperator) {
    setConditions((current) =>
      current.map((c) => (c.id === id ? { ...c, operator, value: operator === "is-changed-to" ? c.value : undefined } : c))
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-8">
      <div className="rounded-[var(--radius-lg)] border border-border bg-background p-5">
        <div className="space-y-2">
          {conditions.map((condition, i) => (
            <div key={condition.id}>
              <OnUpdateConditionRow
                condition={condition}
                operators={operators}
                onOperatorChange={(operator) => handleOperatorChange(condition.id, operator)}
              />
              {i < conditions.length - 1 && (
                <div className="py-1.5">
                  <LogicChip label="Or" className="w-20" />
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="mt-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <Plus className="h-3.5 w-3.5" /> Add Condition
        </button>

        <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
          <span className="w-14 shrink-0 text-sm text-muted-foreground">Then</span>
          <LogicChip label="Send email" className="w-40 flex-none" />
          <span className="shrink-0 text-sm text-muted-foreground">Using</span>
          <LogicChip label="Doctor Appointment - Status Up..." className="flex-1" />
          <span className="shrink-0 text-sm text-muted-foreground">To</span>
          <input
            placeholder="Enter an email address or select"
            className="flex-1 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Plus className="h-3.5 w-3.5" /> Add rule
          </button>
          <button className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <span className="w-20 shrink-0 text-sm text-muted-foreground">Otherwise</span>
          <LogicChip label="Select" className="flex-1" />
        </div>
      </div>
    </div>
  )
}
