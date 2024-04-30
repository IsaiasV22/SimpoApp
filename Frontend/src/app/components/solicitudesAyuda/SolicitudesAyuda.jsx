"use client";
import React, { useEffect, useState } from "react";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "../globalState/GlobalState";
import SolicitudAyudaCard from "./solicitudAyudaCard/SolicitudAyudaCard";

export default function SolicitudesAyuda() {
  const [solicitudes, setSolicitudes] = useState([]);
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const high_contrast = useGlobalState((state) => state.high_contrast);

  async function handleSolicitudesAyuda() {
    try {
      let response = await fetch(`${urlServer}solicitudesAyuda/all`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de solicitudes de ayuda");
      }
      const data = await response.json();
      setSolicitudes(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    handleSolicitudesAyuda();
  }, []);

  if (rol === 1) {
    return (
      <div className={`main-content ${high_contrast ? "high-contrast" : ""}`}>
        <ToastContainer />
        <div className="container">
          <h1 className="m-4" style={{ textAlign: "center" }}>
            Solicitudes de ayuda
          </h1>
          <div className="row">
            {solicitudes.length > 0 && user ? (
              solicitudes.map((element) => (
                <SolicitudAyudaCard
                  key={element.PK_solicitud_ayuda}
                  element={element}
                  user={user}
                  rol={rol}
                />
              ))
            ) : (
              <div className="col-12">No hay solicitudes</div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Only administrators can access this page</h1>
      </div>
    );
  }
}
