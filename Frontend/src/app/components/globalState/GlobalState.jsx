import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalState = create(
  (set) => ({
    user: false,
    setUser: (user) => set({ user })
  }),
  {
    name: 'my-app-storage', // nombre del item en localStorage
  }
);

export default useGlobalState;