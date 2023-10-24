// EventoCard.jsx
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { urlServer } from "@/app/Utiles.jsx";
import Link from "next/link";
import EditModal from "./editModal/EditModal";
import Estadisticas from "../../estadisticas/Estadisticas";

function EventoCard({ element, suscripcion, urlSimposio, user, rol }) {
  const [imageUrl, setImageUrl] = useState("");

  const formatDate = (dateString, idioma) => {
    const date = parseISO(dateString);
    const locale = idioma === "es" ? es : enUS;
    return format(date, "dd '/' MM '/' yyyy", { locale });
  };

  const getImageUrl = async (id) => {
    try {
      const response = await fetch(`${urlServer}eventos/imagen/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      //setImageUrl(`Images/evento.png`);
    }
  };

  useEffect(() => {
    getImageUrl(element.PK_evento_contenedor);
  }, [element.PK_evento_contenedor]);

  return (
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
        <div className="card-header header-simposio">
          <h3 style={{ textAlign: "center" }}>{element.nombre}</h3>
        </div>
        <img
          src={imageUrl}
          alt="Banner"
          className="card-img-top"
          style={{
            maxWidth: "500px",
            maxHeight: "500px",
            objectFit: "cover",
            margin: "auto",
          }}
        />
        <div className="card-body">
          <p className="card-text descripcion-simposio">
            {element.descripcion}
          </p>
          <p className="card-text">
            <i className="bi bi-calendar-event icon"> </i>
            Dia de inicio: {formatDate(element.dia_inicio, "es")}
          </p>
          <p className="card-text">
            <i className="bi bi-calendar-event icon"> </i>
            Dia final: {formatDate(element.dia_final, "es")}
          </p>
          <p className="card-text">
            <i className="bi bi-map icon"> </i>
            {element.lugar}
          </p>
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
                disabled
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
  );
}

export default EventoCard;