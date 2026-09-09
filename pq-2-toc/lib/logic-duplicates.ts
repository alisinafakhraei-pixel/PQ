import type { FieldKind } from "./field-types"

export interface DuplicateRuleContent {
  ifLabel: string
  ifFieldKind: FieldKind
  ifFieldNumber: number
  operatorLabel: string
  thenVerb: string
  thenLabel: string
  thenFieldKind: FieldKind
  thenFieldNumber: number
}

export interface DuplicateField {
  id: string
  number: number
  kind: FieldKind
  title: string
  /** Undefined when the field has no rule yet. */
  rule?: DuplicateRuleContent
  /** The other field id this rule is an exact duplicate of, when it is one. */
  duplicateOf?: string
}

/**
 * Two different fields ("What's your name?" and "Phone Number") ended up with the exact
 * same rule (If Email is answered -> Show Email) — a realistic, easy-to-miss duplicate.
 * "Email" has a different rule (not a duplicate); "Long Text" has none yet.
 */
export const DUPLICATE_DEMO_FIELDS: DuplicateField[] = [
  {
    id: "f1",
    number: 1,
    kind: "short_text",
    title: "What's your name?",
    duplicateOf: "f4",
    rule: {
      ifLabel: "Email",
      ifFieldKind: "email",
      ifFieldNumber: 3,
      operatorLabel: "is answered",
      thenVerb: "Show",
      thenLabel: "Email",
      thenFieldKind: "email",
      thenFieldNumber: 3,
    },
  },
  { id: "f2", number: 2, kind: "long_text", title: "Long Text" },
  {
    id: "f3",
    number: 3,
    kind: "email",
    title: "Email",
    rule: {
      ifLabel: "What's your name?",
      ifFieldKind: "short_text",
      ifFieldNumber: 1,
      operatorLabel: "is equal to",
      thenVerb: "Hide",
      thenLabel: "Phone Number",
      thenFieldKind: "phone",
      thenFieldNumber: 4,
    },
  },
  {
    id: "f4",
    number: 4,
    kind: "phone",
    title: "Phone Number",
    duplicateOf: "f1",
    rule: {
      ifLabel: "Email",
      ifFieldKind: "email",
      ifFieldNumber: 3,
      operatorLabel: "is answered",
      thenVerb: "Show",
      thenLabel: "Email",
      thenFieldKind: "email",
      thenFieldNumber: 3,
    },
  },
]
