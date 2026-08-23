"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddFieldButtonProps {
  onClick: () => void
  variant: "page-header" | "inline"
  label?: string
}

export function AddFieldButton({ onClick, variant, label = "Add field" }: AddFieldButtonProps) {
  if (variant === "page-header") {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 rounded-[var(--radius)] border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary"
        style={{ color: "hsl(var(--primary))" }}
      >
        <Plus className="h-4 w-4" />
        New field
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary"
      )}
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}
