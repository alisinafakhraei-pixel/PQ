"use client"

import type { ReactNode } from "react"
import { EditorTopBar } from "@/components/shared/editor-top-bar"
import { AiMenu } from "./ai-menu"

interface TopBarProps {
  onMagicId: () => void
  shareCallout?: ReactNode
  saveCallout?: ReactNode
}

export function TopBar({ onMagicId, shareCallout, saveCallout }: TopBarProps) {
  return (
    <EditorTopBar
      leadingActions={<AiMenu onMagicId={onMagicId} />}
      shareCallout={shareCallout}
      saveCallout={saveCallout}
    />
  )
}
