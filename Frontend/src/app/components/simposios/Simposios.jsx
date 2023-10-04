"use client";
import React, { useEffect, useState } from "react";
import "./Simposios.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "@/app/components/globalState/GlobalState";
import BackButton from "./backButton/BackButton"; // Asegúrate de que la ruta sea correcta
//import "@/app/App.css"
import { usePathname } from "next/navigation";

export default function Simposios() {
  const [eventos, setEventos] = useState([]);
  const [suscripcion, setSuscripcion] = useState(null);
  const user = useGlobalState((state) => state.user);
  const pathname = usePathname();
  const urlSimposio = `${pathname}/simposio`;

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

        <h1 className="mb-4">Simposios</h1>

        <div className="row">
          {eventos.length > 0 && user ? (
            eventos.map((element) => (
              <div key={element.PK_evento_contenedor} className="col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{element.nombre}</h5>
                    <p className="card-text">{element.descripcion}</p>
                    <p className="card-text">{element.dia_inicio}</p>
                    <p className="card-text">{element.dia_final}</p>
                    <p className="card-text">{element.lugar}</p>

                    {suscripcion !== null && (
                      <p className="card-text">
                        {"Estado de suscripción -> " +
                          (suscripcion[element.PK_evento_contenedor]
                            ? "Suscrito"
                            : "No suscrito")}
                      </p>
                    )}
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
                    <Link
                      href={
                        suscripcion && suscripcion[element.PK_evento_contenedor]
                          ? `${urlSimposio}/${JSON.stringify(element.PK_evento_contenedor)}`
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

                    {/* <button className="btn btn-primary" onClick={() => VerificaSuscripcion(element)}>Ver más</button>*/}
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
