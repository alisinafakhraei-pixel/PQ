"use client"

import { useState } from "react"
import { X, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditSubdomainDialogProps {
  currentSubdomain: string
  onClose: () => void
  onSave: (next: string) => void
}

/** Shared "edit workspace subdomain" modal — the destination for every entry-point variant. */
export function EditSubdomainDialog({ currentSubdomain, onClose, onSave }: EditSubdomainDialogProps) {
  const [value, setValue] = useState(currentSubdomain)
  const changed = value.trim().length > 0 && value.trim() !== currentSubdomain

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-popover p-5 text-popover-foreground shadow-lg">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-base font-semibold">Edit workspace subdomain</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          This is shared across every form and project in your workspace — for example{" "}
          <span className="font-medium text-foreground">{value || "…"}.formaloo.me</span> and{" "}
          <span className="font-medium text-foreground">{value || "…"}.formaloo.app</span>. Changing it
          updates every link at once.
        </p>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Subdomain</label>
        <div className="mb-4 flex items-center rounded-[var(--radius)] border border-border bg-background focus-within:border-ring">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            className="w-full min-w-0 rounded-l-[var(--radius)] bg-transparent px-3 py-2 text-sm outline-none"
          />
          <span className="shrink-0 whitespace-nowrap px-3 py-2 text-sm text-muted-foreground">.formaloo.me</span>
        </div>

        <div className="mb-5 flex items-start gap-2 rounded-[var(--radius)] border border-amber-500/30 bg-amber-500/10 p-3">
          <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
          <p className="text-xs text-amber-800 dark:text-amber-300">
            Anyone with the current link will need the new one — old links stop working right away.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!changed} onClick={() => onSave(value.trim())}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
