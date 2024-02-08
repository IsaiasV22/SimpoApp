"use client";
import React, { useEffect, useState } from "react";
import "./Actividades.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
import { urlServer } from "@/app/Utiles.jsx";
// Importa Link desde Next.js
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "@/app/components/globalState/GlobalState";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { usePathname } from "next/navigation";
import "@/app/css/Heart-wrapper.css";
import Heart from "@/app/components/Heart like/Heart";
import "@/app/css/Colors.css";
import UpdateModal from "./UpdateModal/UpdateModal";
import PonenteActividadesCard from "../ponente/PonenteActividadesCard";
import Pagination from "./Pagination";

export default function ActividadesFilter({ elementId, filterFunction }) {
  //console.log('filterFunction: ', filterFunction.toString())
  const [actividades, setActividades] = useState([]);
  const [currentPage, setCurrentPage] = useState(5);
  const [actividadesPerPage, setActividadesPerPage] = useState(5);
  //last activity index
  const indexOfLastActividad = currentPage * actividadesPerPage;
  //first activity index
  const indexOfFirstActividad = indexOfLastActividad - actividadesPerPage;
  //current activities
  const currentActividades = actividades.slice(indexOfFirstActividad, indexOfLastActividad);
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const pathname = usePathname();
  const urlActividad = `${pathname}/actividades/actividad`;

  //console.log("Actividades del simposio: ", elementId);

  useEffect(() => {
    handleActividades();
  }, [filterFunction]);

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
      setActividades(filterFunction ? data.filter(filterFunction) : data);
      console.log("Actividades: ", actividades);
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
      data.success === "Actividad añadida a tu calendario"
        ? toast.success(data.success)
        : toast.error(data.success);
    } catch (error) {
      console.log("error -> ", error);
      toast.error(error.message);
    }
  }

  //handleEstadoStatus
  async function handleEstadoEstatus(PK_actividad, estatus) {
    let response = null;
    try {
      if (estatus) {
        response = await fetch(`${urlServer}actividades/ocultarActividad`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: PK_actividad }),
          credentials: "include",
        });
      } else {
        response = await fetch(`${urlServer}actividades/mostrarActividad`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: PK_actividad }),
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

  //handleExponente
  async function handlePonente(actividadId) {
    try {
      const response = await fetch(`${urlServer}ponentes/porActividadId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: actividadId }),
        credentials: "include",
      });
      const data = await response.json();
      console.log("exponente por id: ", data[0]);
      return data[0];
    } catch (error) {
      toast.error("Error fetching author (Ponente) :", error.message);
      //alert(error.message);
    }
  }

  async function attachPonentetoActividades() {
    try {
      const actividadesConPonente = await Promise.all(
        actividades.map(async (actividad) => ({
          ...actividad,
          ponente: await handlePonente(actividad.PK_actividad),
        }))
      );

      setActividades(actividadesConPonente);
      console.log("Actividades after attachment : ", actividadesConPonente);
    } catch (error) {
      console.error("Error attaching ponente to actividades:", error);
    }
  }

  const formatDate = (dateString, idioma) => {
    const date = parseISO(dateString);
    const locale = idioma === "es" ? es : enUS;
    return format(date, "dd '/' MM '/' yyyy", { locale });
  };

  return (
    <div className=" ">
      <div className="container my-5">
        <h3>Total results: {actividades.length}</h3>
        <h3>Total per page: {currentActividades.length}</h3>
        <div className="row">
          
          {currentActividades.length > 0 ? (
            <>
            {currentActividades.map((element) => (
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
                    <h5 className="card-title">Name: {element.descripcion}</h5>
                    <p className="card-text">
                    <i className="bi bi-calendar-event icon"> </i>
                      {'Date: '+ formatDate(element.dia_evento,'es')}
                    </p>
                    <p className="card-text">
                    <i className="bi bi-clock icon"></i>
                      {" Start time: " + element.hora_inicio}
                    </p>
                    <p className="card-text">
                    <i className="bi bi-clock icon"></i>
                      {" End time: " + element.hora_final}
                    </p>
                    <p className="card-text">
                    <i className="bi bi-map icon"></i>
                      {" Location: " + element.ubicacion}
                    </p>
                    <p className="card-text">
                      <PonenteActividadesCard
                        actividadIdP={element.PK_actividad}
                      />
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
            ))}
            <Pagination
              actividadesPerPage={actividadesPerPage}
              totalActividades={actividades.length}
              />
            </>
          ) : (
            <div className="col-12">No hay Actividades</div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
