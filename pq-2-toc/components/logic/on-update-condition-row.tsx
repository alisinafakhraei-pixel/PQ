import { Clock, Plus } from "lucide-react"
import { OperatorDropdown } from "./operator-dropdown"
import { LogicChip } from "./logic-chip"
import type { ConditionOperator, OperatorOption } from "@/lib/logic-operators"
import { isChoiceField, type FieldKind } from "@/lib/field-types"

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
}

export function OnUpdateConditionRow({ condition, operators, onOperatorChange }: OnUpdateConditionRowProps) {
  // Legacy "is changed to" (pre-PQ-45 baseline): the value always follows the operator directly.
  const showLegacyValue = operators.find((op) => op.value === condition.operator)?.needsValue ?? false
  // New unified "is changed": choice-based fields additionally get an optional "to <option>" segment.
  const showToSegment = condition.operator === "is-changed" && isChoiceField(condition.fieldKind)

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

      {showLegacyValue && <LogicChip label={condition.value ?? "Select"} className="min-w-[160px] flex-1" />}

      {showToSegment && (
        <>
          <span className="shrink-0 text-sm text-muted-foreground">to</span>
          {condition.value ? (
            <LogicChip label={condition.value} className="min-w-[160px] flex-1" />
          ) : (
            <button className="flex shrink-0 items-center gap-1.5 rounded-[var(--radius)] border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
              <Plus className="h-3.5 w-3.5" /> Add value
            </button>
          )}
        </>
      )}
    </div>
  )
}
