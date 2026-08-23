import { fieldKindLabels, type FieldKind } from "./field-types"

export interface LogicField {
  id: string
  kind: FieldKind
  title: string
  /** Only field "f1" carries hardcoded demo rule content; everything else renders the empty state. */
  hasDemoRules?: boolean
  isNew?: boolean
}

export const initialLogicFields: LogicField[] = [
  { id: "f1", kind: "short_text", title: "What's your name?", hasDemoRules: true },
  { id: "f2", kind: "long_text", title: "Long Text" },
  { id: "f3", kind: "email", title: "Email" },
  { id: "f4", kind: "phone", title: "Phone Number" },
]

export function insertNewFieldAfter(
  fields: LogicField[],
  afterId: string | null,
  kind: FieldKind,
  nextIndex: number
): LogicField[] {
  const newField: LogicField = {
    id: `new-${nextIndex}`,
    kind,
    title: fieldKindLabels[kind],
    isNew: true,
  }

  if (afterId === null) {
    return [...fields, newField]
  }

  const idx = fields.findIndex((f) => f.id === afterId)
  if (idx === -1) return [...fields, newField]

  const copy = [...fields]
  copy.splice(idx + 1, 0, newField)
  return copy
}
