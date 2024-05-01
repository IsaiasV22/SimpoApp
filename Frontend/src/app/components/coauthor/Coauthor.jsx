"use client";
import React, { useState, useEffect, use } from "react";
import "../ponente/Ponente.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function Coauthor({ coauthorC }) {
    console.log("Coauthor id in components: ", coauthorC);
  //hook coauthor
  const [coauthor, setCoauthor] = useState(null);
  const { t } = useTranslation("actividades");
  useEffect(() => {
    handleCoauthor();
  }, []);
    //handleCoauthor
  async function handleCoauthor() {
    try {
      const response = await fetch(`${urlServer}usuarios/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula: coauthorC }),
        credentials: "include",
      });
      const data = await response.json();
      //console.log("exponente por id: ", data[0]);
      setCoauthor(data[0]);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }


  return (
    <div className="main-content">
    <div className="container my-5">
      {coauthor ? (
        <>
          <h1 className="mb-4">{t("Coauthor")}</h1>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card">
              <div className="card-body">
                  <h5 className="card-title">{t("Información")}</h5>
                  <p className="card-text">{t("Nombre: ") + coauthor.nombre}</p>
                  <p className="card-text">{t("Apellidos: ") + coauthor.apellidos}</p>
                  <p className="card-text">{t("Afiliación: ") + coauthor.afiliacion}</p>
                  <p className="card-text">{t("País: ") + coauthor.pais}</p>
                  <p className="card-text">{t("Ciudad: ") + coauthor.ciudad}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{t("Cargando coauthor...")}</div>
      )}
    </div>
    <ToastContainer />
  </div>
  );
}
