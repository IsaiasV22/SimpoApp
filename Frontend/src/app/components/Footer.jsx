"use client";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a href="#!" className="btn btn-outline-light m-1" role="button">
            <i className="bi bi-facebook"></i> {/* Ícono de Facebook */}
          </a>

          <a href="#!" className="btn btn-outline-light m-1" role="button">
            <i className="bi bi-instagram"></i> {/* Ícono de Instagram */}
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright: SIMPO APP
      </div>
    </footer>
  );
};

export default Footer;
