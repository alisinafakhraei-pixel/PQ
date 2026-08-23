"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import { TocSidebar, type TocItem } from "./toc-sidebar"
import { FieldRenderer } from "./field-renderer"
import { formPages, formTitle, oneQuestionSteps } from "@/lib/toc-form-data"
import { cn } from "@/lib/utils"

type Mode = "one-question" | "paginated"

export function TocFormPrototype() {
  const [mode, setMode] = useState<Mode>("one-question")
  const [oneQuestionIndex, setOneQuestionIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)

  const activeIndex = mode === "one-question" ? oneQuestionIndex : pageIndex
  const total = mode === "one-question" ? oneQuestionSteps.length : formPages.length

  const tocItems: TocItem[] = useMemo(() => {
    if (mode === "one-question") {
      return oneQuestionSteps.map((step, i) => ({
        id: step.field.id,
        index: i,
        title: step.field.label,
        subtitle: step.page.title,
      }))
    }
    return formPages.map((page, i) => ({
      id: page.id,
      index: i,
      title: page.title,
      subtitle: `${page.fields.length} question${page.fields.length > 1 ? "s" : ""}`,
    }))
  }, [mode])

  const completedIndexes = useMemo(
    () => new Set(Array.from({ length: activeIndex }, (_, i) => i)),
    [activeIndex]
  )

  function handleSelect(index: number) {
    if (mode === "one-question") setOneQuestionIndex(index)
    else setPageIndex(index)
  }

  function goNext() {
    if (activeIndex < total - 1) handleSelect(activeIndex + 1)
  }

  function goBack() {
    if (activeIndex > 0) handleSelect(activeIndex - 1)
  }

  function switchMode(next: Mode) {
    setMode(next)
    setOneQuestionIndex(0)
    setPageIndex(0)
  }

  return (
    <div className="flex h-svh flex-col bg-background">
      {/* Prototype control bar — not part of the form itself */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All prototypes
        </Link>
        <div className="flex items-center rounded-full border border-border bg-background p-0.5">
          <button
            onClick={() => switchMode("one-question")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              mode === "one-question" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            One question at a time
          </button>
          <button
            onClick={() => switchMode("paginated")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              mode === "paginated" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Paginated
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <TocSidebar
          items={tocItems}
          activeIndex={activeIndex}
          completedIndexes={completedIndexes}
          onSelect={handleSelect}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 w-full bg-secondary">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
            />
          </div>

          <div className="flex flex-1 items-center justify-center overflow-y-auto px-8 py-10">
            <div className="w-full max-w-xl">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {formTitle}
              </p>

              {mode === "one-question" ? (
                <div key={oneQuestionIndex} className="space-y-6">
                  <FieldRenderer field={oneQuestionSteps[oneQuestionIndex].field} />
                </div>
              ) : (
                <div key={pageIndex} className="space-y-8">
                  <h2 className="text-2xl font-bold">{formPages[pageIndex].title}</h2>
                  {formPages[pageIndex].fields.map((field) => (
                    <FieldRenderer key={field.id} field={field} />
                  ))}
                </div>
              )}

              <div className="mt-8 flex items-center gap-3">
                {activeIndex > 0 && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1 rounded-[var(--radius)] px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <button
                  onClick={goNext}
                  disabled={activeIndex === total - 1}
                  className="rounded-[var(--radius)] bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {activeIndex === total - 1 ? "Submit" : "Continue"}
                </button>
                <span className="ml-auto text-xs text-muted-foreground">
                  {activeIndex + 1} / {total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
