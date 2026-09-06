export function LoadingScreen({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <div
        className="mb-6 h-10 w-10 animate-spin rounded-full border-[3px] border-secondary"
        style={{ borderTopColor: "hsl(var(--brand))" }}
      />
      <p className="text-base font-semibold">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
