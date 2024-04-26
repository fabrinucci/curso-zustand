import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { customSessionStorage } from '../storages/sessionStorage.store';

interface Person {
  firstName: string
  lastName: string
  
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeApi: StateCreator<Person, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value) => set(() => ({ firstName: value }), false, 'setFirstName'),
  setLastName: (value) => set(() => ({ lastName: value }), false, 'setLastName')
})

export const usePersonStore = create<Person>()(
  devtools(
    persist(storeApi, {
      storage: customSessionStorage,
      name: 'person-store',
    })
  )
);
