"use client"

import { useState } from "react"
import { AddFieldButton } from "./add-field-button"
import { FieldTypePicker } from "@/components/shared/field-type-picker"
import type { FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

interface AddFieldControlProps {
  variant: "page-header" | "inline"
  label?: string
  onSelect: (kind: FieldKind) => void
}

/** Wires the "+ Add field" button to the field-type picker popover. */
export function AddFieldControl({ variant, label, onSelect }: AddFieldControlProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn("relative", variant === "inline" && "w-full")}>
      <AddFieldButton variant={variant} label={label} onClick={() => setOpen((v) => !v)} />
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1.5",
            variant === "page-header" ? "right-0" : "left-1/2 -translate-x-1/2"
          )}
        >
          <FieldTypePicker
            onSelect={(kind) => {
              onSelect(kind)
              setOpen(false)
            }}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
