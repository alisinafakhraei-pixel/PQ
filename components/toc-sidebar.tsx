"use client"

import { Check, List } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  index: number
  title: string
  subtitle?: string
}

interface TocSidebarProps {
  items: TocItem[]
  activeIndex: number
  completedIndexes: Set<number>
  onSelect: (index: number) => void
}

export function TocSidebar({ items, activeIndex, completedIndexes, onSelect }: TocSidebarProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <List className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Table of contents
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {items.map((item) => {
          const isActive = item.index === activeIndex
          const isDone = completedIndexes.has(item.index)
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.index)}
              className={cn(
                "group mb-0.5 flex w-full items-start gap-3 rounded-[var(--radius)] px-3 py-2.5 text-left transition-colors",
                isActive
                  ? "bg-accent"
                  : "hover:bg-secondary"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isDone
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground"
                )}
              >
                {isDone && !isActive ? <Check className="h-3 w-3" /> : item.index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block truncate text-sm",
                    isActive ? "font-semibold text-accent-foreground" : "font-medium text-foreground/80"
                  )}
                >
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
