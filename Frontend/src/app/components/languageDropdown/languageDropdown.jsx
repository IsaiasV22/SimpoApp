"use client";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import useGlobalState from "../globalState/GlobalState";
import Form from "react-bootstrap/Form";
//import the i18n instance
import { useTranslation } from "react-i18next";

export default function languageDropdown() {
    //global i18n state
    const setI18nState = useGlobalState((state) => state.setI18nState);
    const i18nState = useGlobalState((state) => state.i18nState);
    //high contrast state
    const high_contrast = useGlobalState((state) => state.high_contrast);

  const [selectedLanguage, setSelectedLanguage] = useState(i18nState?i18nState:"en"); // Estado para almacenar la opción seleccionada

  //i18n translate strategy
  const { t, i18n } = useTranslation(["common"]);
  // set selected language
  const handleClick = (language) => {
    const lng = language;
    setSelectedLanguage(lng);
    setI18nState(lng);
    i18n.changeLanguage(lng);
    
  };

  //color border for selected language
  const getColor = () => {
    if (high_contrast) {
      return "#005DA4";
    } else {
      return "#00C0F3";
    }
  };

  return (
    <NavDropdown.Item onClick={(e)=>e.stopPropagation()}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {t("Language")}
        <div style={{ display: "flex", marginLeft: "auto" }}>
          {/* Engish en 1 */}
          <img
            src="https://cdn.gtranslate.net/flags/svg/en.svg"
            onClick={() => handleClick("en")}
            style={{ width: "30px", cursor: "pointer", marginRight: "10px",
                    border: selectedLanguage === "en" ? `2px solid ${getColor()}` : "none"}}
            title={t('English')}
          />
          {/* Spanish es */}
          <img
            src="https://cdn.gtranslate.net/flags/svg/es.svg"
            onClick={() => handleClick("es")}
            style={{ width: "30px", cursor: "pointer", marginRight: "10px",
                    border: selectedLanguage === "es" ? `2px solid ${getColor()}` : "none"}}
            title={t('Spanish')}
          />
        </div>
      </div>
    </NavDropdown.Item>
  );
}
