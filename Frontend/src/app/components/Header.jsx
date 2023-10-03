"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logout/Logout";
import { toast } from "react-toastify";

const Header = ({ onLogged, isLogged }) => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img
              className="logo-img img-fluid w-75 w-md-100"
              src="https://www.cimpa.ucr.ac.cr/images/Cimpa/images/Logos/Logo_incio_ODI.png"
              alt="Cimpa"
              style={{ maxWidth: "500px" }}
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
              <a
                className="nav-link active text-info"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            {isLogged && (
              <li className="nav-item">
                <LogoutButton onLogged={onLogged}/>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
