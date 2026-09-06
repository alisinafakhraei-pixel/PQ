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

export const standalonePrototypes: StandalonePrototype[] = []
