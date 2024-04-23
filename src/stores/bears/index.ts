import { create } from 'zustand'

interface BearState {
  blackBears: number
  polarBears: number
  pandaBears: number
  
  bears: { id: number, name: string }[]

  computed: {
    totalBears: number
  }

  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void
  doNothing: () => void
  addBears: () => void
  resetBears: () => void
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 20,
  polarBears: 3,
  pandaBears: 12,
  bears: [],

  computed: {
    get totalBears() {
      const total = get().blackBears + get().polarBears + get().pandaBears + get().bears.length
      return total
    }
  },

  increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
  doNothing: () => set((state) => ({ bears: [...state.bears]})),
  resetBears: () => set(() => ({bears: [] })),
  addBears: () => set((state) => ({ bears: [
    ...state.bears,
    {
      id: state.bears.length + 1,
      name: `Bear #${state.bears.length + 1}`
    }
  ]})),
}))