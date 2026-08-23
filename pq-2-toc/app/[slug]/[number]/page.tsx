import { notFound } from "next/navigation"
import { getIssue } from "@/lib/issues"
import { TocFormPrototype } from "@/components/toc-form-prototype"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"
import { AdvancedLogicDemo } from "@/components/logic/advanced-logic-demo"

export default async function IssuePrototypePage({
  params,
}: {
  params: Promise<{ slug: string; number: string }>
}) {
  const { slug, number } = await params
  const issue = getIssue(slug, Number(number))

  if (!issue) notFound()

  if (issue.id === "PQ-1") {
    return <FormEditorDemo />
  }

  if (issue.id === "PQ-2") {
    return <TocFormPrototype />
  }

  if (issue.id === "PQ-6") {
    return <AdvancedLogicDemo />
  }

  notFound()
}
