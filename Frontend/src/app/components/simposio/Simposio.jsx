"use client";
import React, { useEffect, useState } from "react";
import "./Simposio.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import Actividades from "../actividades/Actividades";
import { urlServer } from "@/app/Utiles.jsx";

export default function Simposio({ element }) {
  //hook simposio
  const [simposio, setSimposio] = useState(null);
  //console.log("Simposio de la actividad: ", element.nombre);
  //useEffect
  useEffect(() => {
    //fetch by element
    //console.log("Simposio seleccionado para hacer peticion : ", element.PK_evento_contenedor);
    getSimposio(element);
  }, []);

  //fetch in getSimposio
  async function getSimposio(elementId) {
    try {
      const response = await fetch(`${urlServer}eventos/evento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: elementId }),
        credentials: "include",
      });
      const data = await response.json();
      //console.log("Simposio por id: ", data[0]);
      setSimposio(data[0]);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }

  return (
    <div>
      {simposio ? (
        <div>
          <div className="simposio-container">{simposio.nombre}</div>
          <Actividades elementId={element} />
        </div>
      ) : (
        <div>Cargando simposio ...</div>
      )}
    </div>
  );
}
