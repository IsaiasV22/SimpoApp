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
  //i18n
  //i18n translate strategy
  const { t, i18n } = useTranslation(["common"]);
  // set selected language
    const handleClick = (language) => {
        console.log("language", language);
        setSelectedLanguage(language);
        i18n.changeLanguage(selectedLanguage);
    };

  return (
    <NavDropdown.Item>
      <div style={{ display: "flex", alignItems: "center" }}>
        <i
          className="fa-sharp fa-solid fa-circle-half-stroke"
          style={{ color: "#74C0FC" }}
        ></i>
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
