"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, AtSign, Bold, Italic, Underline, Link2 as LinkIcon } from "lucide-react"
import { PipingMenu } from "./piping-menu"

const INITIAL_BODY = `Hi @full_name,

Good news. Your referral has been reviewed and approved. Your care team will reach out to schedule your appointment.

Thanks,
Acme Co.
`

export function EmailTemplateDemo() {
  const [body, setBody] = useState(INITIAL_BODY)
  const [menuOpen, setMenuOpen] = useState(false)
  const [triggeredByTyping, setTriggeredByTyping] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setBody(value)

    const cursor = e.target.selectionStart
    if (value[cursor - 1] === "@") {
      setTriggeredByTyping(true)
      setMenuOpen(true)
    }
  }

  function insertTag(tag: string) {
    const textarea = textareaRef.current
    if (!textarea) return

    if (triggeredByTyping) {
      const cursor = textarea.selectionStart
      const before = body.slice(0, cursor - 1)
      const after = body.slice(cursor)
      const next = `${before}@${tag} ${after}`
      setBody(next)
    } else {
      const cursor = textarea.selectionStart
      const before = body.slice(0, cursor)
      const after = body.slice(cursor)
      const next = `${before}@${tag} ${after}`
      setBody(next)
    }

    setMenuOpen(false)
    setTriggeredByTyping(false)
    requestAnimationFrame(() => textarea.focus())
  }

  return (
    <div className="flex h-svh flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <span className="text-sm font-medium text-muted-foreground">
          Applicant · Referral approved · Next steps
        </span>
        <button
          className="rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "hsl(var(--primary))" }}
        >
          Save template
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-1 border-b border-border px-3 py-2">
            {[Bold, Italic, Underline, LinkIcon].map((Icon, i) => (
              <button
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
            <div className="relative ml-1">
              <button
                onClick={() => {
                  setTriggeredByTyping(false)
                  setMenuOpen((v) => !v)
                }}
                className="flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <AtSign className="h-3.5 w-3.5" /> Insert variable
              </button>
              {menuOpen && (
                <div className="absolute left-0 top-full z-50 mt-1.5">
                  <PipingMenu
                    onInsert={insertTag}
                    onClose={() => {
                      setMenuOpen(false)
                      setTriggeredByTyping(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <textarea
              ref={textareaRef}
              value={body}
              onChange={handleChange}
              className="h-full w-full resize-none rounded-[var(--radius)] border border-transparent bg-transparent text-sm leading-relaxed outline-none focus:border-border"
              spellCheck={false}
            />
          </div>
          <p className="border-t border-border px-6 py-2 text-xs text-muted-foreground">
            Type <span className="font-mono">@</span> anywhere in the email to insert a system variable or a field
            from a connected form.
          </p>
        </div>

        <aside className="w-72 shrink-0 overflow-y-auto border-l border-border px-4 py-4">
          <p className="mb-3 text-sm font-semibold">Email template setting</p>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Template name</p>
          <div className="mb-4 rounded-[var(--radius)] border border-border px-3 py-2 text-sm">
            Applicant · Referral approved · Next steps
          </div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Email subject</p>
          <div className="mb-4 rounded-[var(--radius)] border border-border px-3 py-2 text-sm">
            Your referral is approved! Here&apos;s what happens next
          </div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Email server</p>
          <div className="rounded-[var(--radius)] border border-border px-3 py-2 text-sm">Formaloo</div>
        </aside>
      </div>
    </div>
  )
}
