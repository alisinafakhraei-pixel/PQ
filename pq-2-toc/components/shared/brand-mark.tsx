import { cn } from "@/lib/utils"

/** The small orange Formaloo "F" square used in headers and page chrome. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex h-7 w-7 items-center justify-center rounded-md", className)}
      style={{ background: "hsl(var(--brand))" }}
    >
      <span className="text-xs font-bold text-white">F</span>
    </div>
  )
}
