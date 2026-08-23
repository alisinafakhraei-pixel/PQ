"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Search } from "lucide-react"
import { FieldIcon } from "./field-icon"
import { fieldTypeGroups } from "@/lib/field-type-picker-data"
import { fieldKindLabels, type FieldKind } from "@/lib/field-types"
import { cn } from "@/lib/utils"

interface FieldTypePickerProps {
  onSelect: (kind: FieldKind) => void
  onClose: () => void
  className?: string
}

/** A searchable, grouped field-type dropdown — matches the "Add field" picker in the Formaloo form builder. */
export function FieldTypePicker({ onSelect, onClose, className }: FieldTypePickerProps) {
  const [query, setQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return fieldTypeGroups

    return fieldTypeGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => fieldKindLabels[item.kind].toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex max-h-96 w-80 flex-col rounded-[var(--radius-lg)] border border-border bg-popover text-popover-foreground shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for field name..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-1.5">
        {filteredGroups.length === 0 && (
          <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">No field types match &ldquo;{query}&rdquo;</p>
        )}
        {filteredGroups.map((group) => (
          <div key={group.title} className="mb-1">
            <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">{group.title}</p>
            {group.items.map((item) => (
              <button
                key={item.kind}
                onClick={() => onSelect(item.kind)}
                className="flex w-full items-start gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
              >
                <FieldIcon kind={item.kind} className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm">{fieldKindLabels[item.kind]}</span>
                  {item.description && (
                    <span className="block truncate text-xs text-muted-foreground">{item.description}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
