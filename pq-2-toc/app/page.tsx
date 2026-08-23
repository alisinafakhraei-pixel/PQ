import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { issues } from "@/lib/issues"

export default function Home() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ background: "hsl(var(--brand))" }}
            >
              <span className="text-xs font-bold text-white">F</span>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              Formaloo PQ Prototypes
            </span>
          </div>
          <h1 className="text-2xl font-bold">Product prototypes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Click an idea below to open its interactive prototype.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/${issue.slug}/${issue.number}`}
              className="group flex items-center gap-4 rounded-[var(--radius)] border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <span className="flex h-9 shrink-0 items-center rounded-full bg-accent px-3 text-xs font-semibold text-accent-foreground">
                {issue.id}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{issue.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {issue.summary}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
