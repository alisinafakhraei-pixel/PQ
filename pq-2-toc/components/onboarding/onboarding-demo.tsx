"use client"

import { useState } from "react"
import { OnboardingFormScreen } from "./onboarding-form-screen"
import { OnboardingLandingScreen } from "./onboarding-landing-screen"
import { LoadingScreen } from "@/components/shared/loading-screen"
import { BackButton } from "@/components/shared/back-button"

type Stage = "form" | "loading" | "landing"

function firstNameOf(value: string) {
  return value.trim().split(/\s+/)[0] ?? ""
}

export function OnboardingDemo() {
  const [stage, setStage] = useState<Stage>("form")
  const [name, setName] = useState("")
  const [workspace, setWorkspace] = useState("")
  const [workspaceTouched, setWorkspaceTouched] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [workspaceError, setWorkspaceError] = useState(false)

  function handleNameChange(value: string) {
    setName(value)
    if (value.trim()) setNameError(false)

    if (!workspaceTouched) {
      const first = firstNameOf(value)
      const autoWorkspace = first ? `${first}'s Workspace` : ""
      setWorkspace(autoWorkspace)
      if (autoWorkspace.trim()) setWorkspaceError(false)
    }
  }

  function handleWorkspaceChange(value: string) {
    setWorkspaceTouched(true)
    setWorkspace(value)
    if (value.trim()) setWorkspaceError(false)
  }

  const canSubmit = name.trim().length > 0 && workspace.trim().length > 0

  function handleSubmit() {
    const nameEmpty = !name.trim()
    const workspaceEmpty = !workspace.trim()
    setNameError(nameEmpty)
    setWorkspaceError(workspaceEmpty)
    if (nameEmpty || workspaceEmpty) return

    setStage("loading")
    window.setTimeout(() => setStage("landing"), 1800)
  }

  if (stage === "landing") {
    return <OnboardingLandingScreen name={name} workspace={workspace} />
  }

  return (
    <div className="relative">
      <BackButton
        label="All prototypes"
        fallbackHref="/week-2"
        className="absolute left-4 top-4 z-20 rounded-full bg-background/70 px-2.5 py-1 text-xs backdrop-blur"
        iconClassName="h-3 w-3"
      />

      {stage === "loading" && (
        <LoadingScreen title="Setting up your workspace..." subtitle="Just a second." />
      )}
      {stage === "form" && (
        <OnboardingFormScreen
          name={name}
          workspace={workspace}
          nameError={nameError}
          workspaceError={workspaceError}
          canSubmit={canSubmit}
          onNameChange={handleNameChange}
          onWorkspaceChange={handleWorkspaceChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
