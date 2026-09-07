import { notFound } from "next/navigation"
import { getIssue } from "@/lib/issues"
import { TocFormPrototype } from "@/components/toc-form-prototype"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"
import { AdvancedLogicDemo } from "@/components/logic/advanced-logic-demo"
import { EmailTemplateDemo } from "@/components/piping/email-template-demo"
import { FormulaDemo } from "@/components/formula/formula-demo"
import { MobileFormDemo } from "@/components/mobile-dropdown/mobile-form-demo"
import { OnboardingDemo } from "@/components/onboarding/onboarding-demo"
import { Pq39Demo } from "@/components/funnel/pq39-demo"
import { Pq40Demo } from "@/components/funnel/pq40-demo"
import { Pq41Demo } from "@/components/funnel/pq41-demo"
import { Pq42Demo } from "@/components/pages/pq42-demo"
import { AddBlockVariantsDemo } from "@/components/pages/add-block-variants-demo"
import { Pq45Demo } from "@/components/logic/pq45-demo"

export default async function IssuePrototypePage({
  params,
}: {
  params: Promise<{ slug: string; number: string }>
}) {
  const { slug, number } = await params
  const issue = getIssue(slug, Number(number))

  if (!issue) notFound()

  if (issue.id === "PQ-1") {
    return (
      <div className="h-svh">
        <FormEditorDemo />
      </div>
    )
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

  if (issue.id === "PQ-37") {
    return <OnboardingDemo />
  }

  if (issue.id === "PQ-39") {
    return <Pq39Demo />
  }

  if (issue.id === "PQ-40") {
    return <Pq40Demo />
  }

  if (issue.id === "PQ-41") {
    return <Pq41Demo />
  }

  if (issue.id === "PQ-42") {
    return <Pq42Demo />
  }

  if (issue.id === "PQ-43") {
    return <AddBlockVariantsDemo />
  }

  if (issue.id === "PQ-45") {
    return <Pq45Demo />
  }

  notFound()
}
