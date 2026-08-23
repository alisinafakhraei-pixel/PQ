import { ChevronDown } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import type { FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

interface LogicChipProps {
  label: string
  fieldKind?: FieldKind
  fieldNumber?: number
  bold?: boolean
  className?: string
}

/** A static, dropdown-look pill used to visually represent logic-builder selects. */
export function LogicChip({ label, fieldKind, fieldNumber, bold, className }: LogicChipProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm",
        className
      )}
    >
      {fieldKind && fieldNumber !== undefined && (
        <span className="flex items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs">
          <FieldIcon kind={fieldKind} className="h-3 w-3" />
          {fieldNumber}
        </span>
      )}
      <span className={cn("flex-1 truncate", bold && "font-semibold")}>{label}</span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </div>
  )
}
