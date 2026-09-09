import { AlertTriangle, Plus } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { LogicChip } from "./logic-chip"
import type { DuplicateRuleContent } from "@/lib/logic-duplicates"
import type { FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

interface DuplicateFieldCardProps {
  fieldNumber: number
  fieldKind: FieldKind
  fieldTitle: string
  rule?: DuplicateRuleContent
  isDuplicate?: boolean
  onJumpToPair?: () => void
  justJumpedTo?: boolean
  registerRef?: (el: HTMLDivElement | null) => void
}

/** A single field's rule box — the "logic box" from PQ-44, with an optional duplicate-rule badge. */
export function DuplicateFieldCard({
  fieldNumber,
  fieldKind,
  fieldTitle,
  rule,
  isDuplicate,
  onJumpToPair,
  justJumpedTo,
  registerRef,
}: DuplicateFieldCardProps) {
  return (
    <div ref={registerRef} className="relative scroll-mt-6">
      {isDuplicate && (
        <button
          onClick={onJumpToPair}
          aria-label="Jump to the duplicate rule"
          className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-amber-400 text-amber-950 shadow-sm transition-transform hover:scale-110"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
        </button>
      )}

      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius-lg)] border bg-background transition-all duration-300",
          isDuplicate ? "border-amber-300 ring-2 ring-amber-200" : "border-border",
          justJumpedTo && "ring-4 ring-amber-400"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-5 py-3">
          <span className="flex items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs font-medium">
            <FieldIcon kind={fieldKind} className="h-3.5 w-3.5" />
            {fieldNumber}
          </span>
          <span className="text-sm font-medium">{fieldTitle}</span>
          {isDuplicate && (
            <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
              Duplicate rule
            </span>
          )}
        </div>

        <div className="space-y-4 px-5 py-4">
          {rule ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-10 text-sm text-muted-foreground">If</span>
                <LogicChip
                  label={rule.ifLabel}
                  fieldKind={rule.ifFieldKind}
                  fieldNumber={rule.ifFieldNumber}
                  className="flex-[1.4]"
                  bold
                />
                <LogicChip label={rule.operatorLabel} className="flex-1" bold />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 text-sm text-muted-foreground">Then</span>
                <LogicChip label={rule.thenVerb} className="w-32 flex-none" />
                <LogicChip
                  label={rule.thenLabel}
                  fieldKind={rule.thenFieldKind}
                  fieldNumber={rule.thenFieldNumber}
                  className="flex-1"
                />
              </div>
            </div>
          ) : (
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Plus className="h-3.5 w-3.5" /> Add rule
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
