/**
 * Prototypes that aren't tied to a Linear PQ issue (e.g. one-off explorations),
 * so they get their own route instead of going through /{slug}/{number}.
 */
export interface StandalonePrototype {
  id: string
  title: string
  summary: string
  week: number
  href: string
}

export const standalonePrototypes: StandalonePrototype[] = [
  {
    id: "workspace-subdomain",
    title: "Where should “Edit workspace subdomain” live in Share?",
    summary:
      "Four placement ideas for a new subdomain-edit entry point in the form and project Share sidebars — next to Edit URL, a dedicated row, inline on the link, or behind a header ⋯ menu.",
    week: 2,
    href: "/workspace-subdomain",
  },
  {
    id: "project-pin",
    title: "Where should the \"pin this project\" icon live?",
    summary:
      "Four placement ideas for pinning a project from inside it, without going back to the home sidebar list — next to the title, a row below it, in the breadcrumb, or the top-right icon cluster.",
    week: 2,
    href: "/project-pin",
  },
]
