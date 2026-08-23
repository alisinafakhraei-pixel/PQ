import type { FieldKind } from "./field-types"

export interface FormulaFormField {
  id: string
  kind: FieldKind
  title: string
}

export const formulaFormFields: FormulaFormField[] = [
  { id: "price", kind: "number", title: "Price" },
  { id: "quantity", kind: "number", title: "Quantity" },
  { id: "overall_satisfaction", kind: "star_rating", title: "Overall Satisfaction" },
  { id: "expectations_met", kind: "checkbox", title: "Expectations Met" },
  { id: "suggestions", kind: "long_text", title: "Suggestions" },
]

export type FormulaToken =
  | { id: string; kind: "text"; value: string }
  | { id: string; kind: "field"; fieldId: string }

export function formulaFieldById(id: string) {
  return formulaFormFields.find((f) => f.id === id)
}

/** Flattens tokens into a plain string, e.g. for the compact preview or a fallback render. */
export function tokensToPlainText(tokens: FormulaToken[]): string {
  return tokens
    .map((t) => (t.kind === "text" ? t.value : `@${formulaFieldById(t.fieldId)?.title ?? t.fieldId}`))
    .join("")
}

export function isEmptyFormula(tokens: FormulaToken[]): boolean {
  return tokens.every((t) => t.kind === "text" && t.value.trim() === "")
}

export type FormulaValidity = "empty" | "incomplete" | "valid"

/** A lightweight, demo-grade validity check — not a real expression parser. */
export function checkFormulaValidity(tokens: FormulaToken[]): FormulaValidity {
  if (isEmptyFormula(tokens)) return "empty"

  const text = tokensToPlainText(tokens)
  const opens = (text.match(/\(/g) ?? []).length
  const closes = (text.match(/\)/g) ?? []).length
  if (opens !== closes) return "incomplete"

  const trimmed = text.trim()
  if (/[+\-×÷(]$/.test(trimmed)) return "incomplete"

  return "valid"
}
