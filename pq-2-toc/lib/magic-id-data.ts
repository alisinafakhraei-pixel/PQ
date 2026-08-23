import type { FieldKind } from "./field-types"

export type { FieldKind }

export interface EditorField {
  id: string
  kind: FieldKind
  title: string
  fieldId: string | null
}

export const initialFields: EditorField[] = [
  { id: "f1", kind: "short_text", title: "What's your name?", fieldId: "whats_your_name" },
  { id: "f2", kind: "long_text", title: "Long Text", fieldId: null },
  { id: "f3", kind: "email", title: "Email", fieldId: "email" },
  { id: "f4", kind: "phone", title: "Phone Number", fieldId: null },
  { id: "f5", kind: "website", title: "Website", fieldId: null },
  { id: "f6", kind: "linked_record", title: "Linked to another record", fieldId: null },
  { id: "f7", kind: "suggestion", title: "Suggestions for improvement", fieldId: null },
  { id: "f8", kind: "user_profile", title: "User Profile", fieldId: "user_profile" },
  { id: "f9", kind: "email", title: "Email", fieldId: null },
  { id: "f10", kind: "short_text", title: "Full name", fieldId: null },
  { id: "f11", kind: "short_text", title: "Company name", fieldId: null },
]

export { fieldKindLabels } from "./field-types"

function slugifyId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_|_$)/g, "")
}

/** Generates a unique field_id for every field missing one, without touching existing IDs. */
export function generateMagicIds(fields: EditorField[]): EditorField[] {
  const taken = new Set(fields.map((f) => f.fieldId).filter(Boolean) as string[])

  return fields.map((field) => {
    if (field.fieldId) return field

    const base = slugifyId(field.title) || field.kind
    let candidate = base
    let n = 2
    while (taken.has(candidate)) {
      candidate = `${base}_${n}`
      n += 1
    }
    taken.add(candidate)
    return { ...field, fieldId: candidate }
  })
}
