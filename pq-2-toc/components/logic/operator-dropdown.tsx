"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import type { ConditionOperator, OperatorOption } from "@/lib/logic-operators"
import { cn } from "@/lib/utils"

interface OperatorDropdownProps {
  operators: OperatorOption[]
  value: ConditionOperator
  onChange: (value: ConditionOperator) => void
  className?: string
}

/** A real, functional replacement for the static operator chip — lets a condition's operator actually change. */
export function OperatorDropdown({ operators, value, onChange, className }: OperatorDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = operators.find((op) => op.value === value)
  const regularOperators = operators.filter((op) => !op.isNew)
  const newOperators = operators.filter((op) => op.isNew)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-secondary/50"
      >
        <span className="flex-1 truncate">{current?.label ?? value}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-56 rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-lg">
          {regularOperators.map((op) => (
            <button
              key={op.value}
              onClick={() => {
                onChange(op.value)
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm hover:bg-secondary"
            >
              <Check className={cn("h-3.5 w-3.5 shrink-0", op.value === value ? "opacity-100" : "opacity-0")} />
              <span className="flex-1 truncate">{op.label}</span>
            </button>
          ))}

          {newOperators.length > 0 && (
            <>
              <div className="my-1 border-t border-border" />
              <p className="px-2.5 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                New
              </p>
              {newOperators.map((op) => (
                <button
                  key={op.value}
                  onClick={() => {
                    onChange(op.value)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm hover:bg-secondary"
                >
                  <Check className={cn("h-3.5 w-3.5 shrink-0", op.value === value ? "opacity-100" : "opacity-0")} />
                  <span className="flex-1 truncate">{op.label}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
