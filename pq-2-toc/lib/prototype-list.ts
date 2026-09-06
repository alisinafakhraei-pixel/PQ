import { issues } from "./issues"
import { standalonePrototypes } from "./standalone-prototypes"

export interface PrototypeCard {
  id: string
  title: string
  summary: string
  href: string
}

export const WEEKS = [
  { week: 1, label: "Week 1" },
  { week: 2, label: "Week 2" },
]

export function prototypesForWeek(week: number): PrototypeCard[] {
  const fromIssues = issues
    .filter((issue) => issue.week === week)
    .map((issue) => ({
      id: issue.id,
      title: issue.title,
      summary: issue.summary,
      href: `/${issue.slug}/${issue.number}`,
    }))

  const standalone = standalonePrototypes
    .filter((p) => p.week === week)
    .map((p) => ({ id: p.id, title: p.title, summary: p.summary, href: p.href }))

  return [...fromIssues, ...standalone]
}
