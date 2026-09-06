import { cn } from "@/lib/utils"

const PROJECTS = [
  { title: "Signature form", color: "bg-blue-500" },
  { title: "Lead generation form", color: "bg-emerald-500" },
  { title: "Employee evaluation", color: "bg-rose-500" },
  { title: "ROI calculator", color: "bg-amber-500" },
  { title: "HR portal", color: "bg-indigo-500" },
]

/** A returning user's populated project grid — used to demo funnel steps beyond the first project. */
export function ExistingProjectsGrid() {
  return (
    <div>
      <p className="mb-3 text-xs font-medium text-muted-foreground">Projects</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="flex items-center gap-2.5 rounded-[var(--radius)] border border-border bg-card p-3 transition-colors hover:border-primary/30"
          >
            <span className={cn("h-6 w-6 shrink-0 rounded-md", project.color)} />
            <span className="truncate text-sm font-medium">{project.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
