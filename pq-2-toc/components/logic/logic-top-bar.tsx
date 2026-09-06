import { CalendarPlus, Sparkles } from "lucide-react"
import { EditorTopBar } from "@/components/shared/editor-top-bar"
import { cn } from "@/lib/utils"

export function LogicTopBar() {
  return (
    <EditorTopBar
      showIconRow={false}
      center={
        <div className="flex items-center gap-1 rounded-[var(--radius)] bg-secondary/60 p-0.5">
          {["Fields", "On Submit", "On Update"].map((tab, i) => (
            <span
              key={tab}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium",
                i === 0 ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              {tab}
            </span>
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
        </div>
      }
    />
  )
}
