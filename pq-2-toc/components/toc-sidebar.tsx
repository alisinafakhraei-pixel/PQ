"use client"

import { useEffect, useRef, useState } from "react"
import { AlignLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  index: number
  title: string
  subtitle?: string
}

interface TocSidebarProps {
  title: string
  items: TocItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function TocSidebar({ title, items, activeIndex, onSelect }: TocSidebarProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div ref={containerRef} className="fixed right-5 top-1/2 z-40 -translate-y-1/2">
      {open && (
        <div className="absolute bottom-0 right-14 w-64 rounded-[var(--radius-lg)] border border-border bg-popover p-2 text-popover-foreground shadow-lg">
          <p className="truncate px-2.5 py-1.5 text-sm font-semibold">{title}</p>
          <nav className="mt-0.5 max-h-80 space-y-0.5 overflow-y-auto">
            {items.map((item) => {
              const isActive = item.index === activeIndex
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item.index)
                    setOpen(false)
                  }}
                  className={cn(
                    "block w-full truncate rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-secondary font-medium text-foreground"
                      : "text-foreground/70 hover:bg-secondary/60"
                  )}
                  title={item.title}
                >
                  {item.title}
                </button>
              )
            })}
          </nav>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Table of contents"
        className={cn(
          "flex h-14 w-9 items-center justify-center rounded-[var(--radius)] border border-border bg-card shadow-sm transition-colors hover:bg-secondary",
          open && "bg-secondary"
        )}
      >
        <AlignLeft className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  )
}
