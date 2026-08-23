"use client"

import { useEffect, useRef } from "react"
import { FieldIcon } from "@/components/shared/field-icon"
import { formulaFormFields } from "@/lib/formula-data"
import { cn } from "@/lib/utils"

interface FieldReferencePickerProps {
  onSelect: (fieldId: string) => void
  onClose: () => void
  className?: string
}

/** The "@ mention" popover for referencing a field inside a formula. */
export function FieldReferencePicker({ onSelect, onClose, className }: FieldReferencePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={containerRef}
      className={cn(
        "z-50 w-64 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover p-1.5 text-popover-foreground shadow-lg",
        className
      )}
    >
      <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">Reference a field</p>
      <div className="max-h-64 overflow-y-auto">
        {formulaFormFields.map((field, i) => (
          <button
            key={field.id}
            onClick={() => onSelect(field.id)}
            className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
          >
            <span className="flex items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs">
              <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
              {i + 1}
            </span>
            <span className="flex-1 truncate text-sm">{field.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
