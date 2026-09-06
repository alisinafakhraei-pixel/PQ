"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Plus, GripVertical, Table2, FileText, Kanban, File } from "lucide-react"
import { BackButton } from "@/components/shared/back-button"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { ProjectView } from "@/components/shared/project-view"
import { cn } from "@/lib/utils"

type Variant = "today" | "always-visible" | "toolbar" | "end-prompt"
type BlockKey = "tips" | "form-card" | "table"

const VARIANTS: { value: Variant; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "always-visible", label: "A — Always visible" },
  { value: "toolbar", label: "B — Toolbar button" },
  { value: "end-prompt", label: "C — End-of-content prompt" },
]

const VARIANT_NOTES: Record<Variant, string> = {
  today:
    "The only way to add a block: hover over a section (tips, the form card, or the table) until a faint \"+ ⋮⋮\" appears in its gutter. Easy to miss, especially on a page with little content to hover over.",
  "always-visible":
    "The same gutter control on every section — tips, the form card, and the table — shown at reduced opacity all the time (full opacity on hover/focus). No hovering required to notice it's there.",
  toolbar:
    "Keeps the per-section hover gutter, and adds an always-visible \"Add block\" button pinned to the top of the page — a page-level action, not scoped to any one section.",
  "end-prompt":
    "Keeps the per-section hover gutter, and adds a persistent, low-commitment prompt at the very end of the page — after the response table, where a real \"end of content\" would be.",
}

const BLOCK_TYPES = [
  { icon: Table2, label: "Table" },
  { icon: FileText, label: "Form" },
  { icon: Kanban, label: "Kanban" },
  { icon: File, label: "Page" },
]

function BlockTypeMenu({ onSelect, className }: { onSelect: (label: string) => void; className?: string }) {
  return (
    <div
      className={cn(
        "w-48 rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        className
      )}
    >
      <p className="px-2 py-1 text-[11px] font-medium text-muted-foreground">Add to this page</p>
      {BLOCK_TYPES.map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-secondary"
        >
          <Icon className="h-3.5 w-3.5 text-muted-foreground" /> {label}
        </button>
      ))}
    </div>
  )
}

/**
 * PQ-43 — the in-content "+" for adding a table/form/Kanban/page only shows up on hover, so
 * it's easy to miss. Rendered inside the real ProjectView (not a mock), with the gutter
 * applied to every major section (tips, form card, table) so the
 * alternatives can be judged the way they'd actually appear across the page.
 */
export function AddBlockVariantsDemo() {
  const [variant, setVariant] = useState<Variant>("today")
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null)
  const [addedNote, setAddedNote] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenMenuFor(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function changeVariant(next: Variant) {
    setVariant(next)
    setOpenMenuFor(null)
    setAddedNote(null)
  }

  function handleAdd(label: string) {
    setOpenMenuFor(null)
    setAddedNote(`Added a ${label} block.`)
    window.setTimeout(() => setAddedNote(null), 2000)
  }

  const gutterOpacity =
    variant === "always-visible" ? "opacity-40 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"

  function wrapBlock(key: BlockKey, node: ReactNode) {
    return (
      <div className="group relative -mx-2 flex items-start gap-1 rounded-[var(--radius-sm)] px-2 py-2 transition-colors hover:bg-black/5">
        <div className="relative flex w-9 shrink-0 items-center gap-0.5 pt-1">
          <button
            onClick={() => setOpenMenuFor(openMenuFor === key ? null : key)}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded text-muted-foreground transition-opacity hover:bg-secondary hover:text-foreground",
              gutterOpacity,
              openMenuFor === key && "opacity-100"
            )}
            aria-label="Add block"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <GripVertical
            className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground/70 transition-opacity", gutterOpacity)}
          />
          {openMenuFor === key && (
            <BlockTypeMenu onSelect={handleAdd} className="absolute left-0 top-full z-30 mt-1" />
          )}
        </div>
        <div className="min-w-0 flex-1">{node}</div>
      </div>
    )
  }

  const aboveContent =
    variant === "toolbar" ? (
      <div className="relative flex justify-end border-b border-border bg-secondary/30 px-10 py-2">
        <button
          onClick={() => setOpenMenuFor(openMenuFor === "top" ? null : "top")}
          className="flex items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-sm transition-colors hover:bg-secondary"
        >
          <Plus className="h-3.5 w-3.5" /> Add block
        </button>
        {openMenuFor === "top" && (
          <BlockTypeMenu onSelect={handleAdd} className="absolute right-10 top-full z-30 mt-1" />
        )}
      </div>
    ) : undefined

  const afterTable =
    variant === "end-prompt" ? (
      <div className="relative mt-4">
        <button
          onClick={() => setOpenMenuFor(openMenuFor === "end" ? null : "end")}
          className="flex w-full items-center gap-2 rounded-[var(--radius)] border border-dashed border-border px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" /> Add a table, form, Kanban, or page
        </button>
        {openMenuFor === "end" && <BlockTypeMenu onSelect={handleAdd} className="absolute left-0 top-full z-30 mt-1" />}
      </div>
    ) : undefined

  return (
    <div ref={containerRef} className="flex h-svh flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <BackButton label="All prototypes" fallbackHref="/week-2" className="text-xs" iconClassName="h-3.5 w-3.5" />
        <SegmentedToggle options={VARIANTS} value={variant} onChange={changeVariant} />
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-2">
        <p className="max-w-2xl text-xs text-muted-foreground">{VARIANT_NOTES[variant]}</p>
        {addedNote && (
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
            {addedNote}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <ProjectView
          aboveContent={aboveContent}
          afterTable={afterTable}
          renderBlockWrapper={(key, node) => wrapBlock(key, node)}
        />
      </div>
    </div>
  )
}
