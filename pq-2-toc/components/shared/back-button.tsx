"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  label?: string
  /** Used only when there's no real browser history to go back to (e.g. a direct link/refresh). */
  fallbackHref?: string
  className?: string
  iconClassName?: string
}

/**
 * True "back" navigation (browser history), not a hardcoded destination — falls back to
 * `fallbackHref` only when there's nothing to go back to (opened directly, refreshed, etc.).
 * Use this instead of `<Link href="...">` for every "← Back" / "← All prototypes" link.
 */
export function BackButton({
  label = "Back",
  fallbackHref = "/",
  className,
  iconClassName,
}: BackButtonProps) {
  const router = useRouter()

  function handleClick() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <ArrowLeft className={cn("h-4 w-4", iconClassName)} /> {label}
    </button>
  )
}
