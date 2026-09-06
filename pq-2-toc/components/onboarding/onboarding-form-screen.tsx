"use client"

import { BrandMark } from "@/components/shared/brand-mark"
import { cn } from "@/lib/utils"

interface OnboardingFormScreenProps {
  name: string
  workspace: string
  nameError: boolean
  workspaceError: boolean
  canSubmit: boolean
  onNameChange: (value: string) => void
  onWorkspaceChange: (value: string) => void
  onSubmit: () => void
}

export function OnboardingFormScreen({
  name,
  workspace,
  nameError,
  workspaceError,
  canSubmit,
  onNameChange,
  onWorkspaceChange,
  onSubmit,
}: OnboardingFormScreenProps) {
  return (
    <div className="flex min-h-svh bg-background">
      <div className="flex w-full flex-col justify-center px-8 py-16 sm:px-16 lg:w-[46%] lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <BrandMark className="mb-8" />

          <h1 className="mb-2 text-2xl font-bold">Let&apos;s set up your workspace</h1>
          <p className="mb-8 text-sm text-muted-foreground">Just two things, then you&apos;re in.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
            className="space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                autoFocus
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Jane Doe"
                className={cn(
                  "w-full rounded-[var(--radius)] border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2",
                  nameError
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-border focus:border-primary focus:ring-primary/20"
                )}
              />
              {nameError && <p className="mt-1.5 text-xs text-destructive">Enter your name to continue</p>}
            </div>

            <div>
              <label htmlFor="workspace" className="mb-1.5 block text-sm font-medium">
                Workspace name
              </label>
              <input
                id="workspace"
                value={workspace}
                onChange={(e) => onWorkspaceChange(e.target.value)}
                placeholder="Jane's Workspace"
                className={cn(
                  "w-full rounded-[var(--radius)] border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2",
                  workspaceError
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-border focus:border-primary focus:ring-primary/20"
                )}
              />
              {workspaceError ? (
                <p className="mt-1.5 text-xs text-destructive">Give your workspace a name to continue</p>
              ) : (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  This is your team or company name. You can change it anytime in Settings.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={cn(
                "w-full rounded-[var(--radius)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity",
                canSubmit ? "opacity-100 hover:opacity-90" : "opacity-40"
              )}
              style={{ background: "hsl(var(--brand))" }}
            >
              Create workspace
            </button>
          </form>
        </div>
      </div>

      <div
        className="relative hidden overflow-hidden lg:block lg:w-[54%]"
        style={{ background: "hsl(217 79% 46% / 0.04)" }}
      >
        <div
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "hsl(var(--brand) / 0.15)" }}
        />
        <div
          className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "hsl(217 79% 46% / 0.12)" }}
        />

        <div className="relative flex h-full flex-col items-center justify-center px-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            What&apos;s next
          </p>
          <h2 className="mb-8 max-w-xs text-lg font-semibold">
            Your workspace, ready to go — no extra steps.
          </h2>

          <div className="mb-6 w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-6 text-left shadow-xl">
            <div className="mb-4 flex items-center gap-2">
              <BrandMark />
              <div className="h-2 w-24 rounded-full bg-secondary" />
              <div className="ml-auto h-6 w-6 rounded-full bg-secondary" />
            </div>
            <div className="mb-3 h-3 w-32 rounded-full bg-secondary" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 rounded-[var(--radius)] bg-secondary/70" />
              ))}
            </div>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Create forms, quizzes, and apps in seconds.
          </p>
        </div>
      </div>
    </div>
  )
}
