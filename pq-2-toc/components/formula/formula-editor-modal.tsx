"use client"

import { useEffect } from "react"
import { X, Info } from "lucide-react"
import { FormulaTokenEditor } from "./formula-token-editor"
import { checkFormulaValidity, type FormulaToken } from "@/lib/formula-data"
import { cn } from "@/lib/utils"

interface FormulaEditorModalProps {
  tokens: FormulaToken[]
  onChange: (tokens: FormulaToken[]) => void
  onClose: () => void
}

export function FormulaEditorModal({ tokens, onChange, onClose }: FormulaEditorModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  const validity = checkFormulaValidity(tokens)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-[var(--radius-lg)] border border-border bg-popover p-5 text-popover-foreground shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-semibold">Edit formula</h2>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <FormulaTokenEditor tokens={tokens} onChange={onChange} autoFocus />

        <div className="mt-3 flex items-center justify-between">
          <p
            className={cn(
              "text-xs font-medium",
              validity === "valid" && "text-emerald-600",
              validity === "incomplete" && "text-amber-600",
              validity === "empty" && "text-muted-foreground"
            )}
          >
            {validity === "valid" && "Formula looks valid"}
            {validity === "incomplete" && "Formula isn't finished yet"}
            {validity === "empty" && "Start typing a formula, or press @ to add a field"}
          </p>
          <button
            onClick={onClose}
            className="rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "hsl(var(--primary))" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
