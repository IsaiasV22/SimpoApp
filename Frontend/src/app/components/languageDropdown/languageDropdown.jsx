"use client";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import useGlobalState from "../globalState/GlobalState";
import Form from "react-bootstrap/Form";

export default function languageDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState("bandera1"); // Estado para almacenar la opción seleccionada

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
            onClick={() => setSelectedLanguage("en")}
            style={{ width: "30px", cursor: "pointer", marginRight: "10px",}}
          />
          {/* Spanish es */}
          <img
            src="https://cdn.gtranslate.net/flags/svg/es.svg"
            onClick={() => setSelectedLanguage("es")}
            style={{ width: "30px", cursor: "pointer" ,marginRight: "10px",}}
          />
        </div>
      </div>
    </NavDropdown.Item>
  );
}
