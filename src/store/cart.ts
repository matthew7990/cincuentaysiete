import { create } from 'zustand'

interface CartState {
  items: Record<string, number>
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

export const useCart = create<CartState>((set) => ({
  items: {},
  add: (id) =>
    set((s) => ({ items: { ...s.items, [id]: (s.items[id] ?? 0) + 1 } })),
  remove: (id) =>
    set((s) => {
      const next = { ...s.items }
      if ((next[id] ?? 0) <= 1) delete next[id]
      else next[id] = next[id] - 1
      return { items: next }
    }),
  clear: () => set({ items: {} }),
}))
