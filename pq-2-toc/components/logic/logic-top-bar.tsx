import Link from "next/link"
import { ArrowLeft, CalendarPlus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function LogicTopBar() {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

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

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <CalendarPlus className="h-4 w-4" /> Add scoring
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "hsl(var(--brand))" }}>
          <Sparkles className="h-4 w-4" /> Magic Logic
        </span>
        <button
          className="rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "hsl(var(--primary))" }}
        >
          Save
        </button>
      </div>
    </div>
  )
}
