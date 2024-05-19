"use client";
import React, { useEffect, useState } from "react";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PonenteActividadesCard({ actividadIdP }) {
  const { t } = useTranslation("actividades");
  //hook ponente
  const [ponente, setPonente] = useState(null);
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

  const urlPonente = "#/ponente";
  return (
    <div>
      <p className="card-text">
      <i className="bi bi-person-circle icon"></i> {t("Author: ")}
      </p>
      {ponente ? (
        <>
          <p className="card-text">
            {ponente.nombre + " " + ponente.apellidos}
          </p>
        </>
      ) : (
        <p className="card-text">{t("Cargando ponente...")}</p>
      )}
      <ToastContainer />
    </div>
  );
}
