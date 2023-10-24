"use client";
import React, { useEffect, useState } from "react";
import "./Actividades.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
import { urlServer } from "@/app/Utiles.jsx";
// Importa Link desde Next.js
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "@/app/components/globalState/GlobalState";

import { usePathname } from "next/navigation";
import "@/app/css/Heart-wrapper.css";
import Heart from "@/app/components/Heart like/Heart";
import "@/app/css/Colors.css";
import UpdateModal from "./UpdateModal/UpdateModal";

export default function Actividades({ elementId, PK_taller }) {
  const [actividades, setActividades] = useState([]);
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const pathname = usePathname();
  const urlActividad = `${pathname}/actividades/actividad`;

  //console.log("Actividades del simposio: ", elementId);

  useEffect(() => {
    handleActividades();
  }, []);

  //obtener la lista de actividades por el simposi seleccionado
  //console.log("Simposio seleccionado para hacer peticion : ", elementId);

  async function handleActividades() {
    try {
      let response = null;
      if (rol === 1) {
        response = await fetch(`${urlServer}actividades/porEvento`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ evento: elementId }),
          credentials: "include",
        });
      } else {
        response = await fetch(`${urlServer}actividades/activasPorEvento`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ evento: elementId }),
          credentials: "include",
        });
      }
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de actividades");
      }
      const data = await response.json();
      setActividades(data);
    } catch (error) {
      toast.error(error.message);
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
      data.success === "Actividad añadida a tu calendario" ? toast.success(data.success) : toast.error(data.success);
    } catch (error) {
      console.log("error -> ", error);
      toast.error(error.message);
    }
  }

  //handleEstadoStatus
  async function handleEstadoEstatus(PK_actividad, estatus) {
    let response = null;
    try{
      if(estatus){
        response = await fetch(`${urlServer}actividades/ocultarActividad`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: PK_actividad }),
          credentials: "include",
        })
      } else {
        response = await fetch(`${urlServer}actividades/mostrarActividad`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: PK_actividad }),
          credentials: "include",
        })
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

  return (
    <div className=" ">
      <div className="container my-5">
        {/*<h1 className="mb-4">Actividades</h1> */}
        <div className="row">
          {actividades.length > 0 ? (
            actividades
              .filter((e) => e.FK_taller == PK_taller)
              .map((element) => (
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
                      <p className="card-text">
                        {"Estatus: " + element.estatus}
                      </p>
                      <div className="card-footer d-flex justify-content-left align-items-left">
                        <Link
                          href={`${urlActividad}/${JSON.stringify(
                            element.PK_actividad
                          )}`}
                          style={{ marginRight: "1px" }}
                        >
                          <button className="btn btn-primary">Ver más</button>
                        </Link>

                        {user && rol === 1 && (
                          <>
                            <UpdateModal
                              pk={element.PK_actividad}
                              descripcion={element.descripcion}
                              descripcion_d={element.descripcion_d}
                              hora_inicio={element.hora_inicio}
                              hora_final={element.hora_final}
                              dia_evento={element.dia_evento}
                              ubicacion={element.ubicacion}
                              estatus={element.estatus}
                            />
                            <button
                              //on click cambiar el estado de activo
                              onClick={() => {
                                handleEstadoEstatus(
                                  element.PK_actividad,
                                  element.estatus
                                );
                              }}
                              className="btn btn-primary"
                              style={{ marginLeft: "1px" }}
                            >
                              {element.estatus ? "Ocultar" : "Mostrar"}
                            </button>
                          </>
                        )}

                        <div
                          onClick={() => {
                            handleMeInteresa(element.PK_actividad);
                          }}
                          className="Heart-wrapper"
                        >
                          <Heart actividad={element.PK_actividad} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="col-12">No hay Actividades</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
