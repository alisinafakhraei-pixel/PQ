"use client"

import { X } from "lucide-react"
import { fieldKindLabels, type EditorField } from "@/lib/magic-id-data"
import { cn } from "@/lib/utils"

interface FieldSettingsPanelProps {
  field: EditorField
  index: number
  justUpdated: boolean
  onClose: () => void
}

function Toggle({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <p className="text-sm">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="h-5 w-9 rounded-full bg-secondary">
        <div className="mt-0.5 ml-0.5 h-4 w-4 rounded-full bg-background shadow" />
      </div>
    </div>
  )
}

export function FieldSettingsPanel({ field, index, justUpdated, onClose }: FieldSettingsPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
            {index + 1}
          </span>
          <span className="text-sm font-semibold">{field.title}</span>
        </div>
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
          {fieldKindLabels[field.kind]}
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">ID</label>
        <input
          readOnly
          value={field.fieldId ?? ""}
          placeholder="Field_ID"
          className={cn(
            "mb-1 w-full rounded-[var(--radius)] border px-3 py-2 font-mono text-sm transition-colors",
            field.fieldId
              ? justUpdated
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-border bg-background"
              : "border-dashed border-border bg-secondary/30 text-muted-foreground"
          )}
        />
        <p className="mb-4 text-xs text-muted-foreground">
          {field.fieldId
            ? "Use this ID to reference the field via CC Formaloo, headless forms, or MCP."
            : "No ID yet — use Magic ID from the AI menu to auto-generate one."}
        </p>

        <div className="space-y-0 border-t border-border pt-1">
          <Toggle label="Required" />
          <Toggle label="Make this field Admin-only" />
          <Toggle label="Unique" />
          <Toggle label="Invisible" />
        </div>

        <label className="mb-1.5 mt-4 block text-xs font-medium text-muted-foreground">Field width</label>
        <div className="flex gap-1.5 text-xs">
          {["Default", "Full", "1/2", "1/3", "2/3"].map((w, i) => (
            <span
              key={w}
              className={cn(
                "rounded-[var(--radius-sm)] px-2 py-1",
                i === 0 ? "font-medium text-primary" : "text-muted-foreground"
              )}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
