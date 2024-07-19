import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { PersonSlice, createPersonSlice } from './person.slice';
import { GuestSlice, createGuestSlice } from './guest.slice';
import { DateSlice, createDateSlice } from './date.slice-str';
// import { ConfirmationSlice, createConfirmationSlice } from './confirmation.slice';



// Crear el store
type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
  persist(
    devtools( 
      (...slice) => ({
        ...createPersonSlice(...slice),
        ...createGuestSlice(...slice),
        ...createDateSlice(...slice)
      })
    ), { name: 'wedding-store' }
  )
);