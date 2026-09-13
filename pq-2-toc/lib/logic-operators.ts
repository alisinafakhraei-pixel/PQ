export type ConditionOperator = "is-changed" | "is-answered" | "is-not-answered"

export interface OperatorOption {
  value: ConditionOperator
  label: string
  isNew?: boolean
}

/**
 * Operators available under the "On Update" trigger's condition builder, per Farokh's
 * follow-up on PQ-45: "is changed to" and "is updated" collapse into a single "is changed"
 * operator. It never requires a value on its own — a choice-based field additionally gets an
 * optional "to <option>" pill (see OnUpdateConditionRow), narrowing it to one specific value.
 */
export const ON_UPDATE_OPERATORS: OperatorOption[] = [
  { value: "is-changed", label: "is changed", isNew: true },
  { value: "is-answered", label: "is answered" },
  { value: "is-not-answered", label: "is not answered" },
]

export function operatorLabel(operators: OperatorOption[], value: ConditionOperator): string {
  return operators.find((op) => op.value === value)?.label ?? value
}
