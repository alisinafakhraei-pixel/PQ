import { AlertTriangle, Plus } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { LogicChip } from "./logic-chip"
import type { FieldIssue, LogicRuleContent } from "@/lib/logic-issues"
import type { FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

const ISSUE_STYLES: Record<FieldIssue, { ring: string; badge: string; tag: string; label: string; flash: string }> = {
  duplicate: {
    ring: "border-amber-300 ring-2 ring-amber-200",
    badge: "bg-amber-400 text-amber-950",
    tag: "bg-amber-100 text-amber-800",
    label: "Duplicate rule",
    flash: "ring-4 ring-amber-400",
  },
  incomplete: {
    ring: "border-red-300 ring-2 ring-red-200",
    badge: "bg-red-400 text-red-950",
    tag: "bg-red-100 text-red-800",
    label: "Incomplete rule",
    flash: "ring-4 ring-red-400",
  },
}

interface LogicIssueCardProps {
  fieldNumber: number
  fieldKind: FieldKind
  fieldTitle: string
  rule?: LogicRuleContent
  issue?: FieldIssue
  /** Only meaningful for issue "duplicate" — jumps to the other half of the pair. */
  onJumpToPair?: () => void
  justJumpedTo?: boolean
  registerRef?: (el: HTMLDivElement | null) => void
}

/** A single field's rule box — from PQ-44, with an optional duplicate- or incomplete-rule badge. */
export function LogicIssueCard({
  fieldNumber,
  fieldKind,
  fieldTitle,
  rule,
  issue,
  onJumpToPair,
  justJumpedTo,
  registerRef,
}: LogicIssueCardProps) {
  const style = issue ? ISSUE_STYLES[issue] : undefined

  return (
    <div ref={registerRef} className="relative scroll-mt-6">
      {issue &&
        style &&
        (issue === "duplicate" ? (
          <button
            onClick={onJumpToPair}
            aria-label="Jump to the duplicate rule"
            className={cn(
              "absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background shadow-sm transition-transform hover:scale-110",
              style.badge
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
          </button>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background shadow-sm",
              style.badge
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
          </span>
        ))}

      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius-lg)] border bg-background transition-all duration-300",
          style ? style.ring : "border-border",
          justJumpedTo && style?.flash
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-5 py-3">
          <span className="flex items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs font-medium">
            <FieldIcon kind={fieldKind} className="h-3.5 w-3.5" />
            {fieldNumber}
          </span>
          <span className="text-sm font-medium">{fieldTitle}</span>
          {style && (
            <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium", style.tag)}>
              {style.label}
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
                <LogicChip label={rule.thenVerb ?? "Select"} className="w-32 flex-none" />
                {rule.thenLabel ? (
                  <LogicChip
                    label={rule.thenLabel}
                    fieldKind={rule.thenFieldKind}
                    fieldNumber={rule.thenFieldNumber}
                    className="flex-1"
                  />
                ) : (
                  <LogicChip label="Select" className="flex-1" />
                )}
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
