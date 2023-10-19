"use client";
import React, { useEffect, useState } from "react";
import "./Simposios.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "@/app/components/globalState/GlobalState";
import BackButton from "./backButton/BackButton"; // Asegúrate de que la ruta sea correcta
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";

import Estadisticas from "../estadisticas/Estadisticas";

import EditModal from "./editModal/EditModal";
//import "@/app/App.css"
import { usePathname } from "next/navigation";

export default function Simposios() {
  const [eventos, setEventos] = useState([]);
  const [suscripcion, setSuscripcion] = useState(null);
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const pathname = usePathname();
  const urlSimposio = `${pathname}/simposio`;

  //Funcion para dar formato a la fecha
  function formatDate(dateString, idioma) {
    const date = parseISO(dateString); // Convierte la cadena de fecha a un objeto Date
    const locale = idioma === "es" ? es : enUS; // Determina la localización basada en el idioma
    return format(date, "dd '/' MM '/' yyyy", { locale }); // Formatea la fecha
  }

  useEffect(() => {
    handleEventos();
  }, []);

  useEffect(() => {
    eventos.forEach(async (element) => {
      try {
        const suscrito = await VerificaSuscripcion(element);
        setSuscripcion((prev) => ({
          ...prev,
          [element.PK_evento_contenedor]: suscrito,
        }));
      } catch (error) {
        console.error(error);
      }
    });
  }, [eventos]);

  async function handleEventos() {
    try {
      const response = await fetch(`${urlServer}eventos/all`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de eventos");
      }

      const data = await response.json();
      //console.log(data);
      setEventos(data);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }

  //verificar si el usuario de la session esta suscrito al evento
  async function VerificaSuscripcion(element) {
    //console.log("verificando para Elemento: ", element.PK_evento_contenedor);
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
      //console.log("Suscrito: "+data);

      if (!data) {
        console.log("No esta suscrito");
        return false;
      }

      /*       if (data !== "") {
        window.location.href = "../../simposio";
      } */
      return true;
    } catch (error) {
      console.log("error: ", error);
      // Toastify
      toast.error(error.message);
      return false;
    }
  }

  return (
    <div className="main-content">
      <div className="container my-5">
        <BackButton />

        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Simposios
        </h1>

        <div className="row">
          {eventos.length > 0 && user ? (
            eventos.map((element) => (
              <div
                key={element.PK_evento_contenedor}
                className="col-12 mb-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="card card-simposio">
                  <div
                    className="card-header header-simposio"
                  >
                    <h3 style={{ textAlign: "center" }}>{element.nombre}</h3>
                  </div>

                  <img
                    src={`Images/${element.PK_evento_contenedor}.png`}
                    alt="Banner"
                    className="card-img-top" // clase Bootstrap para imágenes en tarjetas
                    style={{
                      maxWidth: "500px", // Establece el ancho máximo a 200px
                      maxHeight: "500px", // Establece la altura máxima a 200px
                      objectFit: "cover", // Mantiene la imagen ajustada al tamaño de la tarjeta
                      margin: "auto",
                    }}
                  />

                  <div className="card-body">
                    <p
                      className="card-text descripcion-simposio"
                    >
                      {element.descripcion}
                    </p>
                    <p className="card-text">
                      <i
                        class="bi bi-calendar-event icon"
                        
                      >
                        {" "}
                      </i>
                      Dia de inicio: {formatDate(element.dia_inicio, "es")}
                    </p>
                    <p className="card-text">
                      <i
                        class="bi bi-calendar-event icon"
                      >
                        {" "}
                      </i>
                      Dia final: {formatDate(element.dia_final, "es")}
                    </p>
                    <p className="card-text">
                      <i class="bi bi-map icon">
                        {" "}
                      </i>
                      {element.lugar}
                    </p>
                    {/*  <Link
                      href={
                        suscripcion && suscripcion[element.PK_evento_contenedor]
                          ? `${urlSimposio}?element=${JSON.stringify(element)}`
                          : "#"
                      }
                    >
                      <button
                        className="btn btn-primary"
                        disabled={
                          !suscripcion ||
                          !suscripcion[element.PK_evento_contenedor]
                        }
                      >
                        Ver más
                      </button>
                    </Link>
                    */}
                  </div>

                  <div className="card-footer d-flex justify-content-center align-items-center footer-simposio">
                    <Link
                      href={
                        suscripcion && suscripcion[element.PK_evento_contenedor]
                          ? `${urlSimposio}/${JSON.stringify(
                              element.PK_evento_contenedor
                            )}`
                          : "#"
                      }
                      style={{ marginRight: "5px" }}
                    >
                      <button
                        className="btn btn-primary"
                        disabled={
                          !suscripcion ||
                          !suscripcion[element.PK_evento_contenedor]
                        }
                      >
                        Ver más
                      </button>
                    </Link>

                    {user && rol === 1 && (
                      <>
                        <EditModal
                          pk={element.PK_evento_contenedor}
                          nombre={element.nombre}
                          descripcion={element.descripcion}
                          lugar={element.lugar}
                          dia_inicio={element.dia_inicio}
                          dia_final={element.dia_final}
                        />

                        <Estadisticas />
                      </>
                    )}

                    {suscripcion !== null && (
                      <div>
                        <button
                          className={`btn btn-primary ${
                            suscripcion[element.PK_evento_contenedor]
                              ? "btn-custom-suscrito"
                              : "btn-custom-noSuscrito"
                          }`}
                          disabled // Para deshabilitar la interactividad del botón, si lo deseas
                        >
                          {suscripcion[element.PK_evento_contenedor]
                            ? "Suscrito"
                            : "No suscrito"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">No hay eventos próximos.</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
