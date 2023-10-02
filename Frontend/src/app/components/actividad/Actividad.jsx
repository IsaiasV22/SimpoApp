"use client";
import React, { useEffect, useState } from "react";
import "./Actividad.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { urlServer } from "@/app/Utiles.jsx";

export default function Actividad({ actividadId }) {
  //hook actividad
  const [actividad, setActividad] = useState(null);
  //useEffect
  useEffect(() => {
    handleActividad();
  }, []);
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
      console.log("actividad por id: ", data[0]);
      setActividad(data[0]);
    } catch (error) {
      toast.error(error.message);
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

    /* console.log("Dia evento:", dia_evento);
    console.log("Hora inicio:", horaInicio);
    console.log("Hora final:", horaFinal);
    console.log("Hora actual:", ahora);
    console.log("Fecha actual:", fechaActual); */

    // Compara las fechas y las horas de inicio y finalización con la fecha y hora actual
    const output =
      dia_evento === fechaActual && horaInicio <= ahora && horaFinal >= ahora;
    /*  console.log("Esta en curso:", output); */

    return output;
  }
  //fetch actividad por id

  return (
    <div className="main-content">
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
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title">Detalles</h5>
                    <p className="card-text">
                      {"Fecha: " + actividad.dia_evento.slice(0, 10)}
                    </p>
                    <p className="card-text">
                      {"Hora Inicio: " + actividad.hora_inicio}
                    </p>
                    <p className="card-text">
                      {"Hora Final: " + actividad.hora_final}
                    </p>
                    <p className="card-text">
                      {"Ubicación: " + actividad.ubicacion}
                    </p>
                    <p className="card-text">
                      {"Estatus: " + actividad.estatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Cargando actividad...</div> // Puedes mostrar un mensaje de carga o lo que prefieras
        )}
      </div>
      <ToastContainer />
    </div>
  );
  
}
