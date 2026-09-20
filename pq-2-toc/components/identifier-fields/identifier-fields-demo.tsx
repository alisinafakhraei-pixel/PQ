"use client"

import { useState } from "react"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { IdentifierFieldsPicker, type PickerVariant } from "./identifier-fields-picker"

const VARIANTS: { value: PickerVariant; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "redesigned", label: "Redesigned" },
]

const VARIANT_NOTES: Record<PickerVariant, string> = {
  today:
    "Every row is plain text — field name on the left, the raw internal slug and type crammed together on the right (e.g. “WHDSPTIM · Short Text”). Nothing tells you at a glance which rows are real form fields versus system identifiers, or what type a field is.",
  redesigned:
    "Reuses the field-picker pattern from the answer-piping menu: a colored type icon + field-number badge, a bold field name, and the field's readable ID on the right as “@first_name” — the same @tag format answer piping already uses, not the raw internal slug shown today. System identifiers (Response ID, Tracking ID) get their own neutral icon instead of a field number and no label on the right, and a checkmark confirms what's selected.",
}

/** Standalone exploration: restyle the "Select identifier fields" combobox to match the piping-menu's field-row pattern. */
export function IdentifierFieldsDemo() {
  const [variant, setVariant] = useState<PickerVariant>("redesigned")

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <BackButton label="All prototypes" className="mb-6" />

        <h1 className="text-xl font-bold">Identifier field picker — better hierarchy &amp; typography</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Restyles the &ldquo;Select identifier fields&rdquo; dropdown to show a type icon, field number, and
          an @tag-style ID the same way the answer-piping menu already does, instead of a flat text row with
          the raw internal slug.
        </p>

        <div className="mt-6">
          <SegmentedToggle options={VARIANTS} value={variant} onChange={setVariant} />
        </div>

        <div className="mt-3 rounded-[var(--radius)] border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
          {VARIANT_NOTES[variant]}
        </div>

        <div className="mt-6 rounded-[var(--radius-lg)] border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Add this email as CC in email threads. The AI agent will monitor the conversation, fill in the form
            using the identifier fields you select below.
          </p>

          <label className="mb-1.5 mt-4 block text-xs font-medium text-muted-foreground">
            Identifier fields
          </label>
          <IdentifierFieldsPicker key={variant} variant={variant} />
        </div>
      </div>
    </div>
  )
}
