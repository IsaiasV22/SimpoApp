"use client";
import React, { useState, useEffect, use } from "react";
import "./Ponente.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function Ponente({ actividadIdP }) {
  //hook ponente
  const [ponente, setPonente] = useState(null);
  const { t } = useTranslation("actividades");
  useEffect(() => {
    handlePonente();
  }, []);
  //handlePonente
  //handleExponente
  async function handlePonente() {
    try {
      const response = await fetch(`${urlServer}ponentes/porActividadId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: actividadIdP }),
        credentials: "include",
      });
      const data = await response.json();
      //console.log("exponente por id: ", data[0]);
      setPonente(data[0]);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }


  return (
    <div className="main-content">
    <div className="container my-5">
      {ponente ? (
        <>
          <h1 className="mb-4">{t("Author")}</h1>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{t("Información")}</h5>
                  <p className="card-text">{t("Nombre: ") + ponente.nombre}</p>
                  <p className="card-text">{t("Apellidos: ") + ponente.apellidos}</p>
                  <p className="card-text">{t("Afiliación: ") + ponente.afiliacion}</p>
                  <p className="card-text">{t("País: ") + ponente.pais}</p>
                  <p className="card-text">{t("Ciudad: ") + ponente.ciudad}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{t("Cargando autor...")}</div>
      )}
    </div>
    <ToastContainer autoClose={false}/>
  </div>
  );
}
