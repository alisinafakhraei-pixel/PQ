"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Link2, ClipboardList, Search } from "lucide-react"
import { FieldIcon } from "@/components/shared/field-icon"
import { systemVariableGroups, connectableForms, RECENT_FORM_COUNT } from "@/lib/piping-data"
import { cn } from "@/lib/utils"

interface PipingMenuProps {
  onInsert: (tag: string) => void
  onClose: () => void
  className?: string
}

type Screen = "root" | "all-forms" | "form-detail"

export function PipingMenu({ onInsert, onClose, className }: PipingMenuProps) {
  const [screen, setScreen] = useState<Screen>("root")
  const [activeFormId, setActiveFormId] = useState<string | null>(null)
  const [cameFromAllForms, setCameFromAllForms] = useState(false)
  const [formSearch, setFormSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const recentForms = connectableForms.slice(0, RECENT_FORM_COUNT)
  const filteredForms = useMemo(() => {
    const q = formSearch.trim().toLowerCase()
    if (!q) return connectableForms
    return connectableForms.filter((f) => f.title.toLowerCase().includes(q))
  }, [formSearch])

  const activeForm = connectableForms.find((f) => f.id === activeFormId) ?? null

  function openForm(id: string, fromAllForms: boolean) {
    setActiveFormId(id)
    setCameFromAllForms(fromAllForms)
    setScreen("form-detail")
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex max-h-96 w-80 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover text-popover-foreground shadow-lg",
        className
      )}
    >
      {screen === "form-detail" && activeForm && (
        <>
          <button
            onClick={() => setScreen(cameFromAllForms ? "all-forms" : "root")}
            className="flex items-center gap-1.5 border-b border-border px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            {activeForm.title}
          </button>
          <div className="flex-1 overflow-y-auto p-1.5">
            <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">Fields</p>
            {activeForm.fields.map((field, i) => (
              <button
                key={field.tag}
                onClick={() => onInsert(`${activeForm.id}.${field.tag}`)}
                className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-1 rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 text-xs">
                  <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-sm">{field.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">@{field.tag}</span>
              </button>
            ))}

            {activeForm.reviewLabel && (
              <>
                <p className="mt-1 px-2.5 py-1.5 text-xs font-medium text-muted-foreground">Review & summary</p>
                <button
                  onClick={() => onInsert(`${activeForm.id}.review`)}
                  className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
                >
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 truncate text-sm">{activeForm.reviewLabel}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">@re...</span>
                </button>
              </>
            )}
          </div>
        </>
      )}

      {screen === "all-forms" && (
        <>
          <button
            onClick={() => {
              setScreen("root")
              setFormSearch("")
            }}
            className="flex items-center gap-1.5 border-b border-border px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            All forms
          </button>
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={formSearch}
              onChange={(e) => setFormSearch(e.target.value)}
              placeholder="Search forms..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-1.5">
            {filteredForms.length === 0 && (
              <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">
                No forms match &ldquo;{formSearch}&rdquo;
              </p>
            )}
            {filteredForms.map((form) => (
              <button
                key={form.id}
                onClick={() => openForm(form.id, true)}
                className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
              >
                <Link2 className="h-4 w-4 shrink-0" style={{ color: "hsl(var(--brand))" }} />
                <span className="flex-1 truncate text-sm">{form.title}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </>
      )}

      {screen === "root" && (
        <div className="flex-1 overflow-y-auto p-1.5">
          {systemVariableGroups.map((group) => (
            <div key={group.title} className="mb-1">
              <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">{group.title}</p>
              {group.items.map((item) => (
                <button
                  key={item.tag}
                  onClick={() => onInsert(item.tag)}
                  className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
                >
                  <span className="flex-1 truncate text-sm">{item.label}</span>
                  <span className="shrink-0 truncate text-xs text-muted-foreground">@{item.tag.slice(0, 5)}</span>
                </button>
              ))}
            </div>
          ))}

          <div className="border-t border-border pt-1">
            <p className="px-2.5 py-1.5 text-xs font-medium" style={{ color: "hsl(var(--brand))" }}>
              Connect your forms
            </p>
            {recentForms.map((form) => (
              <button
                key={form.id}
                onClick={() => openForm(form.id, false)}
                className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-secondary"
              >
                <Link2 className="h-4 w-4 shrink-0" style={{ color: "hsl(var(--brand))" }} />
                <span className="flex-1 truncate text-sm">{form.title}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </button>
            ))}
            <button
              onClick={() => setScreen("all-forms")}
              className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate text-sm">Search all forms</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
