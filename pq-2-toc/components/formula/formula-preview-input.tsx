"use client"

import { Maximize2 } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { formulaFieldById, isEmptyFormula, type FormulaToken } from "@/lib/formula-data"

interface FormulaPreviewInputProps {
  tokens: FormulaToken[]
  onExpand: () => void
}

/** The compact single-line "Default Formula" box — click anywhere, or the expand icon, to open the full editor. */
export function FormulaPreviewInput({ tokens, onExpand }: FormulaPreviewInputProps) {
  const empty = isEmptyFormula(tokens)

  return (
    <button
      onClick={onExpand}
      className="flex w-full items-center gap-2 overflow-hidden rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-left transition-colors hover:border-primary/40"
    >
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden whitespace-nowrap">
        {empty ? (
          <span className="text-sm text-muted-foreground">Example: var1+var2</span>
        ) : (
          tokens.map((token) =>
            token.kind === "field" ? (
              <span
                key={token.id}
                className="inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-sm)] bg-accent px-1.5 py-0.5 text-xs text-accent-foreground"
              >
                <FieldIcon kind={formulaFieldById(token.fieldId)?.kind ?? "short_text"} className="h-3 w-3" />
                {formulaFieldById(token.fieldId)?.title}
              </span>
            ) : (
              <span key={token.id} className="font-mono text-sm">
                {token.value}
              </span>
            )
          )
        )}
      </div>
      <Maximize2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </button>
  )
}
