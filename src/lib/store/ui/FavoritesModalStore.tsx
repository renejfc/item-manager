import { create } from 'zustand'

type FavoritesModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useFavoritesModalStore = create<FavoritesModalState>()(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
