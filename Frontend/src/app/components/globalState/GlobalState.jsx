"use client";
import { create } from "zustand";

const useGlobalState = create((set) => {
  // Retrieve the user state from localStorage if it exists
  const userState =
    typeof window !== "undefined" && localStorage.getItem("user");
  const rolState = typeof window !== "undefined" && localStorage.getItem("rol");
  //manage if user is suscribed or not
  const suscribedState =
    typeof window !== "undefined" && localStorage.getItem("suscribed");

  //manage if high contrast is enabled
  const high_contrastState =
    typeof window !== "undefined" && localStorage.getItem("high_contrast");

  //manage languague i18n
  const i18nState =
    typeof window !== "undefined" && localStorage.getItem("i18nextLng");

  const initialState = {
    user: userState ? JSON.parse(userState) : false,
    rol: rolState ? JSON.parse(rolState) : 0,
    suscribed: suscribedState ? JSON.parse(suscribedState) : false,
    high_contrast: high_contrastState ? JSON.parse(high_contrastState) : false,
    
    setUser: (user) => {
      // Update the user state and store it in localStorage
      set({ user });
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(user));
    },
    setRol: (rol) => {
      // Update the user state and store it in localStorage
      set({ rol });
      typeof window !== "undefined" &&
        localStorage.setItem("rol", JSON.stringify(rol));
    },
    setSuscribed: (suscribed) => {
      // Update the user state and store it in localStorage
      set({ suscribed });
      typeof window !== "undefined" &&
        localStorage.setItem("suscribed", JSON.stringify(suscribed));
    },
    setHighContrast: (high_contrast) => {
      // Update the user state and store it in localStorage
      set({ high_contrast });
      typeof window !== "undefined" &&
        localStorage.setItem("high_contrast", JSON.stringify(high_contrast));
    },

  };

  return initialState;
});

export default useGlobalState;
