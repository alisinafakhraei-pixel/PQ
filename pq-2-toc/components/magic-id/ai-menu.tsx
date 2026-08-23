"use client"

import { useEffect, useRef, useState } from "react"
import {
  Sparkles,
  ChevronDown,
  Wand2,
  Briefcase,
  Heart,
  Scissors,
  SpellCheck2,
  HelpCircle,
  GitBranch,
  Palette,
  Mail as MailIcon,
  Mic,
  Hash,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AiMenuProps {
  onMagicId: () => void
}

interface MenuItem {
  label: string
  icon: typeof Wand2
  highlight?: boolean
  onClick?: () => void
}

export function AiMenu({ onMagicId }: AiMenuProps) {
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

  const groups: { title: string; items: MenuItem[] }[] = [
    {
      title: "Magic rewrite",
      items: [
        { label: "Make it clear", icon: Wand2 },
        { label: "Make it professional", icon: Briefcase },
        { label: "Make it friendly", icon: Heart },
        { label: "Make it shorter", icon: Scissors },
        { label: "Fix spelling & grammar", icon: SpellCheck2 },
      ],
    },
    {
      title: "Magic question",
      items: [{ label: "Add related questions", icon: HelpCircle }],
    },
    {
      title: "Magic ID",
      items: [
        {
          label: "Generate missing IDs",
          icon: Hash,
          highlight: true,
          onClick: () => {
            onMagicId()
            setOpen(false)
          },
        },
      ],
    },
    {
      title: "Magic Logic",
      items: [{ label: "Make logic rules", icon: GitBranch }],
    },
    {
      title: "Magic Design",
      items: [{ label: "Style your form", icon: Palette }],
    },
    {
      title: "Integrations",
      items: [
        { label: "CC Formaloo", icon: MailIcon },
        { label: "Magic voice", icon: Mic },
      ],
    },
  ]

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary",
          open && "bg-secondary"
        )}
      >
        <Sparkles className="h-4 w-4" style={{ color: "hsl(var(--brand))" }} />
        AI
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-[var(--radius-lg)] border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
          {groups.map((group, gi) => (
            <div key={group.title} className={cn(gi > 0 && "mt-1 border-t border-border pt-1")}>
              <p className="px-2.5 py-1 text-xs font-medium text-muted-foreground">{group.title}</p>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-secondary",
                    item.highlight && "font-medium"
                  )}
                  style={item.highlight ? { color: "hsl(var(--brand))" } : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
