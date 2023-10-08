"use client";
import React, { useEffect, useState } from "react";
import "./Actividades.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
import { urlServer } from "@/app/Utiles.jsx";
// Importa Link desde Next.js
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import '@/app/css/Heart-wrapper.css';
import Heart from "@/app/components/Heart like/Heart";
import'@/app/css/Colors.css'; 

export default function Actividades({ elementId }) {
  const [actividades, setActividades] = useState([]);
  const pathname = usePathname();
  const urlActividad = `${pathname}/actividades/actividad`;

  console.log("Actividades del simposio: ", elementId);

  useEffect(() => {
    handleActividades();
  }, []);

  //obtener la lista de actividades por el simposi seleccionado
  //console.log("Simposio seleccionado para hacer peticion : ", elementId);

  async function handleActividades() {
    try {
      const response = await fetch(`${urlServer}actividades/porEvento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento: elementId }),
        credentials: "include",
      });

      const data = await response.json();
      //console.log("actividades del evento "+elementId+" -> "+JSON.stringify(data));
      setActividades(data);
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

  //handleMeInteresa
  async function handleMeInteresa(PK_actividad) {
   //console.log("Actividad seleccionada para hacer peticion : ", PK_actividad);
   //event.stopPropagation();
    try {
      const response = await fetch(`${urlServer}actividades/cambiaEstadoActividad`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actividad: PK_actividad }),
        credentials: "include",
      });

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      //console.log("data -> ",data);
      toast.success(data.success);
    } catch (error) {
      console.log("error -> ",error);
      toast.error(error.message);
    }
  }

  return (
    <div className="main-content">
      <div className="container my-5">
        <h1 className="mb-4">Actividades</h1>
        <div className="row">
          {actividades.length > 0 ? (
            actividades.map((element) => (
              <div key={element.PK_actividad} className={`col-12 mb-4`}>
                {/* Utiliza el campo PK_actividad como clave única */}
                <div
                  className={`card ${
                    estaEnCurso(
                      element.hora_inicio,
                      element.hora_final,
                      element.dia_evento
                    )
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <div className="card-body position-relative">
                    <h5 className="card-title">{element.descripcion}</h5>
                    <p className="card-text">
                      {"Fecha: " + element.dia_evento.slice(0, 10)}
                    </p>
                    <p className="card-text">
                      {"Hora Inicio: " + element.hora_inicio}
                    </p>
                    <p className="card-text">
                      {"Hora Final: " + element.hora_final}
                    </p>
                    <p className="card-text">
                      {"Ubicación: " + element.ubicacion}
                    </p>
                    <p className="card-text">{"Estatus: " + element.estatus}</p>
                    <div className="d-flex w-100 justify-content-between ">
                      <Link
                        href={`${urlActividad}/${JSON.stringify(
                          element.PK_actividad
                        )}`}
                      >
                        <button className="btn btn-primary">Ver más</button>
                      </Link>
                      <div onClick={()=>{handleMeInteresa(element.PK_actividad)}} className="Heart-wrapper">
                         <Heart actividad={element.PK_actividad}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">No hay Actividades para este simposio.</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
