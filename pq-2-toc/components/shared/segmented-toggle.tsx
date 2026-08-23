"use client"

import { cn } from "@/lib/utils"

export interface SegmentedToggleOption<T extends string> {
  value: T
  label: string
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/** A small pill-shaped mode switcher, e.g. for A/B-ing a prototype's placement or behavior. */
export function SegmentedToggle<T extends string>({ options, value, onChange, className }: SegmentedToggleProps<T>) {
  return (
    <div className={cn("flex items-center rounded-full border border-border bg-background p-0.5", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            value === option.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
