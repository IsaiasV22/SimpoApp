"use client";
import React, { useEffect, useState } from "react";
import "./Simposios.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";

// FIXME: No se muestra la lista de eventos
export default function Simposios() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    handleEventos();
  }, []);

  async function handleEventos() {
    try {
      const response = await fetch(`${urlServer}eventos/all`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de eventos");
      }

      const data = await response.json();
      setEventos(data.eventos);
      console.log(eventos);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="main-content">
      <Link href="../login">
        <button>ATRAS</button>
      </Link>
      <div className="simposios-container">
        <h1>Simposios</h1>


        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id}>Eventos: {
              eventos.forEach(element => {
                console.log(element);
                <div>
                  <h1>{element.nombre}</h1>
                </div>
              })
            }</div>
          ))
        ) : (
          <div>No hay eventos próximos.</div>
        )}
      </div>
    </div>
  );
}
