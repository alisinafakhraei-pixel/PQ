import { Clock } from "lucide-react"
import { OperatorDropdown } from "./operator-dropdown"
import { LogicChip } from "./logic-chip"
import type { ConditionOperator, OperatorOption } from "@/lib/logic-operators"

export interface OnUpdateCondition {
  id: string
  fieldNumber: number
  fieldLabel: string
  operator: ConditionOperator
  value?: string
}

interface OnUpdateConditionRowProps {
  condition: OnUpdateCondition
  operators: OperatorOption[]
  onOperatorChange: (operator: ConditionOperator) => void
}

export function OnUpdateConditionRow({ condition, operators, onOperatorChange }: OnUpdateConditionRowProps) {
  const needsValue = operators.find((op) => op.value === condition.operator)?.needsValue ?? true

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm">
        <span className="flex items-center gap-1 rounded-[var(--radius-sm)] px-1.5 py-0.5 text-xs" style={{ background: "hsl(35 92% 90%)" }}>
          <Clock className="h-3 w-3" style={{ color: "hsl(35 80% 45%)" }} />
          {condition.fieldNumber}
        </span>
        <span className="flex-1 truncate">{condition.fieldLabel}</span>
      </div>

      <OperatorDropdown operators={operators} value={condition.operator} onChange={onOperatorChange} />

      {needsValue && <LogicChip label={condition.value ?? "Select"} />}
    </div>
  )
}
