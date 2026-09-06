"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface ProjectSetupModalProps {
  onCreate: (title: string) => void
  onClose: () => void
}

/** The current "Project setup" modal — folder + title, shown before a first form is ever seen. */
export function ProjectSetupModal({ onCreate, onClose }: ProjectSetupModalProps) {
  const [title, setTitle] = useState("Untitled form")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-border bg-popover p-5 text-popover-foreground shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Project setup</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Folder</label>
        <div className="mb-4 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
          Home (no folder)
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Project title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-5 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm"
        />

        <button
          onClick={() => onCreate(title)}
          className="w-full rounded-[var(--radius)] px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          Create
        </button>
      </div>
    </div>
  )
}
