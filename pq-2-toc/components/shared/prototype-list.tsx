import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { PrototypeCard } from "@/lib/prototype-list"

/** The clickable card-list used on the home page and every Week page. */
export function PrototypeList({ prototypes }: { prototypes: PrototypeCard[] }) {
  if (prototypes.length === 0) {
    return (
      <p className="rounded-[var(--radius)] border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
        Nothing here yet.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {prototypes.map((p) => (
        <Link
          key={p.id}
          href={p.href}
          className="group flex items-center gap-4 rounded-[var(--radius)] border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <span className="flex h-9 shrink-0 items-center rounded-full bg-accent px-3 text-xs font-semibold text-accent-foreground">
            {p.id}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{p.title}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.summary}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  )
}
