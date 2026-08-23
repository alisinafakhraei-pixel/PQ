"use client"

import Link from "next/link"
import { ArrowLeft, Settings, Paintbrush, Bell, Eye, Share2 } from "lucide-react"
import { AiMenu } from "./ai-menu"

export function TopBar({ onMagicId }: { onMagicId: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="flex items-center gap-2">
        <AiMenu onMagicId={onMagicId} />
        {[Settings, Paintbrush, Bell, Eye, Share2].map((Icon, i) => (
          <button
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius)] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <button
          className="ml-1 rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "hsl(var(--primary))" }}
        >
          Save
        </button>
      </div>
    </div>
  )
}
