"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logout/Logout";
import { toast } from "react-toastify";
import useGlobalState from "./globalState/GlobalState";
import "../css/header.css";
import AccessibilityDropdown from "./accessibilityDropdown/AccessibilityDropdown";
import "@/app/locales/locale";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const [isAccessibilityDropdownOpen, setAccessibilityDropdownOpen] =
    useState(false);
  //const [user] = useGlobalState((state) => [state.user]);
  const [user, rol, high_contrast] = useGlobalState((state) => [
    state.user,
    state.rol,
    state.high_contrast,
  ]);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const toggleAccessibilityDropdown = () => {
    setAccessibilityDropdownOpen(!isAccessibilityDropdownOpen);
  };

  const goToURL = (url) => {
    // alert to confirm the redirection to the specified URL
    if (confirm(`${t("La app lo va a redirigir a ")}${url}${t(" ¿Desea continuar?")}`)) {
      window
        .open(url, "_blank")
        .focus(); // open the URL in a new tab and focus on it
  };
};

  const { t, i18n } = useTranslation(["common"]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light navbar-custom ${
        high_contrast ? "high-contrast" : ""
      }`}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <div className="navbar-brand">
            <img
              className="logo-img img-fluid w-75 w-md-100 mobile-image"
              src="/Images/LogoUCR.png"
              alt="Cimpa"
              style={{ maxWidth: "170px", cursor: "pointer"}}
              onClick={() => {goToURL("https://www.ucr.ac.cr/")}}
              title={t("Go to UCR website")}
            ></img>
            <img
              className="logo-img img-fluid w-75 w-md-100 mobile-image"
              src="/Images/LogoCimpaHorizontal.png"
              alt="Cimpa"
              style={{ maxWidth: "400px", cursor: "pointer"}}
              onClick={() => {goToURL("https://cimpa.ucr.ac.cr/")}}
              title={t("Go to CIMPA website")}
            ></img>
          </div>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isMenuCollapsed ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span
              className="navbar-toggler-icon"
              style={{ fontSize: "0.8rem" }}
            ></span>
          </button>
        </div>

        {/* Items del menú */}
        <div
          className={`collapse navbar-collapse ${
            isMenuCollapsed ? "" : "show"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {user ? (
                <Link
                  href={user ? "/simposios" : "/"}
                  className="nav-link"
                  aria-current="page"
                  style={{ color: "#ffffff" }}
                >
                  <li className="nav-item">
                    <div style={{ display: "flex" }}>
                      <i
                        className="bi bi-house-door-fill"
                        style={{
                          marginRight: "5px",
                          transform: "scale(1.2)",
                        }}
                      ></i>
                      <p>{t("Home")}</p>
                    </div>
                  </li>
                </Link>
              ) : (
                <></>
              )}
            </li>

            {user && rol === 1 && (
              <Link
                href="/qrScanner"
                className="nav-link"
                style={{ color: "#ffffff" }}
              >
                <li className="nav-item">
                  <div style={{ display: "flex" }}>
                    <i
                      className="bi bi-qr-code-scan"
                      style={{ marginRight: "5px", transform: "scale(1.2)" }}
                    ></i>
                    <p>{t("Scanner")}</p>
                  </div>
                </li>
              </Link>
            )}
            {user && (
              <Link
                href="/calendario"
                className="nav-link"
                style={{ color: "#ffffff" }}
              >
                <li className="nav-item">
                  <div style={{ display: "flex" }}>
                    <i
                      className="bi bi-calendar"
                      style={{ marginRight: "5px" }}
                    ></i>
                    <p>{t("Calendar")}</p>
                  </div>
                </li>
              </Link>
            )}

            {user && (
              <Link
                href={rol === 1 ? "/solicitudesAyuda" : "/ayuda"}
                className="nav-link"
                style={{ color: "#ffffff" }}
              >
                <li className="nav-item">
                  <div style={{ display: "flex" }}>
                    <i
                      className="bi bi-question-circle"
                      style={{ marginRight: "5px" }}
                    ></i>
                    {rol === 1 ? (
                      <p>{t("help requests")}</p>
                    ) : (
                      <p>{t("help")}</p>
                    )}
                  </div>
                </li>
              </Link>
            )}

            <li className="nav-item">
              <AccessibilityDropdown />
            </li>

            {user && (
              <li className="nav-item">
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>
      </div>
      {isAccessibilityDropdownOpen && <AccessibilityDropdown />}
    </nav>
  );
};

export default Header;
