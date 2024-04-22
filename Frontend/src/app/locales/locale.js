"use client";
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import trEN from "./en/common.json"
import trES from "./es/common.json"


const resources = {
  en: { common: trEN },
  es: { common: trES },
}

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: typeof window !== 'undefined' && localStorage.getItem('i18nextLng'),
    ns: ["common"],
    defaultNS: "common",
    fallbackNS: "common",
    fallbackLng: ["es", "dev"],
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      wait: true,
      useSuspense: false
    },
  })

export default i18n
