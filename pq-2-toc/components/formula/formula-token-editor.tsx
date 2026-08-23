"use client"

import { useEffect, useRef, useState } from "react"
import { FieldIcon } from "@/components/shared/field-icon"
import { FieldReferencePicker } from "./field-reference-picker"
import { formulaFieldById, type FormulaToken } from "@/lib/formula-data"
import { cn } from "@/lib/utils"

let nextTokenId = 1
function genId() {
  return `tok-${nextTokenId++}`
}

function emptyTextToken(): FormulaToken {
  return { id: genId(), kind: "text", value: "" }
}

/** Guarantees the array is non-empty and always ends in an editable text token. */
function normalize(tokens: FormulaToken[]): FormulaToken[] {
  if (tokens.length === 0) return [emptyTextToken()]
  if (tokens[tokens.length - 1].kind === "field") return [...tokens, emptyTextToken()]
  return tokens
}

const OPERATORS: { symbol: string; label: string }[] = [
  { symbol: "+", label: "Add" },
  { symbol: "-", label: "Subtract" },
  { symbol: "×", label: "Multiply" },
  { symbol: "÷", label: "Divide" },
  { symbol: "(", label: "Open parenthesis" },
  { symbol: ")", label: "Close parenthesis" },
]

interface FormulaTokenEditorProps {
  tokens: FormulaToken[]
  onChange: (tokens: FormulaToken[]) => void
  autoFocus?: boolean
}

export function FormulaTokenEditor({ tokens, onChange, autoFocus }: FormulaTokenEditorProps) {
  const [activeTokenId, setActiveTokenId] = useState<string | null>(null)
  const [pickerForTokenId, setPickerForTokenId] = useState<string | null>(null)
  const inputRefs = useRef(new Map<string, HTMLInputElement>())
  const pendingCaret = useRef<{ tokenId: string; pos: number } | null>(null)

  useEffect(() => {
    if (!pendingCaret.current) return
    const { tokenId, pos } = pendingCaret.current
    const input = inputRefs.current.get(tokenId)
    if (input) {
      input.focus()
      input.setSelectionRange(pos, pos)
    }
    pendingCaret.current = null
  }, [tokens])

  useEffect(() => {
    if (autoFocus) {
      const last = tokens[tokens.length - 1]
      if (last?.kind === "text") {
        requestAnimationFrame(() => inputRefs.current.get(last.id)?.focus())
      }
    }
    // Only run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function commit(next: FormulaToken[]) {
    onChange(normalize(next))
  }

  function handleTextChange(tokenId: string, value: string, cursor: number) {
    if (value.endsWith("@")) {
      setPickerForTokenId(tokenId)
    }
    commit(tokens.map((t) => (t.id === tokenId && t.kind === "text" ? { ...t, value } : t)))
    void cursor
  }

  function handleFieldSelect(fieldId: string) {
    const anchorId = pickerForTokenId
    setPickerForTokenId(null)
    if (!anchorId) return

    const idx = tokens.findIndex((t) => t.id === anchorId)
    if (idx === -1) return
    const anchorToken = tokens[idx]
    if (anchorToken.kind !== "text") return

    const input = inputRefs.current.get(anchorId)
    const cursor = input?.selectionStart ?? anchorToken.value.length
    const before = anchorToken.value.slice(0, Math.max(0, cursor - 1))
    const after = anchorToken.value.slice(cursor)

    const beforeToken: FormulaToken = { ...anchorToken, value: before }
    const fieldToken: FormulaToken = { id: genId(), kind: "field", fieldId }
    const afterToken: FormulaToken = { id: genId(), kind: "text", value: after }

    const next = [...tokens.slice(0, idx), beforeToken, fieldToken, afterToken, ...tokens.slice(idx + 1)]
    pendingCaret.current = { tokenId: afterToken.id, pos: after.length }
    commit(next)
  }

  function insertOperator(symbol: string) {
    let targetId = activeTokenId
    if (!targetId || tokens.find((t) => t.id === targetId)?.kind !== "text") {
      const last = tokens[tokens.length - 1]
      targetId = last?.kind === "text" ? last.id : null
    }

    if (!targetId) {
      const newTokenId = genId()
      pendingCaret.current = { tokenId: newTokenId, pos: symbol.length }
      commit([...tokens, { id: newTokenId, kind: "text", value: symbol }])
      return
    }

    const input = inputRefs.current.get(targetId)
    const token = tokens.find((t) => t.id === targetId)
    if (!token || token.kind !== "text") return
    const cursor = input?.selectionStart ?? token.value.length
    const value = `${token.value.slice(0, cursor)}${symbol}${token.value.slice(cursor)}`
    pendingCaret.current = { tokenId: targetId, pos: cursor + symbol.length }
    commit(tokens.map((t) => (t.id === targetId ? { ...t, value } : t)))
  }

  function removeField(tokenId: string) {
    commit(tokens.filter((t) => t.id !== tokenId))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-[var(--radius)] border border-border bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        {tokens.map((token) =>
          token.kind === "field" ? (
            <FieldPill key={token.id} fieldId={token.fieldId} onRemove={() => removeField(token.id)} />
          ) : (
            <span key={token.id} className="relative">
              <input
                ref={(el) => {
                  if (el) inputRefs.current.set(token.id, el)
                  else inputRefs.current.delete(token.id)
                }}
                value={token.value}
                onFocus={() => setActiveTokenId(token.id)}
                onChange={(e) => handleTextChange(token.id, e.target.value, e.target.selectionStart ?? 0)}
                placeholder={tokens.length === 1 ? "Example: price × quantity" : ""}
                className="min-w-[2ch] bg-transparent font-mono text-sm outline-none placeholder:font-sans placeholder:text-muted-foreground"
                style={{ width: `${Math.max(token.value.length, tokens.length === 1 ? 22 : 1) + 1}ch` }}
                spellCheck={false}
              />
              {pickerForTokenId === token.id && (
                <div className="absolute left-0 top-full z-50 mt-1.5">
                  <FieldReferencePicker onSelect={handleFieldSelect} onClose={() => setPickerForTokenId(null)} />
                </div>
              )}
            </span>
          )
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Type <span className="font-mono">@</span> to reference a field
        </p>
        <div className="flex items-center gap-1">
          {OPERATORS.map((op) => (
            <button
              key={op.symbol}
              title={op.label}
              onClick={() => insertOperator(op.symbol)}
              className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-border font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {op.symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FieldPill({ fieldId, onRemove }: { fieldId: string; onRemove: () => void }) {
  const field = formulaFieldById(fieldId)
  if (!field) return null
  return (
    <span className="group inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-accent px-1.5 py-1 text-sm text-accent-foreground">
      <FieldIcon kind={field.kind} className="h-3.5 w-3.5" />
      {field.title}
      <button
        onClick={onRemove}
        className={cn(
          "ml-0.5 rounded-sm text-accent-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent-foreground"
        )}
        aria-label={`Remove ${field.title}`}
      >
        ×
      </button>
    </span>
  )
}
