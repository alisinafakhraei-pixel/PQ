"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { EditorTopBar } from "@/components/shared/editor-top-bar"
import { FormulaSidebar, type VariableEntry } from "./formula-sidebar"
import { FormulaCanvas } from "./formula-canvas"
import { VariableSettingsPanel } from "./variable-settings-panel"
import { FormulaEditorModal } from "./formula-editor-modal"
import type { FormulaToken } from "@/lib/formula-data"

const VARIABLES: VariableEntry[] = [
  { id: "var_1", title: "Variable" },
  { id: "var_2", title: "Variable" },
]

export function FormulaDemo() {
  const [selectedVariableId, setSelectedVariableId] = useState<string | null>("var_2")
  const [formulas, setFormulas] = useState<Record<string, FormulaToken[]>>({
    var_1: [],
    var_2: [],
  })
  const [modalOpen, setModalOpen] = useState(false)

  const selectedVariable = VARIABLES.find((v) => v.id === selectedVariableId) ?? null

  return (
    <div className="flex h-svh flex-col bg-background">
      <EditorTopBar
        leadingActions={
          <button className="flex items-center gap-1.5 rounded-[var(--radius)] border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">
            <Sparkles className="h-4 w-4" style={{ color: "hsl(var(--brand))" }} />
            AI
          </button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <FormulaSidebar
          variables={VARIABLES}
          selectedVariableId={selectedVariableId}
          onSelectVariable={setSelectedVariableId}
        />

        <FormulaCanvas />

        <aside className="w-80 shrink-0 border-l border-border bg-background">
          {selectedVariable ? (
            <VariableSettingsPanel
              title={selectedVariable.title}
              fieldId={selectedVariable.id}
              tokens={formulas[selectedVariable.id] ?? []}
              onExpand={() => setModalOpen(true)}
              onClose={() => setSelectedVariableId(null)}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Select a variable field to edit its formula.
            </div>
          )}
        </aside>
      </div>

      {modalOpen && selectedVariable && (
        <FormulaEditorModal
          tokens={formulas[selectedVariable.id] ?? []}
          onChange={(tokens) => setFormulas((prev) => ({ ...prev, [selectedVariable.id]: tokens }))}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
