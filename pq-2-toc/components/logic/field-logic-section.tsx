import { Trash2, Plus } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { LogicChip } from "./logic-chip"
import { AddFieldControl } from "./add-field-control"
import type { LogicField } from "@/lib/logic-data"
import type { FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

interface FieldLogicSectionProps {
  field: LogicField
  index: number
  showInlineAddField: boolean
  onAddFieldAfter: (kind: FieldKind) => void
}

export function FieldLogicSection({ field, index, showInlineAddField, onAddFieldAfter }: FieldLogicSectionProps) {
  return (
    <div className={cn(field.isNew && "animate-in fade-in slide-in-from-top-1 duration-300")}>
      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background",
          field.isNew && "ring-2 ring-emerald-300"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-5 py-3">
          <span className="flex items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs font-medium">
            <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
            {index + 1}
          </span>
          <span className="text-sm font-medium">{field.title}</span>
          {field.isNew && (
            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              New
            </span>
          )}
        </div>

        <div className="space-y-4 px-5 py-4">
          {field.hasDemoRules ? (
            <>
              <RuleChain
                fieldKind={field.kind}
                conditionLabel="What's your name?"
                operatorLabel="is equal to"
                compareKind="email"
                compareLabel="Email"
                thenVerb="Show"
                thenTargetKind="email"
                thenTargetLabel="Email"
              />
              <div className="border-t border-border" />
              <RuleChain
                fieldKind={field.kind}
                conditionLabel="What's your name?"
                operatorLabel="is answered"
                thenVerb="Assign"
                thenTargetKind="short_text"
                thenTargetNumber={15}
                thenTargetLabel="wich is your favout foood?"
                thenValueLabel="pasta"
              />
              <div className="flex items-center justify-between border-t border-border pt-3">
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Plus className="h-3.5 w-3.5" /> Add rule
                </button>
                <button className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-sm text-muted-foreground">Otherwise</span>
                <LogicChip label="Select" className="flex-1" />
              </div>
            </>
          ) : (
            <>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                <Plus className="h-3.5 w-3.5" /> Add rule
              </button>
              <div className="flex items-center gap-3">
                <span className="w-16 text-sm text-muted-foreground">Always</span>
                <LogicChip label="Select" className="flex-1" />
              </div>
            </>
          )}
        </div>
      </div>

      {showInlineAddField && (
        <div className="py-3">
          <AddFieldControl variant="inline" label="Add field after this question" onSelect={onAddFieldAfter} />
        </div>
      )}
    </div>
  )
}

function RuleChain({
  fieldKind,
  conditionLabel,
  operatorLabel,
  compareKind,
  compareLabel,
  thenVerb,
  thenTargetKind,
  thenTargetNumber,
  thenTargetLabel,
  thenValueLabel,
}: {
  fieldKind: LogicField["kind"]
  conditionLabel: string
  operatorLabel: string
  compareKind?: LogicField["kind"]
  compareLabel?: string
  thenVerb: string
  thenTargetKind: LogicField["kind"]
  thenTargetNumber?: number
  thenTargetLabel: string
  thenValueLabel?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="w-10 text-sm text-muted-foreground">If</span>
        <LogicChip label={conditionLabel} fieldKind={fieldKind} fieldNumber={1} className="flex-[1.4]" bold />
        <LogicChip label={operatorLabel} className="flex-1" bold />
        {compareLabel && <LogicChip label={compareLabel} fieldKind={compareKind} fieldNumber={3} className="flex-1" />}
      </div>
      <div className="flex items-center gap-3">
        <span className="w-10 text-sm text-muted-foreground">Then</span>
        <LogicChip label={thenVerb} className="w-32 flex-none" />
        <LogicChip
          label={thenTargetLabel}
          fieldKind={thenTargetKind}
          fieldNumber={thenTargetNumber ?? 3}
          className="flex-1"
        />
        {thenValueLabel && <LogicChip label={thenValueLabel} className="flex-1" />}
      </div>
    </div>
  )
}
