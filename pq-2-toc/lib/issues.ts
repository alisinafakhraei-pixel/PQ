export interface Issue {
  id: string
  number: number
  title: string
  slug: string
  summary: string
  /** Which "Week" page this prototype is grouped under on the home page. */
  week: number
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const rawIssues: Omit<Issue, "slug">[] = [
  {
    id: "PQ-1",
    number: 1,
    week: 1,
    title: "Add \"Magic ID\" generation button to bulk-assign IDs to manually created fields",
    summary:
      "A Magic ID button in the AI menu scans a form and auto-generates IDs for every field that doesn't already have one.",
  },
  {
    id: "PQ-2",
    number: 2,
    week: 1,
    title: "Add table of contents sidebar to one-question-at-a-time and paginated forms",
    summary:
      "A Notion-style outline sidebar that lists every question or page and lets respondents jump straight to it, instead of stepping through one at a time.",
  },
  {
    id: "PQ-6",
    number: 6,
    week: 1,
    title: "Add \"Add field\" button directly in the logic page",
    summary:
      "A field-type picker to add a new field right from Advanced Logic, with a toggle to compare placing the button at the top vs. after each question.",
  },
  {
    id: "PQ-7",
    number: 7,
    week: 1,
    title: "Add form fields to the answer piping dropdown in email templates",
    summary:
      "A \"Connect your forms\" section in the @ answer-piping menu lets you pick another form, then pick one of its fields, instead of typing a field ID by hand.",
  },
  {
    id: "PQ-13",
    number: 13,
    week: 1,
    title: "Add a full formula editor for calculated fields",
    summary:
      "An expandable formula editor with math operator buttons, @ mentions to reference fields, and real-time validation, opened from the compact Default Formula input.",
  },
  {
    id: "PQ-15",
    number: 15,
    week: 1,
    title: "Optimized mobile dropdowns",
    summary:
      "Dropdowns open in a mobile-friendly bottom sheet, showing the search input only when the option list is long enough to need it.",
  },
  {
    id: "PQ-37",
    number: 37,
    week: 2,
    title: "Collapse onboarding to one page with just name and workspace title",
    summary:
      "Collapses the 4-screen onboarding (name → workspace → subdomain → use-case) into one screen, removing the steps that were losing 28% of new users before they reached the product.",
  },
  {
    id: "PQ-39",
    number: 39,
    week: 2,
    title: "Skip menu and modal, land first project directly in the form editor",
    summary:
      "For a user's very first project, \"+ New\" skips the 9-type menu and Project setup modal entirely and lands them straight in the Form Editor.",
  },
  {
    id: "PQ-40",
    number: 40,
    week: 2,
    title: "Land all newly created forms in the form editor, not the project or responses view",
    summary:
      "Every newly created form — any project number, manual or AI-generated — redirects to the Form Editor instead of a \"No responses found\" dead end.",
  },
  {
    id: "PQ-41",
    number: 41,
    week: 2,
    title: "Add Save and Share tooltips to the form editor",
    summary:
      "Two dismissible tooltips, shown only the first time a user opens the editor, calling out the Save and Share actions that actually get a form published.",
  },
  {
    id: "PQ-42",
    number: 42,
    week: 2,
    title: "Add a setup modal for New Page creation (blank, new form, or linked form view)",
    summary:
      "A setup modal asks blank vs. new form vs. linked form responses before a page is created, with a Form/Table/Kanban/Gallery follow-up for linked forms, and unifies both \"add page\" entry points behind it.",
  },
  {
    id: "PQ-43",
    number: 43,
    week: 2,
    title: "Make the in-page \"add block\" button easier to discover",
    summary:
      "Three alternatives to the hover-only + for adding a table, form, Kanban, or page, applied to every section of a project page: always-visible (dimmed), a page-level toolbar button, and an end-of-content prompt.",
  },
]

export const issues: Issue[] = rawIssues.map((issue) => ({
  ...issue,
  slug: slugify(issue.title),
}))

export function getIssue(slug: string, number: number) {
  return issues.find((issue) => issue.slug === slug && issue.number === number)
}
