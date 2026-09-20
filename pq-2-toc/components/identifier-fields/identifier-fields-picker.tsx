"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, X, Check, Fingerprint } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { fieldKindLabels } from "@/lib/field-types"
import { IDENTIFIER_FIELDS, SYSTEM_IDENTIFIERS } from "@/lib/identifier-fields-data"
import { cn } from "@/lib/utils"

export type PickerVariant = "today" | "redesigned"

interface IdentifierFieldsPickerProps {
  variant: PickerVariant
}

/** Recreates the real "Select identifier fields" combobox, restyled per the field-picker pattern used elsewhere (piping-menu.tsx). */
export function IdentifierFieldsPicker({ variant }: IdentifierFieldsPickerProps) {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set(["first_name", "last_name"]))

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedLabel = (id: string) =>
    IDENTIFIER_FIELDS.find((f) => f.id === id)?.title ?? SYSTEM_IDENTIFIERS.find((s) => s.id === id)?.label ?? id

  return (
    <div className="w-full max-w-md">
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-10 w-full cursor-text flex-wrap items-center gap-1.5 rounded-[var(--radius)] border-2 border-primary bg-background px-2 py-1.5"
      >
        {[...selected].map((id) => (
          <span
            key={id}
            className="flex items-center gap-1 rounded-full bg-secondary py-1 pl-2.5 pr-1.5 text-xs font-medium text-secondary-foreground"
          >
            {selectedLabel(id)}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggle(id)
              }}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        {selected.size === 0 && (
          <span className="px-1 text-sm text-muted-foreground">Select identifier fields</span>
        )}
        <span className="ml-auto shrink-0 text-muted-foreground">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </div>

      {open && (
        <div className="mt-1 max-h-80 overflow-y-auto rounded-[var(--radius)] border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
          <p className="px-2.5 pb-1 pt-1 text-xs font-medium text-muted-foreground">Fields</p>
          {IDENTIFIER_FIELDS.map((field) => {
            const isSelected = selected.has(field.id)
            return (
              <button
                key={field.id}
                onClick={() => toggle(field.id)}
                className={cn(
                  "flex w-full items-center rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary",
                  variant === "redesigned" ? "gap-2.5" : "justify-between",
                  isSelected && "bg-accent/60"
                )}
              >
                {variant === "redesigned" ? (
                  <>
                    <span className="flex shrink-0 items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs">
                      <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
                      {field.fieldNumber}
                    </span>
                    <span className="flex-1 truncate text-sm font-medium">{field.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">@{field.tag}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                  </>
                ) : (
                  <>
                    <span className="truncate text-sm">{field.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {field.internalId} · {fieldKindLabels[field.kind]}
                    </span>
                  </>
                )}
              </button>
            )
          })}

          <p className="px-2.5 pb-1 pt-2 text-xs font-medium text-muted-foreground">System identifiers</p>
          {SYSTEM_IDENTIFIERS.map((item) => {
            const isSelected = selected.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full items-center rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary",
                  variant === "redesigned" ? "gap-2.5" : "justify-between",
                  isSelected && "bg-accent/60"
                )}
              >
                {variant === "redesigned" ? (
                  <>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-secondary text-muted-foreground">
                      <Fingerprint className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1 truncate text-sm font-medium">{item.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                  </>
                ) : (
                  <span className="truncate text-sm">{item.label}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
