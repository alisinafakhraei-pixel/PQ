"use client"

import { useEffect, useRef } from "react"
import { NewPageSetupSteps, type NewPageChoice } from "./new-page-setup-steps"
import { cn } from "@/lib/utils"

interface NewPageSetupDropdownProps {
  onCreate: (choice: NewPageChoice) => void
  onClose: () => void
  className?: string
}

/** Idea 2 — the same "New page" setup flow, anchored under its trigger as a dropdown instead of a centered popup. */
export function NewPageSetupDropdown({ onCreate, onClose, className }: NewPageSetupDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-full z-30 mt-2 w-80 rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-lg",
        className
      )}
    >
      <NewPageSetupSteps onCreate={onCreate} onClose={onClose} />
    </div>
  )
}
