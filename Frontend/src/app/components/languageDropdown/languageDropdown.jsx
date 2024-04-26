"use client";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import useGlobalState from "../globalState/GlobalState";
import Form from "react-bootstrap/Form";
//import the i18n instance
import "@/app/locales/locale";
import { useTranslation } from "react-i18next";

export default function languageDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Estado para almacenar la opción seleccionada
  
  //i18n translate strategy
  const { t, i18n } = useTranslation(["common"]);
  // set selected language
  const handleClick = (language) => {
    const lng = language;
    console.log("Language selected: ", lng);
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    
  };

  return (
    <NavDropdown.Item>
      <div style={{ display: "flex", alignItems: "center" }}>
        Language
        <div style={{ display: "flex", marginLeft: "auto" }}>
          {/* Engish en 1 */}
          <img
            src="https://cdn.gtranslate.net/flags/svg/en.svg"
            onClick={() => handleClick("en")}
            style={{ width: "30px", cursor: "pointer", marginRight: "10px" }}
          />
          {/* Spanish es */}
          <img
            src="https://cdn.gtranslate.net/flags/svg/es.svg"
            onClick={() => handleClick("es")}
            style={{ width: "30px", cursor: "pointer", marginRight: "10px" }}
          />
        </div>
      </div>
    </NavDropdown.Item>
  );
}
