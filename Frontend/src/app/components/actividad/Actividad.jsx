"use client";
import React, { useEffect, useState } from "react";
import "./Actividad.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { urlServer } from "@/app/Utiles.jsx";
import { usePathname } from "next/navigation";
import QrCode from "../qrCode/QrCode";
import useGlobalState from "../globalState/GlobalState";
import SeccionRecordatorios from "../recordatorio/seccionRecordatorios";
import { useTranslation } from "react-i18next";

export default function Actividad({ actividadId }) {
  const pathname = usePathname();

  const urlPonente = `${pathname}/ponente`;
  const urlCoautor = `${pathname}/coauthor`;
  const [actividad, setActividad] = useState(null); //hook actividad
  const [ponente, setPonente] = useState(null); //state exponente
  const [coautores, setCoautores] = useState([]); //state coautores
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const { t } = useTranslation("actividades");
  useEffect(() => {
    //useEffect
    handleActividad();
    handlePonente();
    handleCoautores();
  }, []); // eslint-disable-line
  //handleActividad
  async function handleActividad() {
    try {
      const response = await fetch(`${urlServer}actividades/porId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: actividadId }),
        credentials: "include",
      });
      const data = await response.json();
      //console.log("actividad por id: ", data[0]);
      setActividad(data[0]);
    } catch (error) {
      toast.error(t("Error fetching activity: "), error.message);
      //alert(error.message);
    }
  }
  //handleExponente
  async function handlePonente() {
    try {
      const response = await fetch(`${urlServer}ponentes/porActividadId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: actividadId }),
        credentials: "include",
      });
      const data = await response.json();
      //console.log("exponente por id: ", data[0]);
      setPonente(data[0]);
    } catch (error) {
      toast.error(t("Error fetching author (Ponente) :"), error.message);
      //alert(error.message);
    }
  }

  //handle coauthors
  async function handleCoautores() {
    try {
      const response = await fetch(
        `${urlServer}ponentes/coautoresPorActividadId`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: actividadId }),
          credentials: "include",
        }
      );
      if (response.status === 204) return setCoautores([]);
      const data = await response.json();
      console.log("coautores : ", data);
      setCoautores(data);
    } catch (error) {
      toast.error(t("Error fetching coauthors: "), error.message);
      //alert(error.message);
    }
  }

  function estaEnCurso(horaInicio, horaFinal, dia_evento) {
    const ahora = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const fechaActual = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

    console.log("ahora", ahora);
    console.log("dia_evento", dia_evento.split("T")[0]);
    console.log("fechaActual", fechaActual);
    // Compara las fechas y las horas de inicio y finalización con la fecha y hora actual
    const output =
      dia_evento.split("T")[0] === fechaActual &&
      horaInicio <= ahora &&
      horaFinal >= ahora;

    console.log("Esta en curso:", output);

    return output;
  }
  //fetch actividad por id

  return (
    <div className={`main-content ${high_contrast ? "high-contrast" : ""}`}>
      <div className="container my-5">
        {actividad ? ( // Verifica si actividad tiene datos
          <>
            <h1 className="mb-4">{actividad.descripcion}</h1>
            <div className="row">
              <div key={actividad.PK_actividad} className={`col-12 mb-4`}>
                {/* Utiliza el campo PK_actividad como clave única */}
                <div
                  className={`card ${
                    estaEnCurso(
                      actividad.hora_inicio,
                      actividad.hora_final,
                      actividad.dia_evento
                    )
                      ? "border-success"
                      : ""
                  }`}
                >
                  <div className="card-body d-flex ">
                    <div>
                      <h5 className="card-title">{t("Detalles")}</h5>
                      <p className="card-text">
                        {t("Date: ") + actividad.dia_evento.slice(0, 10)}
                      </p>
                      <p className="card-text">
                        {t(" Start time: ") + actividad.hora_inicio}
                      </p>
                      <p className="card-text">
                        {t(" End time: ") + actividad.hora_final}
                      </p>
                      <p className="card-text">
                        {t("Ubicación: ") + actividad.ubicacion}
                      </p>
                      <p className="card-text">
                        {t("Estatus: ") + actividad.estatus}
                      </p>
                      <h5 className="card-title">{t("Author")}</h5>
                      {ponente ? (
                        <>
                          <p className="card-text">
                            {ponente.nombre + " " + ponente.apellidos}
                          </p>
                          <Link href={`${urlPonente}/${actividadId}`}>
                            <button className="btn btnn-primary">
                              {t("Ver Información del Autor")}
                            </button>
                          </Link>
                        </>
                      ) : (
                        <p className="card-text">{t("Cargando autor...")}</p>
                      )}
                      {coautores.length > 0 && (
                        <div style={{ "margin-top": "10px" }}>
                          <h5 className="card-title">{t("Coautores")}</h5>
                          <ul>
                            {coautores.map((coautor) => (
                              <li key={coautor[0].PK_nombre_usuario}>
                                {coautor[0].nombre + " " + coautor[0].apellidos}
                                <Link
                                  href={`${urlCoautor}/${coautor[0].cedula}`}
                                >
                                  <button
                                    className="btn btnn-primary"
                                    style={{ margin: "10px" }}
                                  >
                                    {t("Ver Información del coautor")}
                                  </button>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className='d-block'>
                      <SeccionRecordatorios activityId={actividadId} />
                      <QrCode activityId={actividadId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>{t("Cargando actividad...")}</div> // Puedes mostrar un mensaje de carga o lo que prefieras
        )}
      </div>
    </div>
  );
}
