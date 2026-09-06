import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandMark } from "@/components/shared/brand-mark"
import { WEEKS, prototypesForWeek } from "@/lib/prototype-list"

export default function Home() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <BrandMark />
            <span className="text-sm font-semibold text-muted-foreground">
              Formaloo PQ Prototypes
            </span>
          </div>
          <h1 className="text-2xl font-bold">Product prototypes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pick a week to see what&apos;s inside.</p>
        </div>

        <div className="flex flex-col gap-3">
          {WEEKS.map(({ week, label }) => {
            const count = prototypesForWeek(week).length
            return (
              <Link
                key={week}
                href={`/week-${week}`}
                className="group flex items-center gap-4 rounded-[var(--radius)] border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {week}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold">{label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {count} prototype{count !== 1 ? "s" : ""}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
