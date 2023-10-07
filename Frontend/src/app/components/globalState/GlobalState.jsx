/*import {create} from 'zustand';
//import { persist } from 'zustand/middleware';

const useGlobalState = create(
  (set) => ({
    user: false,
    setUser: (user) => set({ user })
  })
);

export default useGlobalState;*/

import { create } from 'zustand';

const useGlobalState = create((set) => {
  // Retrieve the user state from localStorage if it exists
  const userState = typeof window !== 'undefined' && localStorage.getItem('user');
  const initialState = {
    user: userState ? JSON.parse(userState) : false,
    setUser: (user) => {
      // Update the user state and store it in localStorage
      set({ user });
      typeof window !== 'undefined' && localStorage.setItem('user', JSON.stringify(user));
    },
  };

  return initialState;
});

export default useGlobalState;