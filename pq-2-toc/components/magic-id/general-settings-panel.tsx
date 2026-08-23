export function GeneralSettingsPanel() {
  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <div className="mb-4 flex gap-2">
        <button className="flex-1 rounded-[var(--radius)] border border-border py-1.5 text-xs font-medium">
          Logic map
        </button>
        <button className="flex-1 rounded-[var(--radius)] border border-border py-1.5 text-xs font-medium">
          Advanced logic
        </button>
      </div>

      <p className="mb-2 text-sm font-semibold">General</p>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm">Form is published</span>
        <div className="h-5 w-9 rounded-full" style={{ background: "hsl(var(--brand))" }}>
          <div className="mt-0.5 ml-4 h-4 w-4 rounded-full bg-background shadow" />
        </div>
      </div>

      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Default language</label>
      <div className="mb-4 rounded-[var(--radius)] border border-border px-3 py-2 text-sm">English</div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Active from</label>
          <div className="rounded-[var(--radius)] border border-border px-3 py-2 text-xs text-muted-foreground">
            DD/MM/YY
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Active to</label>
          <div className="rounded-[var(--radius)] border border-border px-3 py-2 text-xs text-muted-foreground">
            DD/MM/YY
          </div>
        </div>
      </div>

      <p className="mb-2 mt-2 border-t border-border pt-4 text-sm font-semibold">Submission Settings</p>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm">Limit to one entry per IP</span>
        <div className="h-5 w-9 rounded-full bg-secondary">
          <div className="mt-0.5 ml-0.5 h-4 w-4 rounded-full bg-background shadow" />
        </div>
      </div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Max responses</label>
      <div className="rounded-[var(--radius)] border border-border px-3 py-2 text-xs text-muted-foreground">
        Leave empty for unlimited
      </div>
    </div>
  )
}
