"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { BackButton } from "@/components/shared/back-button"
import { FormEditorDemo } from "@/components/magic-id/form-editor-demo"

/** PQ-41 — Save and Share tooltips shown the first time a user opens the editor. */
export function Pq41Demo() {
  const [showSave, setShowSave] = useState(true)
  const [showShare, setShowShare] = useState(true)

  return (
    <div className="flex h-svh flex-col">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            Shown once, the first time a user opens the editor
          </span>
          <button
            onClick={() => {
              setShowSave(true)
              setShowShare(true)
            }}
            className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <FormEditorDemo
          showSaveTooltip={showSave}
          showShareTooltip={showShare}
          onDismissSave={() => setShowSave(false)}
          onDismissShare={() => setShowShare(false)}
        />
      </div>
    </div>
  )
}
