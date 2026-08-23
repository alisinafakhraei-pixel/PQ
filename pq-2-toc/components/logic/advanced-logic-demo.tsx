"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"
import { LogicTopBar } from "./logic-top-bar"
import { FieldLogicSection } from "./field-logic-section"
import { AddFieldControl } from "./add-field-control"
import { SegmentedToggle } from "@/components/shared/segmented-toggle"
import { initialLogicFields, insertNewFieldAfter, type LogicField } from "@/lib/logic-data"
import type { FieldKind } from "@/lib/field-types"

type Placement = "top" | "per-question"

export function AdvancedLogicDemo() {
  const [placement, setPlacement] = useState<Placement>("top")
  const [fields, setFields] = useState<LogicField[]>(initialLogicFields)
  const [counter, setCounter] = useState(1)

  function handleAddField(afterId: string | null, kind: FieldKind) {
    setFields((current) => insertNewFieldAfter(current, afterId, kind, counter))
    setCounter((n) => n + 1)
  }

  return (
    <div className="flex h-svh flex-col bg-secondary/20">
      {/* Prototype control bar — not part of the feature itself */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-2.5">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All prototypes
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Button placement</span>
          <SegmentedToggle
            options={[
              { value: "top", label: "At the top" },
              { value: "per-question", label: "After each question" },
            ]}
            value={placement}
            onChange={setPlacement}
          />
        </div>
      </div>

      <LogicTopBar />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold">Fields</h1>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-4">
              {placement === "top" && (
                <AddFieldControl variant="page-header" onSelect={(kind) => handleAddField(null, kind)} />
              )}
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
                Also trigger all fields rules when a response is updated
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {fields.map((field, i) => (
              <FieldLogicSection
                key={field.id}
                field={field}
                index={i}
                showInlineAddField={placement === "per-question"}
                onAddFieldAfter={(kind) => handleAddField(field.id, kind)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
