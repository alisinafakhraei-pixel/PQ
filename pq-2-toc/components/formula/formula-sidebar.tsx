"use client"

import { MoreVertical, Plus } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { formulaFormFields } from "@/lib/formula-data"
import { cn } from "@/lib/utils"

export interface VariableEntry {
  id: string
  title: string
}

interface FormulaSidebarProps {
  variables: VariableEntry[]
  selectedVariableId: string | null
  onSelectVariable: (id: string) => void
}

export function FormulaSidebar({ variables, selectedVariableId, onSelectVariable }: FormulaSidebarProps) {
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
        {formulaFormFields.map((field, i) => (
          <div key={field.id} className="mb-0.5 flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-2">
            <span className="w-4 shrink-0 text-xs text-muted-foreground">{i + 1}</span>
            <FieldIcon kind={field.kind} />
            <span className="min-w-0 flex-1 truncate text-sm">{field.title}</span>
          </div>
        ))}

        <div className="mt-3 flex items-center justify-between px-2 py-1.5">
          <span className="text-xs font-medium text-muted-foreground">Variables</span>
          <button className="text-xs font-medium text-muted-foreground hover:text-foreground">+ Add</button>
        </div>
        {variables.map((variable) => {
          const isSelected = variable.id === selectedVariableId
          return (
            <button
              key={variable.id}
              onClick={() => onSelectVariable(variable.id)}
              className={cn(
                "group mb-0.5 flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-2 text-left transition-colors",
                isSelected ? "bg-accent" : "hover:bg-secondary"
              )}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[9px] font-bold text-orange-600">
                x
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">{variable.title}</span>
              <MoreVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
            </button>
          )
        })}
      </div>
    </aside>
  )
}
