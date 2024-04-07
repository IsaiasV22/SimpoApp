"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logout/Logout";
import { toast } from "react-toastify";
import useGlobalState from "./globalState/GlobalState";
import "../css/header.css";
import AccessibilityDropdown from "./accessibilityDropdown/AccessibilityDropdown";

const Header = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const [isAccessibilityDropdownOpen, setAccessibilityDropdownOpen] =
    useState(false);
  //const [user] = useGlobalState((state) => [state.user]);
  const [user, rol] = useGlobalState((state) => [state.user, state.rol]);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const toggleAccessibilityDropdown = () => {
    setAccessibilityDropdownOpen(!isAccessibilityDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img
              className="logo-img img-fluid w-75 w-md-100 mobile-image"
              src="/Images/LogoUCR.png"
              alt="Cimpa"
              style={{ maxWidth: "170px" }}
            ></img>
            <img
              className="logo-img img-fluid w-75 w-md-100 mobile-image"
              src="/Images/LogoCimpaHorizontal.png"
              alt="Cimpa"
              style={{ maxWidth: "400px" }}
            ></img>
          </a>

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
                      <p>Home</p>
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
                    <p>Scanner</p>
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
                    <p>Calendar</p>
                  </div>
                </li>
              </Link>
            )}

              <li className="nav-item">
              <AccessibilityDropdown/>
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
