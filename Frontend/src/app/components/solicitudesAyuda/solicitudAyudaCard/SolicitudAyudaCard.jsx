import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { urlServer } from "@/app/Utiles.jsx";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
//router from next/navigation
import { useRouter } from "next/navigation";
import "@/app/App.css";

function SolicitudAyudaCard({ element, user, rol }) {
  return (
    <div
      key={element.Pk_solicitud_ayuda}
      className="col-12 mb-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card">
        <div className="card-header">
          <div className="d-flex">
            <h3>{element.nombre_usuario}</h3>
            
            <h3>{element.correo}</h3>
          </div>

          <div>{element.descripcion}</div>
        </div>

        <div className="card-footer d-flex footer-simposio">
          {user && rol === 1 && (
            <>
              <button
                //on click cambiar el estado de activo
                onClick={() => {
                  handleEstadoActivo(
                    element.PK_evento_contenedor,
                    element.activo
                  );
                }}
                className="btn btnn-primary"
                style={{ margin: "3px" }}
              >
                {element.activo ? "Ocultar" : "Mostrar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SolicitudAyudaCard;
