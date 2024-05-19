
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import trEN from "./en/common.json"
import trES from "./es/common.json"

function getI18nState() {
  const i18nState = typeof window !== 'undefined' ? localStorage.getItem("i18nextLng") : null;
  if (i18nState === 'en') {
    console.log('Indeed, the language is English');
    return 'en';
  }
  console.log('Indeed, the language is Spanish');
  //caso en el que haya que setear el item en el local storage
  if(!i18nState) {
    typeof window !== 'undefined' && localStorage.setItem("i18nextLng", 'es');
  }
  return 'es';
}

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
    lng: getI18nState(),
    ns: ["common"],
    defaultNS: "common",
    fallbackNS: "common",
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
