export type FieldKind =
  | "short_text"
  | "long_text"
  | "contact_info"
  | "email"
  | "phone"
  | "number"
  | "website"
  | "checkbox"
  | "single_choice"
  | "terms"
  | "multiple_choice"
  | "dropdown"
  | "multiple_choice_dropdown"
  | "yes_no"
  | "like_dislike"
  | "star_rating"
  | "score"
  | "slider"
  | "ranking"
  | "matrix"
  | "date"
  | "time"
  | "date_time"
  | "file_upload"
  | "content"
  | "embed_video"
  | "table"
  | "product"
  | "section_divider"
  | "review"
  | "signature"
  | "repeating_section"
  | "hidden_field"
  | "ai_analysis"
  | "city"
  | "country"
  | "lookup"
  | "linked_record"
  | "user_profile"
  | "variable"
  // Legacy alias kept for the earlier PQ-1 demo data.
  | "suggestion"

export const fieldKindLabels: Record<FieldKind, string> = {
  short_text: "Short Text",
  long_text: "Long Text",
  contact_info: "Contact Info",
  email: "Email",
  phone: "Phone Number",
  number: "Number",
  website: "Website",
  checkbox: "Checkbox",
  single_choice: "Single Choice",
  terms: "Terms and Conditions",
  multiple_choice: "Multiple Choice",
  dropdown: "Dropdown",
  multiple_choice_dropdown: "Multiple choice dropdown",
  yes_no: "Yes/No",
  like_dislike: "Like/Dislike",
  star_rating: "Star Rating (CSAT®)",
  score: "Score (NPS®)",
  slider: "Slider",
  ranking: "Ranking",
  matrix: "Matrix",
  date: "Date",
  time: "Time",
  date_time: "Date Time",
  file_upload: "File Upload",
  content: "Content",
  embed_video: "Embed Video",
  table: "Table",
  product: "Product",
  section_divider: "Section Divider",
  review: "Review",
  signature: "Signature",
  repeating_section: "Repeating section",
  hidden_field: "Hidden Field",
  ai_analysis: "AI Analysis",
  city: "City",
  country: "Country",
  lookup: "Lookup",
  linked_record: "Linked to another record",
  user_profile: "User Profile",
  variable: "Variable",
  suggestion: "Suggestion",
}
