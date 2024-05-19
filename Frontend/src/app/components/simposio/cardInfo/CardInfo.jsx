// CardInfo.jsx
import React, { useEffect, useState } from "react";
import { urlServer } from "@/app/Utiles.jsx";
import useGlobalState from "@/app/components/globalState/GlobalState";
import "@/app/components/simposios/Simposios.css";
import { ToastContainer, toast } from "react-toastify";
//router from next/navigation
import { useRouter } from "next/navigation";
import EditCroquis from "./editCroquis/EditCroquis";
//i18n
import { useTranslation } from "react-i18next";

function CardInfo({ element }) {
  const [imageUrl, setImageUrl] = useState("");
  const user = useGlobalState((state) => state.user);
  const rol = useGlobalState((state) => state.rol);
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const {t} = useTranslation(["common"]);
  //router to change the url
  const router = useRouter();

  /* const formatDate = (dateString, idioma) => {
    const date = parseISO(dateString);
    const locale = idioma === "es" ? es : enUS;
    return format(date, "dd '/' MM '/' yyyy", { locale });
  };*/

  const getImageUrl = async (id) => {
    try {
      const response = await fetch(`${urlServer}eventos/imagen/${id}_croquis`);
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
      toast.error(t("You_are_not_subscribed_to_this_event"));
    }

    console.log("handleUrlPush");
  }

  return (
    <div
      key={element.PK_evento_contenedor}
      className="col-12 mb-4 cardInfo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`card card-simposioSpecific ${
          high_contrast ? "high-contrast" : ""
        }`}
      >
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
          </div>
        </section>
        {user && rol === 1 ? (
          <div className="card-footer d-flex footer-simposio">
            <div>
              <EditCroquis
                imageName={element.PK_evento_contenedor}
                high_contrast={high_contrast}
              />
              <button
                style={{ marginLeft: "10px" }}
                className="btn btnn-primary"
                onClick={() =>
                  window.open(
                    `${
                      element.direccion
                        ? element.direccion
                        : "https://www.google.com/maps"
                    }`
                  )
                }
              >
                {t("Location")}
              </button>
            </div>
          </div>
        ) : (
          <div className="card-footer d-flex footer-simposio">
            <button
              className="btn btnn-primary"
              onClick={() =>
                window.open(
                  `${
                    element.direccion
                      ? element.direccion
                      : "https://www.google.com/maps"
                  }`
                )
              }
            >
              {t("Location")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardInfo;
