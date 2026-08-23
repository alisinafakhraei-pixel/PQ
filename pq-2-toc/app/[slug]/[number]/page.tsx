import { notFound } from "next/navigation"
import { getIssue } from "@/lib/issues"
import { TocFormPrototype } from "@/components/toc-form-prototype"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"
import { AdvancedLogicDemo } from "@/components/logic/advanced-logic-demo"
import { EmailTemplateDemo } from "@/components/piping/email-template-demo"
import { FormulaDemo } from "@/components/formula/formula-demo"
import { MobileFormDemo } from "@/components/mobile-dropdown/mobile-form-demo"

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

  if (issue.id === "PQ-7") {
    return <EmailTemplateDemo />
  }

  if (issue.id === "PQ-13") {
    return <FormulaDemo />
  }

  if (issue.id === "PQ-15") {
    return <MobileFormDemo />
  }

  notFound()
}
