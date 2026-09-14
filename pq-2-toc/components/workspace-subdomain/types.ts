export type SubdomainVariant =
  | "today"
  | "inline-link"
  | "dedicated-row"
  | "inline-url"
  | "header-menu"

export interface SharePanelProps {
  variant: SubdomainVariant
  subdomain: string
  /** Per Farokh's review: the Option C hint is Workspace-Admin-only. */
  isAdmin: boolean
  onEditSubdomain: () => void
}
