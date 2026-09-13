export type PinVariant = "today" | "title-row" | "below-title" | "breadcrumb" | "top-right"

export interface PinPlacementProps {
  variant: PinVariant
  pinned: boolean
  onTogglePin: () => void
}
