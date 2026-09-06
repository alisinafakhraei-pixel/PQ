"use client"

import { Paperclip, Plus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const SUGGESTIONS = ["Appointment form", "Feedback form", "Job application form", "Registration form"]

interface AiBuildPromptProps {
  /** A glowing highlight ring, used on the landing state to draw a first-time user's eye here. */
  highlighted?: boolean
  className?: string
}

/** The real Formaloo home-page "What do you want to build?" AI prompt box. */
export function AiBuildPrompt({ highlighted, className }: AiBuildPromptProps) {
  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-2xl font-bold">What do you want to build?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Describe what you need, upload a file, or both. AI will turn it into a ready-to-use form in seconds.
      </p>

      <div
        className={cn(
          "relative mt-4 rounded-[var(--radius-lg)] border bg-card transition-shadow",
          highlighted ? "border-transparent" : "border-border"
        )}
      >
        {highlighted && (
          <span
            className="pointer-events-none absolute -inset-1 animate-pulse rounded-[calc(var(--radius-lg)+4px)]"
            style={{ boxShadow: "0 0 0 3px hsl(var(--brand) / 0.55), 0 0 28px 6px hsl(var(--brand) / 0.3)" }}
          />
        )}
        <div className="p-5">
          <p className="text-sm text-muted-foreground">
            Create an employee onboarding form with manager approval.
          </p>

          <div className="mt-10 flex items-center justify-between border-t border-border pt-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Paperclip className="h-3.5 w-3.5" /> Attach your images or PDF documents.
            </span>
            <button
              className="flex items-center gap-1 rounded-[var(--radius)] px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              style={{ background: "var(--primary)" }}
            >
              Build now <Sparkles className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-secondary/30 px-4 py-2.5">
          {SUGGESTIONS.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              <Plus className="h-3 w-3" /> {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
