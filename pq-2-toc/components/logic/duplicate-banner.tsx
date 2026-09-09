import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DuplicatePair {
  aLabel: string
  bLabel: string
  onJumpToA: () => void
  onJumpToB: () => void
}

interface DuplicateBannerProps {
  /** Before PQ-44: a generic error with no way to find the conflict. After: names the two fields. */
  detailed: boolean
  pair?: DuplicatePair
  /** Clicking anywhere on the banner (not a specific field name) jumps to the first duplicate. */
  onJumpToFirst?: () => void
}

export function DuplicateBanner({ detailed, pair, onJumpToFirst }: DuplicateBannerProps) {
  return (
    <div
      onClick={detailed ? onJumpToFirst : undefined}
      className={cn(
        "flex items-start gap-2 rounded-[var(--radius)] border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
        detailed && "cursor-pointer transition-colors hover:bg-destructive/15"
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      {detailed && pair ? (
        <p>
          <strong>Logic rules are duplicated:</strong>{" "}
          <button
            onClick={(e) => {
              e.stopPropagation()
              pair.onJumpToA()
            }}
            className="underline underline-offset-2 hover:text-destructive/80"
          >
            {pair.aLabel}
          </button>{" "}
          and{" "}
          <button
            onClick={(e) => {
              e.stopPropagation()
              pair.onJumpToB()
            }}
            className="underline underline-offset-2 hover:text-destructive/80"
          >
            {pair.bLabel}
          </button>{" "}
          have the exact same rule. Click a field name — or anywhere on this message — to jump to it.
        </p>
      ) : (
        <p>
          <strong>Logic rules are duplicated.</strong> Review your rules to find the conflict.
        </p>
      )}
    </div>
  )
}
