"use client"

import { X } from "lucide-react"
import { FormulaPreviewInput } from "./formula-preview-input"
import type { FormulaToken } from "@/lib/formula-data"

interface VariableSettingsPanelProps {
  title: string
  fieldId: string
  tokens: FormulaToken[]
  onExpand: () => void
  onClose: () => void
}

export function VariableSettingsPanel({ title, fieldId, tokens, onExpand, onClose }: VariableSettingsPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold">{title}</span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex border-b border-border px-4">
        <span className="border-b-2 border-primary px-1 py-2.5 text-sm font-medium text-primary">Edit</span>
        <span className="ml-4 px-1 py-2.5 text-sm text-muted-foreground">Logic</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Field type</label>
        <div className="mb-4 rounded-[var(--radius)] border border-border bg-secondary/50 px-3 py-2 text-sm">
          Variable
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">ID</label>
        <input
          readOnly
          value={fieldId}
          className="mb-1 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 font-mono text-sm"
        />
        <p className="mb-4 text-xs text-muted-foreground">
          Use numbers, letters, and underscore with no space.
        </p>

        <p className="mb-3 border-t border-border pt-3 text-sm font-semibold">Settings</p>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Title</label>
        <div className="mb-4 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm">
          {title}
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Type</label>
        <div className="mb-4 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm">
          Formula
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Default Formula</label>
        <FormulaPreviewInput tokens={tokens} onExpand={onExpand} />
        <p className="mb-4 mt-1.5 text-xs text-muted-foreground">
          Click to open the full formula editor — reference fields, combine operators, or concatenate text.
        </p>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Max number of decimal places</label>
        <input
          placeholder="Enter a number"
          className="w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}
