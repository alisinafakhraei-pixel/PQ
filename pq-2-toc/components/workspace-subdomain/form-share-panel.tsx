"use client"

import { useState } from "react"
import { Link2, Code2, ImageIcon, Copy, Pencil, Info, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SharePanelProps } from "./types"

const SLUG = "kbxhc5"

function Tab({ icon: Icon, label, active }: { icon: typeof Link2; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 border-b-2 px-1 pb-2 text-sm font-medium",
        active ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </div>
  )
}

/** Recreates the "Share form" → Publish tab screen (the standalone /kbxhc5 share page). */
export function FormSharePanel({ variant, subdomain, onEditSubdomain }: SharePanelProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full max-w-2xl rounded-[var(--radius-lg)] border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-sm font-semibold">Share &quot;B2B Demo Request &amp; Lead Qualification&quot;</h2>
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
      </div>

      <div className="mb-5 flex items-center gap-6">
        <Tab icon={Link2} label="Publish" active />
        <Tab icon={Code2} label="Embed" />
        <Tab icon={ImageIcon} label="Your Own Form UI" />
      </div>

      <p className="text-sm font-semibold">Your form is published.</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Your published form can be accessed at the link below.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">Your form link</label>
        <div className="flex items-center gap-3 text-xs font-medium text-primary">
          <button className="flex items-center gap-1 hover:underline">
            <Pencil className="h-3 w-3" /> Edit URL
          </button>
          {variant === "inline-link" && (
            <button onClick={onEditSubdomain} className="flex items-center gap-1 hover:underline">
              <Pencil className="h-3 w-3" /> Edit subdomain
            </button>
          )}
        </div>
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
            <span className="text-muted-foreground">.formaloo.me/</span>
            <span className="font-medium text-foreground">{SLUG}</span>
          </p>
        ) : (
          <p className="min-w-0 truncate text-sm">
            <span className="text-muted-foreground">
              https://{subdomain}.formaloo.me/
            </span>
            <span className="font-medium text-foreground">{SLUG}</span>
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
            <p className="text-xs text-muted-foreground">{subdomain}.formaloo.me</p>
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
            placeholder=""
            className="w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
          />
          <button className="shrink-0 text-sm font-medium text-muted-foreground">Save</button>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Use your custom domain here to share this form on a branded link.
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-[var(--radius)] bg-primary/5 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-primary">How to point Custom domains</span>
          <br />
          If you set this, your form will be displayed on your custom domain (e.g. https://example.co).{" "}
          <span className="underline">How to point custom domains to Formaloo</span>
        </p>
      </div>
    </div>
  )
}
