"use client"

import { useState } from "react"
import { Building2, Users, CreditCard, ShieldCheck, TriangleAlert } from "lucide-react"
import { BackButton } from "@/components/shared/back-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { icon: Building2, label: "General" },
  { icon: Users, label: "Members" },
  { icon: CreditCard, label: "Billing" },
  { icon: ShieldCheck, label: "Security" },
]

/**
 * The real destination for editing the workspace subdomain — a page under Workspace
 * Settings, not a modal. Every Share-sidebar entry point (see workspace-subdomain-demo.tsx)
 * navigates here instead of opening a popup, per Farokh's follow-up on the Option C review.
 */
export function WorkspaceSettingsPage() {
  const [subdomain, setSubdomain] = useState("formalooteam")
  const [saved, setSaved] = useState(true)

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <BackButton label="Back to Share" fallbackHref="/workspace-subdomain" className="mb-6" />

        <h1 className="text-xl font-bold">Workspace settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Formaloo Team</p>

        <div className="mt-6 flex gap-8">
          <nav className="w-44 shrink-0 space-y-0.5">
            {NAV_ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm",
                  label === "General"
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </div>
            ))}
          </nav>

          <div className="min-w-0 flex-1 space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-border bg-card p-5">
              <h2 className="text-sm font-semibold">Workspace subdomain</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Shared across every form and project in this workspace — for example{" "}
                <span className="font-medium text-foreground">{subdomain || "…"}.formaloo.me</span> and{" "}
                <span className="font-medium text-foreground">{subdomain || "…"}.formaloo.app</span>. Changing
                it updates every link at once.
              </p>

              <label className="mb-1.5 mt-4 block text-xs font-medium text-muted-foreground">Subdomain</label>
              <div className="flex max-w-sm items-center rounded-[var(--radius)] border border-border bg-background focus-within:border-ring">
                <input
                  value={subdomain}
                  onChange={(e) => {
                    setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                    setSaved(false)
                  }}
                  className="w-full min-w-0 rounded-l-[var(--radius)] bg-transparent px-3 py-2 text-sm outline-none"
                />
                <span className="shrink-0 whitespace-nowrap px-3 py-2 text-sm text-muted-foreground">
                  .formaloo.me
                </span>
              </div>

              <div className="mt-3 flex items-start gap-2 rounded-[var(--radius)] border border-amber-500/30 bg-amber-500/10 p-3">
                <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                <p className="text-xs text-amber-800">
                  Anyone with the current link will need the new one — old links stop working right away.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button disabled={saved} onClick={() => setSaved(true)}>
                  Save changes
                </Button>
                {saved && <span className="text-xs text-muted-foreground">All changes saved</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
