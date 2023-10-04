"use client";
import React, { useState, useEffect } from "react";
import "./Ponente.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Ponente({ ponente }) {
  return (
    <div className="main-content">
    <div className="container my-5">
      {ponente ? (
        <>
          <h1 className="mb-4">Ponente</h1>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Información</h5>
                  <p className="card-text">{"Nombre: " + ponente.nombre}</p>
                  <p className="card-text">{"Apellidos: " + ponente.apellidos}</p>
                  <p className="card-text">{"Afiliación: " + ponente.afiliacion}</p>
                  <p className="card-text">{"Correo: " + ponente.correo}</p>
                  <p className="card-text">{"País: " + ponente.pais}</p>
                  <p className="card-text">{"Ciudad: " + ponente.ciudad}</p>
                  <p className="card-text">{"Teléfono: " + ponente.telefono}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Cargando ponente...</div>
      )}
    </div>
    <ToastContainer />
  </div>
  );
}
