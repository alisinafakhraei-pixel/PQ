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
    id: "PQ-2",
    number: 2,
    title: "Add table of contents sidebar to one-question-at-a-time and paginated forms",
    summary:
      "A Notion-style outline sidebar that lists every question or page and lets respondents jump straight to it, instead of stepping through one at a time.",
  },
]

export const issues: Issue[] = rawIssues.map((issue) => ({
  ...issue,
  slug: slugify(issue.title),
}))

export function getIssue(slug: string, number: number) {
  return issues.find((issue) => issue.slug === slug && issue.number === number)
}
