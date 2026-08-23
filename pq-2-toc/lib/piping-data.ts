import type { FieldKind } from "./field-types"

export interface SystemVariableItem {
  label: string
  tag: string
}

export interface SystemVariableGroup {
  title: string
  items: SystemVariableItem[]
}

export const systemVariableGroups: SystemVariableGroup[] = [
  {
    title: "Form info",
    items: [
      { label: "Form logo", tag: "form_logo" },
      { label: "Form title", tag: "form_title" },
      { label: "Form description", tag: "form_description" },
      { label: "Form public URL", tag: "form_full_url" },
    ],
  },
  {
    title: "Submitted response",
    items: [
      { label: "All Fields (Including empty)", tag: "result_all" },
      { label: "Answered Fields (Including hidden & admin)", tag: "answered_all" },
      { label: "Answered Fields (Public only)", tag: "answered_public" },
      { label: "Respondent email", tag: "user_email" },
    ],
  },
]

export interface ConnectedFormField {
  kind: FieldKind
  title: string
  tag: string
}

export interface ConnectableForm {
  id: string
  title: string
  fields: ConnectedFormField[]
  reviewLabel?: string
}

export const connectableForms: ConnectableForm[] = [
  {
    id: "feedback",
    title: "Customer Feedback Survey",
    fields: [
      { kind: "star_rating", title: "Overall Satisfaction", tag: "overall_satisfaction" },
      { kind: "checkbox", title: "Expectations Met", tag: "expectations_met" },
      { kind: "long_text", title: "Suggestions", tag: "suggestions" },
      { kind: "dropdown", title: "Dropdown", tag: "dropdown" },
      { kind: "variable", title: "Variable", tag: "variable" },
    ],
    reviewLabel: "Review answers",
  },
  {
    id: "job-application",
    title: "Job Application",
    fields: [
      { kind: "short_text", title: "Full Name", tag: "full_name" },
      { kind: "email", title: "Email", tag: "email" },
      { kind: "file_upload", title: "Resume", tag: "resume" },
      { kind: "long_text", title: "Cover Letter", tag: "cover_letter" },
    ],
    reviewLabel: "Review answers",
  },
  {
    id: "event-rsvp",
    title: "Event RSVP",
    fields: [
      { kind: "short_text", title: "Guest Name", tag: "guest_name" },
      { kind: "yes_no", title: "Attending?", tag: "attending" },
      { kind: "number", title: "Number of Guests", tag: "guest_count" },
    ],
    reviewLabel: "Review answers",
  },
  {
    id: "support-ticket",
    title: "Support Ticket",
    fields: [
      { kind: "short_text", title: "Subject", tag: "subject" },
      { kind: "dropdown", title: "Priority", tag: "priority" },
      { kind: "long_text", title: "Description", tag: "description" },
    ],
    reviewLabel: "Review answers",
  },
  {
    id: "newsletter-signup",
    title: "Newsletter Signup",
    fields: [
      { kind: "email", title: "Email", tag: "email" },
      { kind: "checkbox", title: "Topics of Interest", tag: "topics" },
    ],
    reviewLabel: "Review answers",
  },
  {
    id: "product-waitlist",
    title: "Product Waitlist",
    fields: [
      { kind: "short_text", title: "Company Name", tag: "company_name" },
      { kind: "number", title: "Team Size", tag: "team_size" },
      { kind: "website", title: "Website", tag: "website" },
    ],
    reviewLabel: "Review answers",
  },
]

/** Forms shown up front in the piping menu before the user searches all forms. */
export const RECENT_FORM_COUNT = 3
