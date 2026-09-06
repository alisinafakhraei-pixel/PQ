import { BackButton } from "./back-button"
import { PrototypeList } from "./prototype-list"
import { prototypesForWeek } from "@/lib/prototype-list"

export function WeekPage({ week, label, description }: { week: number; label: string; description: string }) {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <BackButton
          label="All weeks"
          fallbackHref="/"
          className="mb-6 text-xs font-medium"
          iconClassName="h-3.5 w-3.5"
        />

        <div className="mb-8">
          <h1 className="text-2xl font-bold">{label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <PrototypeList prototypes={prototypesForWeek(week)} />
      </div>
    </div>
  )
}
