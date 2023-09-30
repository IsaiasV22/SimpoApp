"use client";
import React, { useEffect, useState } from "react";
import "./Simposios.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
//import "@/app/App.css"

const urlSimposio = "../simposio";

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
      console.log(data);
      setEventos(data);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="main-content">
      <div className="container my-5">
        <Link href="../login">
          <button className="btn btn-primary mb-3">ATRAS</button>
        </Link>

        <h1 className="mb-4">Simposios</h1>

        <div className="row">
          {eventos.length > 0 ? (
            eventos.map((element) => (
              <div key={element.id} className="col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{element.nombre}</h5>
                    <p className="card-text">{element.descripcion}</p>
                    <p className="card-text">{element.fecha}</p>
                    <p className="card-text">{element.hora}</p>
                    <p className="card-text">{element.lugar}</p>
                    <p className="card-text">{element.costo}</p>
                    <Link href={`${urlSimposio}`}>
                      <button className="btn btn-primary">Ver más</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">No hay eventos próximos.</div>
          )}
        </div>
      </div>
    </div>
  );
}
