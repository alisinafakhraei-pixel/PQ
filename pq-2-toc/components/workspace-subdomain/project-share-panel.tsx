"use client"

import { useState } from "react"
import { X, Copy, Info, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SharePanelProps } from "./types"

const PATH = "/app/1hn87…"

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "border-b-2 px-0.5 pb-2 text-sm font-medium",
        active ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
      )}
    >
      {label}
    </div>
  )
}

/** Recreates the right-hand "Share" drawer on a Project page → Publish tab. */
export function ProjectSharePanel({ variant, subdomain, onEditSubdomain }: SharePanelProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarByDefault, setSidebarByDefault] = useState(true)

  return (
    <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Share</h2>
        <div className="flex items-center gap-3">
          {variant === "header-menu" && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded-[var(--radius-sm)] p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="More share settings"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-7 z-10 w-56 rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-lg">
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      onEditSubdomain()
                    }}
                    className="w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-secondary"
                  >
                    Edit workspace subdomain
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-5 border-b border-border">
        <Tab label="Publish" active />
        <Tab label="Access Management" />
        <Tab label="Embed" />
      </div>

      <p className="text-sm font-semibold">Your Project is published.</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Your published project can be accessed at the link below.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">Public address</label>
        {variant === "inline-link" && (
          <button
            onClick={onEditSubdomain}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Pencil className="h-3 w-3" /> Edit subdomain
          </button>
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded-[var(--radius)] border border-border bg-background px-3 py-2">
        {variant === "inline-url" ? (
          <p className="min-w-0 truncate text-sm">
            <span className="text-muted-foreground">https://</span>
            <button
              onClick={onEditSubdomain}
              className="rounded-[var(--radius-sm)] font-medium text-foreground underline decoration-dotted underline-offset-2 hover:bg-secondary"
            >
              {subdomain}
            </button>
            <span className="text-muted-foreground">.formaloo.app{PATH}</span>
          </p>
        ) : (
          <p className="min-w-0 truncate text-sm text-muted-foreground">
            https://{subdomain}.formaloo.app{PATH}
          </p>
        )}
        <button className="ml-3 flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline">
          <Copy className="h-3.5 w-3.5" /> Copy link
        </button>
      </div>
      {variant === "inline-url" && (
        <p className="mt-1 text-[11px] text-muted-foreground">
          <span className="font-medium">{subdomain}</span> is your workspace subdomain — click it to edit.
        </p>
      )}

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={sidebarByDefault}
          onChange={(e) => setSidebarByDefault(e.target.checked)}
          className="h-3.5 w-3.5 rounded-[3px] accent-[var(--primary)]"
        />
        Show menu sidebar by default
      </label>

      <div className="mt-4 flex gap-3">
        <Button variant="outline" className="flex-1">
          Unpublish
        </Button>
        <Button className="flex-1">View</Button>
      </div>

      {variant === "dedicated-row" && (
        <div className="mt-5 flex items-center justify-between rounded-[var(--radius)] border border-border bg-background px-3 py-2.5">
          <div>
            <p className="text-sm font-medium">Workspace subdomain</p>
            <p className="text-xs text-muted-foreground">{subdomain}.formaloo.app</p>
          </div>
          <Button variant="outline" size="sm" onClick={onEditSubdomain}>
            Edit
          </Button>
        </div>
      )}

      <div className="mt-5 border-t border-border pt-5">
        <label className="text-xs font-medium text-muted-foreground">
          Customize link <span className="font-normal">(custom domain)</span>
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            placeholder="Project custom domain"
            className="w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-ring"
          />
          <button className="shrink-0 text-sm font-medium text-muted-foreground">Save</button>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Use your custom domain here to share this project on a branded link.
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-[var(--radius)] bg-primary/5 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-primary">How to point Custom domains</span>
          <br />
          If you set this, your project will be displayed on your custom domain (e.g. https://example.co).{" "}
          <span className="underline">How to point custom domains to Formaloo</span>
        </p>
      </div>
    </div>
  )
}
