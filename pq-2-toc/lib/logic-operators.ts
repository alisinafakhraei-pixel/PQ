export type ConditionOperator = "is-changed-to" | "is-updated" | "is-answered" | "is-not-answered"

export interface OperatorOption {
  value: ConditionOperator
  label: string
  /** Whether this operator needs a comparison value chip (e.g. "is changed to X"). */
  needsValue: boolean
  isNew?: boolean
}

/** Operators available under the "On Update" trigger's condition builder. */
export const ON_UPDATE_OPERATORS: OperatorOption[] = [
  { value: "is-changed-to", label: "is changed to", needsValue: true },
  { value: "is-updated", label: "is updated", needsValue: false, isNew: true },
  { value: "is-answered", label: "is answered", needsValue: false },
  { value: "is-not-answered", label: "is not answered", needsValue: false },
]

/** The same list, without "is updated" — today's behavior before PQ-45. */
export const ON_UPDATE_OPERATORS_BEFORE: OperatorOption[] = ON_UPDATE_OPERATORS.filter(
  (op) => op.value !== "is-updated"
)

export function operatorLabel(operators: OperatorOption[], value: ConditionOperator): string {
  return operators.find((op) => op.value === value)?.label ?? value
}
