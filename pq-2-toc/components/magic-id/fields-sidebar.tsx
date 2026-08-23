"use client"

import { Hash, Plus } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import type { EditorField } from "@/lib/magic-id-data"
import { cn } from "@/lib/utils"

interface FieldsSidebarProps {
  fields: EditorField[]
  selectedId: string | null
  justUpdatedIds: Set<string>
  onSelect: (id: string) => void
}

export function FieldsSidebar({ fields, selectedId, justUpdatedIds, onSelect }: FieldsSidebarProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold">Fields</span>
        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Plus className="h-3.5 w-3.5" /> Add field
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Page 1</p>
        {fields.map((field, i) => {
          const isSelected = field.id === selectedId
          const justUpdated = justUpdatedIds.has(field.id)
          return (
            <button
              key={field.id}
              onClick={() => onSelect(field.id)}
              className={cn(
                "group mb-0.5 flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-2 text-left transition-colors",
                isSelected ? "bg-accent" : "hover:bg-secondary",
                justUpdated && "ring-1 ring-emerald-400"
              )}
            >
              <span className="w-4 shrink-0 text-xs text-muted-foreground">{i + 1}</span>
              <FieldIcon kind={field.kind} />
              <span className="min-w-0 flex-1 truncate text-sm">{field.title}</span>
              {field.fieldId ? (
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-0.5 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors",
                    justUpdated && "bg-emerald-100 text-emerald-700"
                  )}
                  title={field.fieldId}
                >
                  <Hash className="h-2.5 w-2.5" />
                  ID
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-dashed border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60">
                  No ID
                </span>
              )}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
