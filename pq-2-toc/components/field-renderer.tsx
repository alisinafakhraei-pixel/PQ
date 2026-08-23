"use client"

import { Star } from "lucide-react"
import { useState } from "react"
import type { FormField } from "@/lib/toc-form-data"

export function FieldRenderer({ field }: { field: FormField }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-base font-semibold">
        {field.label}
        {field.required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {field.description && (
        <p className="text-xs italic text-muted-foreground">{field.description}</p>
      )}
      <FieldInput field={field} />
    </div>
  )
}

function FieldInput({ field }: { field: FormField }) {
  if (field.type === "long-text") {
    return (
      <textarea
        rows={4}
        placeholder="Write your answer here..."
        className="w-full resize-none rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    )
  }

  if (field.type === "rating") {
    return <RatingInput />
  }

  const inputType = field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"
  return (
    <input
      type={inputType}
      placeholder="Write your answer here..."
      className="w-full rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  )
}

function RatingInput() {
  const [value, setValue] = useState<number | null>(null)
  return (
    <div className="flex gap-1.5 pt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setValue(i + 1)}
          className="rounded-[var(--radius-sm)] p-1 transition-colors hover:bg-secondary"
        >
          <Star
            className="h-6 w-6"
            fill={value !== null && i < value ? "hsl(var(--brand))" : "none"}
            stroke={value !== null && i < value ? "hsl(var(--brand))" : "currentColor"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  )
}
