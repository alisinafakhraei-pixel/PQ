export interface Issue {
  id: string
  number: number
  title: string
  slug: string
  summary: string
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
    title: "Add \"Magic ID\" generation button to bulk-assign IDs to manually created fields",
    summary:
      "A Magic ID button in the AI menu scans a form and auto-generates IDs for every field that doesn't already have one.",
  },
  {
    id: "PQ-2",
    number: 2,
    title: "Add table of contents sidebar to one-question-at-a-time and paginated forms",
    summary:
      "A Notion-style outline sidebar that lists every question or page and lets respondents jump straight to it, instead of stepping through one at a time.",
  },
  {
    id: "PQ-6",
    number: 6,
    title: "Add \"Add field\" button directly in the logic page",
    summary:
      "A field-type picker to add a new field right from Advanced Logic, with a toggle to compare placing the button at the top vs. after each question.",
  },
  {
    id: "PQ-7",
    number: 7,
    title: "Add form fields to the answer piping dropdown in email templates",
    summary:
      "A \"Connect your forms\" section in the @ answer-piping menu lets you pick another form, then pick one of its fields, instead of typing a field ID by hand.",
  },
]

export const issues: Issue[] = rawIssues.map((issue) => ({
  ...issue,
  slug: slugify(issue.title),
}))

export function getIssue(slug: string, number: number) {
  return issues.find((issue) => issue.slug === slug && issue.number === number)
}
