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
          {/* Bandera 1 */}
          <img
            src="ruta_a_la_imagen_de_la_bandera_1"
            onClick={() => setSelectedLanguage("bandera1")}
            style={{ width: "30px", cursor: "pointer" }}
          />
          {/* Bandera 2 */}
          <img
            src="ruta_a_la_imagen_de_la_bandera_2"
            onClick={() => setSelectedLanguage("bandera2")}
            style={{ width: "30px", cursor: "pointer" }}
          />
        </div>
      </div>
    </NavDropdown.Item>
  );
}
