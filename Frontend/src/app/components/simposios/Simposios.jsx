// Simposios.jsx
"use client";
import React, { useEffect, useState } from "react";
import "./Simposios.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "@/app/components/globalState/GlobalState";
import BackButton from "./backButton/BackButton"; // Asegúrate de que la ruta sea correcta
import Notificacion from "../Notificacion";
import { usePathname } from "next/navigation";
import EventoCard from "./eventoCard/EventoCard"; // Importando el componente EventoCard
//translation hook
import { useTranslation } from "react-i18next";

export default function Simposios() {
  const [eventos, setEventos] = useState([]);
  const [suscripcion, setSuscripcion] = useState(null);
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const pathname = usePathname();
  const urlSimposio = `${pathname}/simposio`;

  const { t } = useTranslation(["common"]);

  useEffect(() => {
    handleEventos();
  }, []);

  useEffect(() => {
    eventos.forEach(async (element) => {
      console.log("useEffect ejecutado", element.PK_evento_contenedor);
      try {
        const suscrito = await VerificaSuscripcion(element);
        setSuscripcion((prev) => ({
          ...prev,
          [element.PK_evento_contenedor]: suscrito,
        }));
      } catch (error) {
        console.error("Error setting verification status ", error);
      }
    });
  }, [eventos]);

  async function handleEventos() {
    try {
      let response = null;
      if (rol === 1) {
        response = await fetch(`${urlServer}eventos/all`);
      } else {
        response = await fetch(`${urlServer}eventos/activos`);
      }
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de eventos");
      }
      const data = await response.json();
      setEventos(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  //verificar si el usuario de la session esta suscrito al evento
  async function VerificaSuscripcion(element) {
    try {
      const response = await fetch(`${urlServer}usuarios/evento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento: element.PK_evento_contenedor }),
        credentials: "include",
      });

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (!data) {
        console.log("No esta suscrito");
        return false;
      }

      return true;
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error verifying suscription ", error.message);
      return false;
    }
  }

  return (
    <div className={`main-content ${high_contrast ? "high-contrast" : ""}`}>
      {/* ask for notification permission*/}
      <Notificacion />
      <div className="container my-5">
        <BackButton />

        <h1 className="mb-4" style={{ textAlign: "center" }}>
          {t("Events")}
        </h1>

        <div className="row">
          {eventos.length > 0 && user ? (
            eventos.map((element) => (
              <EventoCard
                key={element.PK_evento_contenedor}
                element={element}
                suscripcion={suscripcion}
                urlSimposio={urlSimposio}
                pathname={pathname}
                user={user}
                rol={rol}
              />
            ))
          ) : (
            <div className="col-12">{t("No_events_to_display")}</div>
          )}
        </div>
      </div>
      <ToastContainer autoClose={false}/>
    </div>
  );
}
