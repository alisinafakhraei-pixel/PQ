"use client"

import { ImageIcon, User as UserIcon, LogOut } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import type { EditorField } from "@/lib/magic-id-data"
import { cn } from "@/lib/utils"

interface EditorCanvasProps {
  fields: EditorField[]
  selectedId: string | null
  justUpdatedIds: Set<string>
  onSelect: (id: string) => void
}

export function EditorCanvas({ fields, selectedId, justUpdatedIds, onSelect }: EditorCanvasProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-secondary/30 px-10 py-8">
      <div className="mx-auto max-w-2xl rounded-[var(--radius-lg)] border border-border bg-background shadow-sm">
        <div className="flex h-32 items-center justify-center rounded-t-[var(--radius-lg)] bg-secondary text-sm text-muted-foreground">
          <ImageIcon className="mr-1.5 h-4 w-4" /> Upload Cover Image
        </div>

        <div className="px-8 pb-8">
          <div className="-mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius)] border-4 border-background bg-secondary text-[10px] text-muted-foreground">
            Upload Logo
          </div>

          <div className="mb-6 flex items-center gap-2 rounded-[var(--radius)] border border-border bg-secondary/50 px-3 py-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted-foreground/20">
              <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              Logged in as <span className="font-semibold text-foreground">John Doe</span>
            </span>
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <LogOut className="h-3 w-3" /> Logout
            </span>
          </div>

          <h1 className="mb-1 text-3xl font-bold">Text test</h1>
          <p className="mb-8 text-sm text-muted-foreground">Hi there! 👋 Fill out this form to contact us.</p>

          <div className="space-y-6">
            {fields.map((field, i) => {
              const isSelected = field.id === selectedId
              const justUpdated = justUpdatedIds.has(field.id)
              return (
                <button
                  key={field.id}
                  onClick={() => onSelect(field.id)}
                  className={cn(
                    "block w-full rounded-[var(--radius)] p-2 text-left transition-colors",
                    isSelected ? "ring-2 ring-primary/40" : "hover:bg-secondary/50"
                  )}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">#{i + 1}</span>
                    <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
                    <span className="text-sm font-semibold">{field.title}</span>
                    {field.fieldId && (
                      <span
                        className={cn(
                          "ml-auto rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors",
                          justUpdated && "bg-emerald-100 text-emerald-700"
                        )}
                      >
                        {field.fieldId}
                      </span>
                    )}
                  </div>
                  <div className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground">
                    {field.kind === "long_text" ? "Write a longer answer..." : "Write your answer here..."}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
