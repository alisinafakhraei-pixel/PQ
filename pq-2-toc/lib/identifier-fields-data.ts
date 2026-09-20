import type { FieldKind } from "./field-types"

export interface IdentifierField {
  id: string
  fieldNumber: number
  kind: FieldKind
  title: string
  /** The raw internal slug shown today (e.g. "WHDSPTIM") — not shown in the redesign. */
  internalId: string
  /** The readable @tag shown in the redesign, same format as answer piping (e.g. "first_name" -> "@first_name"). */
  tag: string
}

export interface SystemIdentifier {
  id: string
  label: string
}

export const IDENTIFIER_FIELDS: IdentifierField[] = [
  { id: "first_name", fieldNumber: 1, kind: "short_text", title: "First name", internalId: "WHDSPTIM", tag: "first_name" },
  { id: "last_name", fieldNumber: 2, kind: "short_text", title: "Last name", internalId: "q18fmAca", tag: "last_name" },
  { id: "email", fieldNumber: 3, kind: "email", title: "Email", internalId: "9kLpQ2ac", tag: "email" },
]

export const SYSTEM_IDENTIFIERS: SystemIdentifier[] = [
  { id: "response_id", label: "Response ID" },
  { id: "tracking_id", label: "Tracking ID" },
]
