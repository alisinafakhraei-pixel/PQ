"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { TopBar } from "./top-bar"
import { FieldsSidebar } from "./fields-sidebar"
import { EditorCanvas } from "./editor-canvas"
import { GeneralSettingsPanel } from "./general-settings-panel"
import { FieldSettingsPanel } from "./field-settings-panel"
import { initialFields, generateMagicIds, type EditorField } from "@/lib/magic-id-data"

export function FormEditorDemo() {
  const [fields, setFields] = useState<EditorField[]>(initialFields)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [justUpdatedIds, setJustUpdatedIds] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)

  const selectedIndex = fields.findIndex((f) => f.id === selectedId)
  const selectedField = selectedIndex >= 0 ? fields[selectedIndex] : null

  function handleMagicId() {
    const before = fields
    const after = generateMagicIds(before)
    const changed = new Set(
      after.filter((f, i) => f.fieldId !== before[i].fieldId).map((f) => f.id)
    )

    setFields(after)
    setJustUpdatedIds(changed)
    setToast(
      changed.size > 0
        ? `Generated IDs for ${changed.size} field${changed.size > 1 ? "s" : ""}`
        : "All fields already have an ID"
    )

    window.setTimeout(() => setJustUpdatedIds(new Set()), 2500)
    window.setTimeout(() => setToast(null), 3000)
  }

  function handleSelect(id: string) {
    setSelectedId((current) => (current === id ? null : id))
  }

  return (
    <div className="flex h-svh flex-col bg-background">
      <TopBar onMagicId={handleMagicId} />

      <div className="flex flex-1 overflow-hidden">
        <FieldsSidebar
          fields={fields}
          selectedId={selectedId}
          justUpdatedIds={justUpdatedIds}
          onSelect={handleSelect}
        />

        <EditorCanvas
          fields={fields}
          selectedId={selectedId}
          justUpdatedIds={justUpdatedIds}
          onSelect={handleSelect}
        />

        <aside className="w-80 shrink-0 border-l border-border bg-background">
          {selectedField ? (
            <FieldSettingsPanel
              field={selectedField}
              index={selectedIndex}
              justUpdated={justUpdatedIds.has(selectedField.id)}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <GeneralSettingsPanel />
          )}
        </aside>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
          <Sparkles className="h-4 w-4" style={{ color: "hsl(var(--brand))" }} />
          {toast}
        </div>
      )}
    </div>
  )
}
