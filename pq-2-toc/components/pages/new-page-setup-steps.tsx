"use client"

import { useMemo, useState } from "react"
import {
  X,
  ArrowLeft,
  FileText,
  Sparkles,
  Link2,
  Table2,
  Kanban,
  GalleryHorizontalEnd,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type PageViewType = "form" | "table" | "kanban" | "gallery"

export type NewPageChoice =
  | { type: "blank" }
  | { type: "new-form"; formTitle: string }
  | { type: "linked-form"; formName: string; view: PageViewType }

const PAGE_TYPES = [
  {
    type: "blank" as const,
    icon: FileText,
    title: "Blank page",
    description: "Start with an empty page and build it out later.",
  },
  {
    type: "new-form" as const,
    icon: Sparkles,
    title: "Page with a new form",
    description: "Create a fresh form and drop it straight onto this page.",
  },
  {
    type: "linked-form" as const,
    icon: Link2,
    title: "Page linked to a form's responses",
    description: "Show an existing form's responses right on this page.",
  },
]

const EXISTING_FORMS = [
  "Post-treatment follow-up & recovery check",
  "Signature form",
  "Lead generation form",
  "Employee evaluation",
  "ROI calculator",
  "HR portal",
]

const VIEW_TYPES: { value: PageViewType; icon: typeof FileText; label: string; description: string }[] = [
  { value: "form", icon: FileText, label: "Form", description: "Show the form itself, ready to fill out." },
  { value: "table", icon: Table2, label: "Table", description: "A spreadsheet-style list of every response." },
  { value: "kanban", icon: Kanban, label: "Kanban", description: "Group responses into draggable status columns." },
  { value: "gallery", icon: GalleryHorizontalEnd, label: "Gallery", description: "Browse responses as visual cards." },
]

type Step = "type" | "form-title" | "form" | "view"

const STEP_TITLES: Record<Step, string> = {
  type: "New page",
  "form-title": "Name your form",
  form: "Which form?",
  view: "How should responses show up?",
}

interface NewPageSetupStepsProps {
  onCreate: (choice: NewPageChoice) => void
  onClose: () => void
}

/**
 * The actual step content of the "New page" setup flow — asks blank vs. new form vs. linked
 * form responses, then a form title (new form) or a form search + view-type picker (linked
 * form). Shared between NewPageSetupModal (centered popup) and NewPageSetupDropdown (anchored
 * panel) so the two UI treatments stay in sync.
 */
export function NewPageSetupSteps({ onCreate, onClose }: NewPageSetupStepsProps) {
  const [step, setStep] = useState<Step>("type")
  const [formTitleInput, setFormTitleInput] = useState("")
  const [query, setQuery] = useState("")
  const [formName, setFormName] = useState<string | null>(null)

  const filteredForms = useMemo(
    () => EXISTING_FORMS.filter((form) => form.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  )

  function handleBack() {
    if (step === "view") setStep("form")
    else setStep("type")
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        {step !== "type" && (
          <button
            onClick={handleBack}
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <h2 className="flex-1 text-base font-semibold">{STEP_TITLES[step]}</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>

      {step === "type" && (
        <>
          <p className="mb-3 text-xs text-muted-foreground">What do you want to add?</p>
          <div className="space-y-2">
            {PAGE_TYPES.map(({ type, icon: Icon, title, description }) => (
              <button
                key={type}
                onClick={() => {
                  if (type === "linked-form") setStep("form")
                  else if (type === "new-form") setStep("form-title")
                  else onCreate({ type })
                }}
                className="flex w-full items-start gap-3 rounded-[var(--radius)] border border-border p-3 text-left transition-colors hover:border-primary/40 hover:bg-secondary/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-secondary">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-xs text-muted-foreground">{description}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === "form-title" && (
        <>
          <p className="mb-3 text-xs text-muted-foreground">What&apos;s this form called?</p>
          <input
            autoFocus
            value={formTitleInput}
            onChange={(e) => setFormTitleInput(e.target.value)}
            placeholder="Untitled form"
            className="mb-4 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={() => onCreate({ type: "new-form", formTitle: formTitleInput.trim() || "Untitled form" })}
            className="w-full rounded-[var(--radius)] px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            Create form
          </button>
        </>
      )}

      {step === "form" && (
        <>
          <p className="mb-3 text-xs text-muted-foreground">Search for the form whose responses you want to show.</p>
          <div className="mb-3 flex items-center gap-2 rounded-[var(--radius)] border border-border bg-background px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search forms..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-56 space-y-0.5 overflow-y-auto">
            {filteredForms.length === 0 ? (
              <p className="px-1 py-4 text-center text-xs text-muted-foreground">No forms match &quot;{query}&quot;.</p>
            ) : (
              filteredForms.map((form) => (
                <button
                  key={form}
                  onClick={() => {
                    setFormName(form)
                    setStep("view")
                  }}
                  className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-left text-sm transition-colors hover:bg-secondary"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{form}</span>
                </button>
              ))
            )}
          </div>
        </>
      )}

      {step === "view" && (
        <>
          <p className="mb-3 text-xs text-muted-foreground">
            Pick how <strong className="text-foreground">{formName}</strong>&apos;s responses should show up on this
            page.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {VIEW_TYPES.map(({ value, icon: Icon, label, description }) => (
              <button
                key={value}
                onClick={() => formName && onCreate({ type: "linked-form", formName, view: value })}
                className={cn(
                  "flex flex-col items-start gap-1.5 rounded-[var(--radius)] border border-border p-3 text-left transition-colors hover:border-primary/40 hover:bg-secondary/50"
                )}
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
