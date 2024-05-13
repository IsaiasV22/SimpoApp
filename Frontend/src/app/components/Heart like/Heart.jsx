"use client";
import React, { useState, useEffect } from "react";
import "@/app/css/Heart.css";
import "@/app/App.css";
import { urlServer } from "@/app/Utiles.jsx";
import Floater from "react-floater";
// translate hook
import { useTranslation } from "react-i18next";
//toast
import toast, { Toaster } from 'react-hot-toast';

export default function Heart(actividad) {
  //estatus state hook
  const [isChecked, setIsChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation("actividades");
  //useEffect for checkbox
  useEffect(() => {
    handleCheckbox(actividad);
  }, []);

  //handleMeInteresa
  async function handleMeInteresa(PK_actividad) {
    //console.log("Actividad seleccionada para hacer peticion : ", PK_actividad);
    //event.stopPropagation();
    if (isProcessing) return; // Salir de la función si ya se está procesando

    setIsProcessing(true); // Establecer isProcessing como true antes de iniciar el procesamiento

    try {
      const response = await fetch(
        `${urlServer}actividades/cambiaEstadoActividad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actividad: PK_actividad }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      //console.log("data -> ",data);
      //toast with -1 for permanent display
      //console.log("data.success -> ", data.success);
      toast.success(t(data.success))
      setIsChecked(!isChecked); // Cambiar el estado del checkbox al contrario del estado actual
    } catch (error) {
      console.log("error -> ", error);
      toast.error(error.message);
    } finally {
      setIsProcessing(false); // Restablecer isProcessing a false después de completar el procesamiento
    }
  }

  //handleIsChecked
  async function handleCheckbox(PK_actividad) {
    console.log("Checking state of activity ->  ", PK_actividad.actividad);
    try {
      const response = await fetch(
        `${urlServer}actividades/checkEstadoActividad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actividad: PK_actividad.actividad }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("data -> ", data.estatus);
      setIsChecked(data.estatus);
      //return data.estatus;
      //toast.success(data.success);
    } catch (error) {
      //console.log("error -> ",error);
      console.error(error.message);
    }
    //console.log("Heart checking state");
  }

  return (
    <>
      <div id="main-content">
        <div>
          <button
            className={`btn ${isChecked ? "btn-danger" : "btn-success"}`}
            onClick={() => handleMeInteresa(actividad.actividad)}
          >
            {isChecked
              ? t("Quitar del calendario")
              : t("Agregar a mi calendario")}
          </button>
        </div>
        <Toaster/>
      </div>
    </>
  );
}
