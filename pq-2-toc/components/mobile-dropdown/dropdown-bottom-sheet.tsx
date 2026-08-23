"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { SEARCH_THRESHOLD, type DropdownField } from "@/lib/mobile-dropdown-data"

interface DropdownBottomSheetProps {
  field: DropdownField
  onSelect: (label: string) => void
  onClose: () => void
}

export function DropdownBottomSheet({ field, onSelect, onClose }: DropdownBottomSheetProps) {
  const [query, setQuery] = useState("")
  const showSearch = field.options.length > SEARCH_THRESHOLD

  const filtered = useMemo(() => {
    if (!showSearch) return field.options
    const q = query.trim().toLowerCase()
    if (!q) return field.options
    return field.options.filter((o) => o.label.toLowerCase().includes(q))
  }, [field.options, query, showSearch])

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative flex max-h-[70%] flex-col rounded-t-2xl bg-background pb-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex justify-center pb-2 pt-2.5">
          <div className="h-1 w-9 rounded-full bg-border" />
        </div>

        {showSearch && (
          <div className="mx-4 mb-2 flex items-center gap-2 rounded-[var(--radius)] border border-border bg-secondary/40 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find an option"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">No options match &ldquo;{query}&rdquo;</p>
          )}
          {filtered.map((option) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              className="flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-3 text-left transition-colors hover:bg-secondary"
            >
              <span className="text-lg leading-none">{option.emoji}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
