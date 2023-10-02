"use client";
import React, { useEffect, useState } from "react";
import "./Actividades.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
import { urlServer } from "@/app/Utiles.jsx";
// Importa Link desde Next.js
import Link from "next/link";

const urlSimposio = "../simposio";
const urlActividad = "../../actividad";

export default function Actividades() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    handleActividades();
  }, []);

  async function handleActividades() {
    try {
      const response = await fetch(`${urlServer}actividades/all`);
      if (!response.ok) {
        throw new Error(
          "No se pudo obtener la lista de actividades" + response.text()
        );
      }

      const data = await response.json();
      console.log(data);
      setActividades(data);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="main-content">
      <div className="container my-5">
        <h1 className="mb-4">Actividades</h1>
        <div className="row">
          {actividades.length > 0 ? (
            actividades.map((element) => (
              <div key={element.PK_actividad} className="col-12 mb-4">
                {/* Utiliza el campo PK_actividad como clave única */}
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{element.descripcion}</h5>
                    <p className="card-text">{"Fecha: " + element.dia_evento.slice(0, 10)}</p>
                    <p className="card-text">{"Hora Inicio: " + element.hora_inicio}</p>
                    <p className="card-text">{"Hora Final: " + element.hora_final}</p>
                    <p className="card-text">{"Ubicación: " + element.ubicacion}</p>
                    <p className="card-text">{"Estatus: " + element.estatus}</p>
                    <Link href={`${urlActividad}`}>
                      <button className="btn btn-primary">Ver más</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">No hay Actividades para este simposio.</div>
          )}
        </div>
      </div>
    </div>
  );
}
