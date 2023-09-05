import { create } from 'zustand'

type ControlsDrawerState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useControlsDrawerStore = create<ControlsDrawerState>()(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
