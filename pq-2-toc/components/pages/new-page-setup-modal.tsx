"use client"

import { NewPageSetupSteps, type NewPageChoice } from "./new-page-setup-steps"

interface NewPageSetupModalProps {
  onCreate: (choice: NewPageChoice) => void
  onClose: () => void
}

/** Idea 1 — the "New page" setup flow as a centered popup with a backdrop. */
export function NewPageSetupModal({ onCreate, onClose }: NewPageSetupModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-popover p-5 text-popover-foreground shadow-lg">
        <NewPageSetupSteps onCreate={onCreate} onClose={onClose} />
      </div>
    </div>
  )
}
