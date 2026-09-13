import { Clock, Plus, X } from "lucide-react"
import { OperatorDropdown } from "./operator-dropdown"
import type { ConditionOperator, OperatorOption } from "@/lib/logic-operators"
import { isChoiceField, type FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

export interface OnUpdateCondition {
  id: string
  fieldNumber: number
  fieldLabel: string
  fieldKind: FieldKind
  operator: ConditionOperator
  value?: string
}

interface OnUpdateConditionRowProps {
  condition: OnUpdateCondition
  operators: OperatorOption[]
  onOperatorChange: (operator: ConditionOperator) => void
  onValueChange: (value: string | undefined) => void
}

export function OnUpdateConditionRow({ condition, operators, onOperatorChange, onValueChange }: OnUpdateConditionRowProps) {
  // Choice-based fields additionally get an optional "to <option>" pill, low-emphasis on purpose —
  // it's a narrowing refinement, not a required field like the main field/operator selects.
  const showToPill = condition.operator === "is-changed" && isChoiceField(condition.fieldKind)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex w-60 shrink-0 items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm">
        <span className="flex items-center gap-1 rounded-[var(--radius-sm)] px-1.5 py-0.5 text-xs" style={{ background: "hsl(35 92% 90%)" }}>
          <Clock className="h-3 w-3" style={{ color: "hsl(35 80% 45%)" }} />
          {condition.fieldNumber}
        </span>
        <span className="flex-1 truncate">{condition.fieldLabel}</span>
      </div>

      <OperatorDropdown operators={operators} value={condition.operator} onChange={onOperatorChange} className="w-48 shrink-0" />

      {showToPill && (
        <>
          <span className="shrink-0 text-sm text-muted-foreground">to</span>
          {condition.value ? (
            <button
              onClick={() => onValueChange(undefined)}
              className="flex shrink-0 items-center gap-1 rounded-full bg-secondary py-1 pl-3 pr-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/70"
            >
              {condition.value}
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          ) : (
            <button
              onClick={() => onValueChange("A. Scheduled")}
              title="Narrow to one option (optional)"
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              )}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          )}
        </>
      )}
    </div>
  )
}
