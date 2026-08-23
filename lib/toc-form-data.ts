export type FieldType = "short-text" | "email" | "phone" | "long-text" | "rating"

export interface FormField {
  id: string
  label: string
  description?: string
  type: FieldType
  required?: boolean
}

export interface FormPage {
  id: string
  title: string
  fields: FormField[]
}

export const formTitle = "Customer feedback survey"

export const formPages: FormPage[] = [
  {
    id: "welcome",
    title: "Basic info",
    fields: [
      { id: "full-name", label: "What's your full name?", type: "short-text", required: true },
      { id: "email", label: "What's your email address?", type: "email", required: true },
    ],
  },
  {
    id: "company",
    title: "About your company",
    fields: [
      { id: "company", label: "What company do you work at?", type: "short-text" },
      { id: "phone", label: "What's your phone number?", type: "phone" },
    ],
  },
  {
    id: "usage",
    title: "Product usage",
    fields: [
      {
        id: "role",
        label: "What's your role on the team?",
        description: "e.g. Product Manager, Designer, Engineer",
        type: "short-text",
      },
      {
        id: "frequency",
        label: "How often do you use our product?",
        type: "short-text",
      },
    ],
  },
  {
    id: "feedback",
    title: "Your feedback",
    fields: [
      {
        id: "rating",
        label: "How likely are you to recommend us to a friend?",
        type: "rating",
        required: true,
      },
      {
        id: "comments",
        label: "Anything else you'd like to share?",
        type: "long-text",
      },
    ],
  },
  {
    id: "wrap-up",
    title: "Wrap up",
    fields: [
      {
        id: "referral",
        label: "How did you hear about us?",
        type: "short-text",
      },
    ],
  },
]

// Flattened list of every question, used for one-question-at-a-time mode.
export const oneQuestionSteps = formPages.flatMap((page) =>
  page.fields.map((field) => ({ page, field }))
)
