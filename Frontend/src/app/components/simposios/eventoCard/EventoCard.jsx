// EventoCard.jsx
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { urlServer } from "@/app/Utiles.jsx";
import Link from "next/link";
import EditModal from "./editModal/EditModal";
import Estadisticas from "../../estadisticas/Estadisticas";
import AsistenciaActividades from "../../asistenciaActividades/asistenciaActividades";
import { ToastContainer, toast } from "react-toastify";
//router from next/navigation
import { useRouter } from "next/navigation";

function EventoCard({
  element,
  suscripcion,
  urlSimposio,
  pathname,
  user,
  rol,
}) {
  const [imageUrl, setImageUrl] = useState("");
  //router to change the url
  const router = useRouter();

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
      // Si falla la carga de la imagen, establecer una imagen de fallback
      setImageUrl("/Images/thumbnail_noimage.jpg");
    }
  };

  useEffect(() => {
    getImageUrl(element.PK_evento_contenedor);
  }, [element.PK_evento_contenedor]);

  async function handleEstadoActivo(PK_evento_contenedor, activo) {
    let response = null;
    try {
      if (activo) {
        response = await fetch(`${urlServer}eventos/ocultarEvento`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: PK_evento_contenedor }),
          credentials: "include",
        });
      } else {
        response = await fetch(`${urlServer}eventos/mostrarEvento`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: PK_evento_contenedor }),
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

  function handleUrlPush() {
    let address;
    //update url address for pushing into the router
    if (
      (suscripcion && suscripcion[element.PK_evento_contenedor]) ||
      rol === 1
    ) {
      address = `${urlSimposio}/${JSON.stringify(
        element.PK_evento_contenedor
      )}`;

      //push the url address
      router.push(address);
    } else {
      toast.error("You are not subscribed to this event");
    }

    console.log("handleUrlPush");
  }

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
        <section
          id="divForUrlPush"
          onClick={(e) => handleUrlPush()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            className="card-header header-simposio"
            style={{
              width: "100%",
            }}
          >
            <h3
              style={{
                textAlign: "center",
              }}
            >
              {element.nombre}
            </h3>
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
              Start day: {formatDate(element.dia_inicio, "es")}
            </p>
            <p className="card-text">
              <i className="bi bi-calendar-event icon"> </i>
              Final day: {formatDate(element.dia_final, "es")}
            </p>
            <p className="card-text">
              <i className="bi bi-map icon"> </i>
              {element.lugar}
            </p>
          </div>
        </section>

        <div className="card-footer d-flex footer-simposio">
          <Link
            href={
              (suscripcion && suscripcion[element.PK_evento_contenedor]) ||
              rol === 1
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
                rol === 1
                  ? false
                  : !suscripcion || !suscripcion[element.PK_evento_contenedor]
              }
            >
              see more
            </button>
          </Link>
          {user && rol === 1 && (
            <>
              {
                <Link
                  href={`${urlSimposio}/${JSON.stringify(
                    element.PK_evento_contenedor
                  )}/listaUsuarios`}
                  style={{ marginRight: "5px" }}
                >
                  <button className="btn btn-primary">Lista de usuarios</button>
                </Link>
              }
              <EditModal
                pk={element.PK_evento_contenedor}
                nombre={element.nombre}
                descripcion={element.descripcion}
                lugar={element.lugar}
                dia_inicio={element.dia_inicio}
                dia_final={element.dia_final}
              />
              <Estadisticas />

              <AsistenciaActividades pk={element.PK_evento_contenedor}/>

              <button
                //on click cambiar el estado de activo
                onClick={() => {
                  handleEstadoActivo(
                    element.PK_evento_contenedor,
                    element.activo
                  );
                }}
                className="btn btn-primary"
                style={{ marginRight: "5px" }}
              >
                {element.activo ? "Ocultar" : "Mostrar"}
              </button>
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
                  ? "Subscribed"
                  : "Not subscribed"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventoCard;
