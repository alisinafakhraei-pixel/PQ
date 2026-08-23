import type { FieldKind } from "./field-types"

export interface FieldTypeOption {
  kind: FieldKind
  description?: string
}

export interface FieldTypeGroup {
  title: string
  items: FieldTypeOption[]
}

export const fieldTypeGroups: FieldTypeGroup[] = [
  {
    title: "Text",
    items: [{ kind: "short_text" }, { kind: "long_text" }],
  },
  {
    title: "Contact Info",
    items: [
      { kind: "contact_info", description: "Add all the info needed for contact in one click" },
      { kind: "email" },
      { kind: "phone" },
      { kind: "number" },
      { kind: "website" },
    ],
  },
  {
    title: "Choice",
    items: [
      { kind: "checkbox" },
      { kind: "single_choice" },
      { kind: "terms", description: "Add terms, GDPR or privacy clauses" },
      { kind: "multiple_choice" },
      { kind: "dropdown" },
      { kind: "multiple_choice_dropdown" },
      { kind: "yes_no" },
      { kind: "like_dislike" },
    ],
  },
  {
    title: "Rating & Ranking",
    items: [
      { kind: "star_rating", description: "Rate from 1 to 5" },
      { kind: "score", description: "Rate from 0 to 10" },
      { kind: "slider", description: "Let respondents select a score by dragging a slider." },
      { kind: "ranking", description: "Let respondents rank options in order of preference." },
      { kind: "matrix", description: "Multiple choice grid used for likert scale" },
    ],
  },
  {
    title: "Date & Time",
    items: [{ kind: "date" }, { kind: "time" }, { kind: "date_time" }],
  },
  {
    title: "Form Structure",
    items: [
      { kind: "file_upload", description: "Allow file uploads" },
      { kind: "content", description: "Write content or create sections" },
      { kind: "embed_video", description: "Embed YouTube & Vimeo videos" },
      { kind: "table", description: "Capture multiple rows at once" },
      { kind: "product", description: "Showcase your products" },
      { kind: "section_divider", description: "Create sections and dividers in your form" },
      { kind: "review", description: "Let respondents review their answers before submitting." },
      { kind: "signature", description: "Capture respondent's e-signature" },
      { kind: "repeating_section", description: "Capturing multiple addresses, rows, etc." },
    ],
  },
  {
    title: "Other",
    items: [
      { kind: "hidden_field", description: "Not visible in your form" },
      { kind: "ai_analysis", description: "Analyze each response with AI and store the result for your team only" },
      { kind: "city", description: "List of all cities in the world" },
      { kind: "country", description: "List of all countries in the world" },
      { kind: "lookup", description: "Look up data from other forms & databases" },
      { kind: "linked_record", description: "Connect records from other forms" },
      { kind: "user_profile", description: "Connect user to form" },
    ],
  },
]
