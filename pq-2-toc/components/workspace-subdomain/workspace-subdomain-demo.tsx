"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { FormSharePanel } from "./form-share-panel"
import { ProjectSharePanel } from "./project-share-panel"
import { EditSubdomainDialog } from "./edit-subdomain-dialog"
import type { SubdomainVariant } from "./types"

type ShareContext = "form" | "project"
type ViewerRole = "admin" | "member"

const CONTEXTS: { value: ShareContext; label: string }[] = [
  { value: "form", label: "Form share" },
  { value: "project", label: "Project share" },
]

const ROLES: { value: ViewerRole; label: string }[] = [
  { value: "admin", label: "Viewing as: Workspace Admin" },
  { value: "member", label: "Viewing as: Member" },
]

const VARIANTS: { value: SubdomainVariant; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "inline-link", label: "A — Next to Edit URL" },
  { value: "dedicated-row", label: "B — Dedicated row" },
  { value: "inline-url", label: "C — Inline on the link ✓ Winner" },
  { value: "header-menu", label: "D — Header ⋯ menu" },
]

const VARIANT_NOTES: Record<SubdomainVariant, string> = {
  today:
    "Today, there's no way to change the workspace subdomain (“formalooteam”) from either share screen. “Edit URL” only renames the per-item slug, and “Customize link” only adds a full custom domain — the subdomain in between is stuck.",
  "inline-link":
    "Adds “Edit subdomain” as a second peer action next to the existing link-edit action (next to “Edit URL” on the form, next to “Public address” on the project). Cheapest to build and most discoverable, but crowds a header row that's meant to stay compact, and now has two similarly-worded “edit link” actions doing different-scoped things.",
  "dedicated-row":
    "Gives the subdomain its own labeled row, styled like the existing “Customize link (custom domain)” block right above it — the two now read as a pair: “workspace subdomain” vs “full custom domain,” both ways to change the same URL at a different scope. Clearest mental model, but adds vertical space to an already fairly tall panel.",
  "inline-url":
    "Makes the “formalooteam” segment inside the URL itself clickable (underlined), with a one-line caption underneath explaining what it is. Per Farokh's review: on the form panel, this only reveals once “Edit URL” is clicked (hidden otherwise), and on both panels it's shown to Workspace Admins only — use the toggle above to see it as a Member.",
  "header-menu":
    "Tucks it behind a ⋯ overflow menu in the panel header, alongside room for other “share settings” later. Keeps the body of the panel untouched, but is the least discoverable option — someone has to already suspect this setting exists to go looking for it.",
}

/** Standalone exploration: where should an "Edit workspace subdomain" entry point live in the Share UI? */
export function WorkspaceSubdomainDemo() {
  const [context, setContext] = useState<ShareContext>("form")
  const [variant, setVariant] = useState<SubdomainVariant>("inline-url")
  const [role, setRole] = useState<ViewerRole>("admin")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [subdomain, setSubdomain] = useState("formalooteam")

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <BackButton label="All prototypes" className="mb-6" />

        <h1 className="text-xl font-bold">Workspace subdomain — entry-point ideas</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Where should an “Edit workspace subdomain” action live in the Share sidebar? Switch between
          the form and project share screens, then flip through four placement ideas.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-[var(--radius)] border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <Trophy className="h-4 w-4 shrink-0" />
          <span>
            <strong className="font-semibold">Decision:</strong> Farokh picked Option C — Inline on the link,
            with two conditions: only reveal it after “Edit URL” is clicked, and only for Workspace Admins.
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <SegmentedToggle options={CONTEXTS} value={context} onChange={setContext} />
          <span className="h-4 w-px bg-border" />
          <SegmentedToggle options={VARIANTS} value={variant} onChange={setVariant} className="flex-wrap" />
        </div>

        <div className="mt-3">
          <SegmentedToggle options={ROLES} value={role} onChange={setRole} />
        </div>

        <div className="mt-3 rounded-[var(--radius)] border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
          {VARIANT_NOTES[variant]}
        </div>

        <div className="mt-6 flex justify-center rounded-[var(--radius-lg)] bg-muted/40 p-8">
          {context === "form" ? (
            <FormSharePanel
              variant={variant}
              subdomain={subdomain}
              isAdmin={role === "admin"}
              onEditSubdomain={() => setDialogOpen(true)}
            />
          ) : (
            <ProjectSharePanel
              variant={variant}
              subdomain={subdomain}
              isAdmin={role === "admin"}
              onEditSubdomain={() => setDialogOpen(true)}
            />
          )}
        </div>
      </div>

      {dialogOpen && (
        <EditSubdomainDialog
          currentSubdomain={subdomain}
          onClose={() => setDialogOpen(false)}
          onSave={(next) => {
            setSubdomain(next)
            setDialogOpen(false)
          }}
        />
      )}
    </div>
  )
}
