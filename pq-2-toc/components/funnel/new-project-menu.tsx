"use client"

import { useEffect, useRef } from "react"
import {
  FileText,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  Compass,
  LayoutTemplate,
} from "lucide-react"
import { cn } from "@/lib/utils"

const TYPES = [
  { icon: FileText, label: "Form" },
  { icon: BookOpen, label: "Memory form" },
  { icon: ClipboardList, label: "Survey" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Building2, label: "Custom CRM" },
  { icon: Users, label: "Customer portal" },
  { icon: Briefcase, label: "HR portal" },
  { icon: Compass, label: "Formaloo's Guide" },
  { icon: LayoutTemplate, label: "Explore templates" },
]

interface NewProjectMenuProps {
  onSelect: (label: string) => void
  onClose: () => void
  className?: string
}

/** The current "+New" project-type picker — 9 types before the user ever sees a form. */
export function NewProjectMenu({ onSelect, onClose, className }: NewProjectMenuProps) {
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

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-80 rounded-[var(--radius-lg)] border border-border bg-popover p-2 text-popover-foreground shadow-lg",
        className
      )}
    >
      <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">What do you want to create?</p>
      <div className="grid grid-cols-3 gap-1">
        {TYPES.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className="flex flex-col items-center gap-1.5 rounded-[var(--radius)] px-2 py-3 text-center transition-colors hover:bg-secondary"
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-[11px] font-medium leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
