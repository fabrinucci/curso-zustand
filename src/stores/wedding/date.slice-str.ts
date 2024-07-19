import { StateCreator } from 'zustand'

export interface DateSlice {
  eventDate: string,
  setEventDate(date: string): void
}

export const createDateSlice: StateCreator<DateSlice> = (set) => ({
  eventDate: '',
  setEventDate: (date) => set({ eventDate: date })
})