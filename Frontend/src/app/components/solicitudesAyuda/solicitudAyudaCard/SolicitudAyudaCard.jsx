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
  async function handleEstado(solicitudAyudaId, estado) {
    console.log(element);
    let response = null;
    try {
      if (estado) {
        response = await fetch(`${urlServer}solicitudesAyuda/unsolved`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ solicitudAyudaId: solicitudAyudaId }),
          credentials: "include",
        });
      } else {
        response = await fetch(`${urlServer}solicitudesAyuda/solved`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ solicitudAyudaId: solicitudAyudaId }),
          credentials: "include",
        });
      }
      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  async function handleDelete(solicitudAyudaId) {
    try {
      const response = await fetch(`${urlServer}solicitudesAyuda/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solicitudAyudaId: solicitudAyudaId }),
        credentials: "include",
      });
      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

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
      <ToastContainer />
      <div className="card" style={{ width: "50%" }}>
        <div className="card-header">
          <div className="d-flex">
            <h5 style={{ width: "25%" }}> {element.nombre_usuario}</h5>
            <h5>{element.correo}</h5>
          </div>
          <div>{element.descripcion}</div>
        </div>

        <div className="card-footer d-flex justify-content-end">
          <button
            //on click cambiar el estado de activo
            onClick={() => {
              handleDelete(element.PK_solicitud_ayuda);
            }}
            className="btn btn-secondary"
            style={{ margin: "3px" }}
          >
            Eliminar
          </button>
          <button
            //on click cambiar el estado de activo
            onClick={() => {
              handleEstado(element.PK_solicitud_ayuda, element.estado);
            }}
            className="btn btnn-primary"
            style={{ margin: "3px" }}
          >
            {element.estado ? "Listo" : "Pendiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SolicitudAyudaCard;
