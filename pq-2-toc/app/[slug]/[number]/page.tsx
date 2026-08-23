import { notFound } from "next/navigation"
import { getIssue } from "@/lib/issues"
import { TocFormPrototype } from "@/components/toc-form-prototype"

export default async function IssuePrototypePage({
  params,
}: {
  params: Promise<{ slug: string; number: string }>
}) {
  const { slug, number } = await params
  const issue = getIssue(slug, Number(number))

  if (!issue) notFound()

  if (issue.id === "PQ-2") {
    return <TocFormPrototype />
  }

  notFound()
}
