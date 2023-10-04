"use client";
import React from "react";
import "./Simposio.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";
import Actividades from "../actividades/Actividades";

export default function Simposio({ element }) {
  //console.log("Simposio de la actividad: ", element.nombre);
  return (
    <div>
      <div className="simposio-container">{element.nombre}</div>
      <Actividades elementId={element.PK_evento_contenedor}/>
    </div>
  );
}
