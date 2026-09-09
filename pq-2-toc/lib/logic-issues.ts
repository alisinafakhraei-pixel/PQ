import type { FieldKind } from "./field-types"

export type FieldIssue = "duplicate" | "incomplete"

export interface LogicRuleContent {
  ifLabel: string
  ifFieldKind: FieldKind
  ifFieldNumber: number
  operatorLabel: string
  /** Left undefined for an incomplete rule — no "Then" action chosen yet. */
  thenVerb?: string
  thenLabel?: string
  thenFieldKind?: FieldKind
  thenFieldNumber?: number
}

export interface LogicIssueField {
  id: string
  number: number
  kind: FieldKind
  title: string
  rule?: LogicRuleContent
  issue?: FieldIssue
  /** Only for issue "duplicate" — the id of the other field with the exact same rule. */
  duplicateOf?: string
}

/**
 * Two different fields ("What's your name?" and "Phone Number") ended up with the exact same
 * rule (a duplicate). "Company Name" has a rule with no "Then" action chosen yet (incomplete).
 * "Email" has a different, complete rule — not flagged. "Long Text" has no rule at all yet.
 */
export const LOGIC_ISSUE_FIELDS: LogicIssueField[] = [
  {
    id: "f1",
    number: 1,
    kind: "short_text",
    title: "What's your name?",
    issue: "duplicate",
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
    issue: "duplicate",
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
  {
    id: "f5",
    number: 5,
    kind: "short_text",
    title: "Company Name",
    issue: "incomplete",
    rule: {
      ifLabel: "Company Name",
      ifFieldKind: "short_text",
      ifFieldNumber: 5,
      operatorLabel: "is answered",
    },
  },
]
