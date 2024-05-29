import React from "react";
import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import useGlobalState from "../globalState/GlobalState";
import "./AccessibilityDropdown.css";
import LanguageDropdown from "@/app/components/languageDropdown/languageDropdown"
import { useTranslation } from "react-i18next";

const AccessibilityDropdown = () => {
  //global high contrast state
  const [high_contrast, setHighContrast] = useGlobalState((state) => [
    state.high_contrast,
    state.setHighContrast,
  ]);
  const [switchActive, setSwitchActive] = useState(high_contrast);
  //i18n
  const { t } = useTranslation(["common"]);

  const handleSwitchClick = (e) => {
    // Evita que el evento de clic se propague hacia arriba
    e.stopPropagation();
    setSwitchActive(!switchActive);
    setHighContrast(!switchActive);
  };
  return (
    <div style={{ display: "flex" }} className="dropdown">
      <NavDropdown
        id="nav-dropdown-white"
        title={
          <>
            <i
              style={{ marginRight: "5px", color: "#ffffff"}}
              className="bi bi-universal-access-circle"
            ></i>
            
            <span style={{color:"#ffffff"}}>{t("Accessibility")}</span>
          </>
        }
        onToggle={() => {}} // prettier-ignore
        
      >
        <NavDropdown.Item onClick={handleSwitchClick}>
          <div style={{ display: "flex" }}>
            <i
              className="fa-sharp fa-solid fa-circle-half-stroke"
              style={{ color: "#74C0FC" }}
            ></i>
            {t("High_contrast_mode")}
            <div style={{ marginLeft: "20px" }}>
              <Form>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  checked={switchActive}
                  onClick={handleSwitchClick}
                />
              </Form>
            </div>
          </div>
        </NavDropdown.Item>
        <LanguageDropdown/>
      </NavDropdown>
    </div>
  );
};

export default AccessibilityDropdown;

{
  /* <div
className="nav-link btn btn-link dropdown-toggle"
id="dropdownAccessibility"
role="button"
data-bs-toggle="dropdown"
aria-expanded="false"
>
<div style={{ display: "flex" }}>
  <i
    style={{ marginRight: "5px" }}
    className="bi bi-universal-access-circle"
  ></i>{" "}
  Accessibility
</div>
</div>
<ul className="dropdown-menu" aria-labelledby="dropdownAccessibility">
</ul> */
}
