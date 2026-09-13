export type ConditionOperator = "is-changed-to" | "is-changed" | "is-answered" | "is-not-answered"

export interface OperatorOption {
  value: ConditionOperator
  label: string
  /** Whether this operator always needs a comparison value chip (e.g. legacy "is changed to X"). */
  needsValue: boolean
  isNew?: boolean
}

/**
 * Operators available under the "On Update" trigger's condition builder, per Farokh's
 * follow-up on PQ-45: "is changed to" and "is updated" collapse into a single "is changed"
 * operator. It never requires a value on its own — a choice-based field additionally gets an
 * optional "to <option>" segment (see OnUpdateConditionRow), narrowing it to one specific value.
 */
export const ON_UPDATE_OPERATORS: OperatorOption[] = [
  { value: "is-changed", label: "is changed", needsValue: false, isNew: true },
  { value: "is-answered", label: "is answered", needsValue: false },
  { value: "is-not-answered", label: "is not answered", needsValue: false },
]

/** Today's real behavior, before PQ-45 — only "is changed to" (one condition per possible value). */
export const ON_UPDATE_OPERATORS_BEFORE: OperatorOption[] = [
  { value: "is-changed-to", label: "is changed to", needsValue: true },
  { value: "is-answered", label: "is answered", needsValue: false },
  { value: "is-not-answered", label: "is not answered", needsValue: false },
]

export function operatorLabel(operators: OperatorOption[], value: ConditionOperator): string {
  return operators.find((op) => op.value === value)?.label ?? value
}
