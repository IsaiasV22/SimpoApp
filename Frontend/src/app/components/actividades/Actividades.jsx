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
import "@/app/App.css";
import UpdateModal from "./UpdateModal/UpdateModal";
import PonenteActividadesCard from "../ponente/PonenteActividadesCard";
import Pagination from "./Pagination";
import NuevoRecordatorio from "../recordatorio/NuevoRecordatorio";
import { useTranslation } from "react-i18next";

export default function ActividadesFilter({ elementId, filterFunctions }) {
  //console.log('filterFunction: ', filterFunction.toString())
  const [actividades, setActividades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actividadesPerPage, setActividadesPerPage] = useState(5);
  const { t } = useTranslation("actividades");
  //last activity index
  const indexOfLastActividad = currentPage * actividadesPerPage;
  //first activity index
  const indexOfFirstActividad = indexOfLastActividad - actividadesPerPage;
  //current activities
  const currentActividades = actividades.slice(
    indexOfFirstActividad,
    indexOfLastActividad
  );
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const pathname = usePathname();
  const urlActividad = `${pathname}/actividades/actividad`;
  const [isProcessing, setIsProcessing] = useState(false);

  //button text hook
  const [buttonText, setButtonText] = useState("Agregar a mi calendario");

  //console.log("Actividades del simposio: ", elementId);

  useEffect(() => {
    handleActividades();
  }, [filterFunctions]);

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
      console.log("Data: ", data);
      //check if there are filters and apply them
      console.log("Filter functions: ", filterFunctions);
      //sort data by dia_evento and hora_inicio
      data.sort((a, b) => {
        if (a.dia_evento === b.dia_evento) {
          return a.hora_inicio < b.hora_inicio ? -1 : 1;
        }
        return a.dia_evento < b.dia_evento ? -1 : 1;
      });
      setActividades(
        filterFunctions && filterFunctions.length > 0
          ? filterFunctions.reduce((acc, filter) => acc.filter(filter), data)
          : data
      );

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

    // Compara las fechas y las horas de inicio y finalización con la fecha y hora actual
    const output =
      dia_evento.split("T")[0] === fechaActual &&
      horaInicio <= ahora &&
      horaFinal >= ahora;
    /*  console.log("Esta en curso:", output); */

    return output;
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
      toast.error(t("Error fetching author (Ponente) :"), error.message);
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
    <div className={high_contrast ? "high-contrast" : ""}>
      <div className="container my-5">
        <h3>
          {t("Total results: ")}
          {actividades.length}
        </h3>
        <h3>
          {t("Total activities per page: ")}
          {currentActividades.length}
        </h3>
        <h3>
          {t("Current page : ")}
          {currentPage}
        </h3>
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
                        ? "border-success border-5"
                        : ""
                    }`}
                  >
                    <div className="card-body position-relative">
                      <h5 className="card-title">
                        {t("Title: ")}
                        {element.descripcion}
                      </h5>
                      <p className="card-text">
                        <i className="bi bi-calendar-event icon"> </i>
                        {t("Date: ") + formatDate(element.dia_evento, "es")}
                      </p>
                      <p className="card-text">
                        <i className="bi bi-clock icon"></i>
                        {t(" Start time: ") + element.hora_inicio}
                      </p>
                      <p className="card-text">
                        <i className="bi bi-clock icon"></i>
                        {t(" End time: ") + element.hora_final}
                      </p>
                      <p className="card-text">
                        <i className="bi bi-map icon"></i>
                        {t(" Location: ") + element.ubicacion}
                      </p>
                      <p className="card-text">
                        <PonenteActividadesCard
                          actividadIdP={element.PK_actividad}
                        />
                      </p>
                      <div className="card-footer responsive-footer">
                        <Link
                          href={`${urlActividad}/${JSON.stringify(
                            element.PK_actividad
                          )}`}
                          style={{ marginRight: "1px" }}
                        >
                          <button className="btn btnn-primary">
                            {t("See_more")}
                          </button>
                        </Link>

                        {user && rol === 1 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              "margin-left": "5px",
                            }}
                          >
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
                              className="btn btnn-primary"
                              style={{ marginLeft: "1px" }}
                            >
                              {element.estatus ? t("Ocultar") : t("Mostrar")}
                            </button>
                            <NuevoRecordatorio />
                          </div>
                        )}

                        <div
                          className="Heart-wrapper"
                        >
                          <Heart
                            actividad={element.PK_actividad}
                            onChange={(isChecked) => {
                              // Aquí puedes cambiar el texto del botón según el nuevo estado del checkbox
                              const buttonText = isChecked
                                ? "Quitar del calendario"
                                : "Agregar a mi calendario";
                              // Puedes almacenar el texto del botón en el estado local si es necesario
                              // y luego usarlo en tu JSX para renderizar el botón con el texto actualizado
                              setButtonText(buttonText);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                actividadesPerPage={actividadesPerPage}
                Actividades={actividades}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setActividadesPerPage={setActividadesPerPage}
              />
            </>
          ) : (
            <div className="col-12">{t("No hay Actividades")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
