import { ImageIcon, Star } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { formulaFormFields } from "@/lib/formula-data"

export function FormulaCanvas() {
  return (
    <div className="flex-1 overflow-y-auto bg-secondary/30 px-10 py-8">
      <div className="mx-auto max-w-2xl rounded-[var(--radius-lg)] border border-border bg-background shadow-sm">
        <div className="flex h-32 items-center justify-center rounded-t-[var(--radius-lg)] bg-secondary text-sm text-muted-foreground">
          <ImageIcon className="mr-1.5 h-4 w-4" /> Upload Cover Image
        </div>

        <div className="px-8 pb-8">
          <div className="-mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius)] border-4 border-background bg-secondary text-[10px] text-muted-foreground">
            Upload Logo
          </div>

          <h1 className="mb-1 text-3xl font-bold">Feedback Form</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            We value your feedback. Please let us know about your experience.
          </p>

          <div className="space-y-6">
            {formulaFormFields
              .filter((f) => f.id !== "price" && f.id !== "quantity")
              .map((field, i) => (
                <div key={field.id}>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">#{i + 1}</span>
                    <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
                    <span className="text-sm font-semibold">{field.title}</span>
                  </div>
                  {field.kind === "star_rating" ? (
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-6 w-6 text-muted-foreground/30" />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground">
                      Write your answer here...
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
