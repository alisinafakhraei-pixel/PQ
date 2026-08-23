"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { DropdownBottomSheet } from "./dropdown-bottom-sheet"
import { dropdownFields } from "@/lib/mobile-dropdown-data"
import { cn } from "@/lib/utils"

export function MobileFormDemo() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [openFieldId, setOpenFieldId] = useState<string | null>(null)

  const openField = dropdownFields.find((f) => f.id === openFieldId) ?? null

  return (
    <div className="flex h-svh flex-col items-center bg-secondary/30">
      <div className="flex w-full items-center border-b border-border bg-background px-4 py-2.5">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <span className="mx-auto text-xs font-medium text-muted-foreground">
          Simulated mobile viewport — tap a dropdown
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-auto py-8">
        <div className="relative h-[700px] w-[340px] overflow-hidden rounded-[2.5rem] border-[10px] border-foreground/90 bg-background shadow-2xl">
          <div className="absolute left-1/2 top-0 z-10 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />

          <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-10">
            <h1 className="mb-6 text-2xl font-bold">Food order form</h1>

            <label className="mb-1.5 block text-sm font-semibold">Name</label>
            <div className="mb-5 rounded-[var(--radius)] border border-border bg-background px-3.5 py-2.5 text-sm">
              Lucy
            </div>

            {dropdownFields.map((field) => (
              <div key={field.id} className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold">{field.label}</label>
                <button
                  onClick={() => setOpenFieldId(field.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[var(--radius)] border px-3.5 py-2.5 text-left text-sm transition-colors",
                    values[field.id] ? "border-border" : "border-primary/40"
                  )}
                >
                  <span className={values[field.id] ? "" : "text-muted-foreground"}>
                    {values[field.id]
                      ? `${field.options.find((o) => o.label === values[field.id])?.emoji ?? ""} ${values[field.id]}`
                      : "Select an option"}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>

          {openField && (
            <DropdownBottomSheet
              field={openField}
              onSelect={(label) => {
                setValues((prev) => ({ ...prev, [openField.id]: label }))
                setOpenFieldId(null)
              }}
              onClose={() => setOpenFieldId(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
