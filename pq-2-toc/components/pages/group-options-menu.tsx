"use client"

import { useEffect, useRef, useState } from "react"
import { MoreHorizontal, FileText, Code2, Settings, Pencil, Copy, Lock, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GroupOptionsMenuProps {
  onNewPage: () => void
  className?: string
}

const MENU_ITEMS = [
  { icon: FileText, label: "New page", highlight: true, trigger: true },
  { icon: Code2, label: "Live embed page", trigger: true },
  { icon: Settings, label: "Page options" },
  { icon: Pencil, label: "Rename" },
  { icon: Copy, label: "Duplicate" },
  { icon: Lock, label: "Access" },
]

/**
 * The hover "..." menu on a sidebar nav group. Adds "New page" as its top, highlighted entry
 * so it's reachable from the same surface as Page options/Rename/Duplicate/Access, not just
 * the bottom "+ New Page" button. "Live embed page" opens the same setup modal too, so every
 * "add a page" trigger in this menu behaves consistently.
 */
export function GroupOptionsMenu({ onNewPage, className }: GroupOptionsMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded text-muted-foreground opacity-0 transition-opacity hover:bg-secondary hover:text-foreground group-hover/header:opacity-100",
          open && "opacity-100"
        )}
        aria-label="Page options"
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-44 rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-lg">
          {MENU_ITEMS.map(({ icon: Icon, label, highlight, trigger }) => (
            <button
              key={label}
              onClick={() => {
                if (trigger) onNewPage()
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-secondary",
                highlight && "font-medium"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", highlight ? "text-primary" : "text-muted-foreground")} />
              {label}
            </button>
          ))}
          <button className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-destructive hover:bg-destructive/10">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  )
}
