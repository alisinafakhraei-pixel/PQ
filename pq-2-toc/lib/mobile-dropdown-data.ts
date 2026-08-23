export interface DropdownOption {
  emoji: string
  label: string
}

export interface DropdownField {
  id: string
  label: string
  options: DropdownOption[]
}

/** Below this many options, the search input is hidden — scrolling the short list is enough. */
export const SEARCH_THRESHOLD = 5

export const dropdownFields: DropdownField[] = [
  {
    id: "lunch",
    label: "Choose your lunch",
    options: [
      { emoji: "🍗", label: "Chicken" },
      { emoji: "🥗", label: "Salad" },
      { emoji: "🍝", label: "Spaghetti" },
      { emoji: "🥪", label: "Sandwich" },
      { emoji: "🍜", label: "Vegetarian pasta" },
      { emoji: "🍲", label: "Soup" },
    ],
  },
  {
    id: "spice",
    label: "Spice level",
    options: [
      { emoji: "🌶️", label: "Mild" },
      { emoji: "🔥", label: "Medium" },
      { emoji: "🌋", label: "Hot" },
    ],
  },
]
