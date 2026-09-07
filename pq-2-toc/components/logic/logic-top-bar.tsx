import { CalendarPlus, Sparkles } from "lucide-react"
import { EditorTopBar } from "@/components/shared/editor-top-bar"
import { cn } from "@/lib/utils"

const TABS = ["Fields", "On Submit", "On Update"] as const
export type LogicTab = (typeof TABS)[number]

interface LogicTopBarProps {
  activeTab?: LogicTab
  onTabChange?: (tab: LogicTab) => void
  /** Shows the red "Logic rules are incomplete" warning next to Save. */
  showIncompleteWarning?: boolean
}

export function LogicTopBar({ activeTab = "Fields", onTabChange, showIncompleteWarning }: LogicTopBarProps) {
  return (
    <EditorTopBar
      showIconRow={false}
      center={
        <div className="flex items-center gap-1 rounded-[var(--radius)] bg-secondary/60 p-0.5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors",
                tab === activeTab ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      }
      trailingActions={
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <CalendarPlus className="h-4 w-4" /> Add scoring
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "hsl(var(--brand))" }}>
            <Sparkles className="h-4 w-4" /> Magic Logic
          </span>
          {showIncompleteWarning && (
            <span className="text-sm font-medium text-destructive">Logic rules are incomplete</span>
          )}
        </div>
      }
    />
  )
}
