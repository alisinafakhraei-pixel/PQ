export type SubdomainVariant =
  | "today"
  | "inline-link"
  | "dedicated-row"
  | "inline-url"
  | "header-menu"

export interface SharePanelProps {
  variant: SubdomainVariant
  subdomain: string
  onEditSubdomain: () => void
}
