"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logout/Logout";
import { toast } from "react-toastify";
import useGlobalState from "./globalState/GlobalState";

const Header = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const [user] = useGlobalState((state) => [state.user]);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img
              className="logo-img img-fluid w-75 w-md-100"
              src="/images/LogoUCR.png"
              alt="Cimpa"
              style={{ maxWidth: "170px" }}
            ></img>
            <img
              className="logo-img img-fluid w-75 w-md-100"
              src="/images/LogoCimpaHorizontal.png"
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
              <Link
                href={user ? "/simposios" : "/"}
                className="nav-link"
                aria-current="page"
                style={{ color: "#ffffff" }}
              >
                Home
              </Link>
            </li>
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
                    <p>Calendario</p>
                  </div>
                </li>
              </Link>
            )}
            {user && (
              <li className="nav-item">
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
