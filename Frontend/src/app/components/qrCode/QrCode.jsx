import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { urlServer } from "@/app/Utiles";
import useGlobalState from "../globalState/GlobalState";

export default function AttendanceQR({activityId}) {
  const [userQr, setUser] = useState();
  const [rol] = useGlobalState((state) => [state.rol]);
  const [user] = useGlobalState((state) => [state.user]);

  useEffect(() => {
    fetchUserData();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const fetchUserData = async () => {
    //console.log("Hizo el fetch QR");

    try {
      const response = await fetch(`${urlServer}usuarios/qrInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        credentials: "include",
      });
      if (response.ok) {
        const username = await response.json(); // Obtener el nombre de usuario como una cadena de texto
        //console.log("Response QR", username.username);
        setUser({
          username: username.username,
          activityId: activityId,
        });
      } else {
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  const generateQRText = () => {
    // Convertir información del usuario a una cadena de texto
    return JSON.stringify(userQr);
  };

  return (
    <>
      {
        user && rol !== 1 &&
        <h5 className="card-title"> Attendance QR </h5> &&
        <div>{generateQRText()}</div> && (
        <div className="container my-3">
          <QRCode value={generateQRText()} />
        </div>
      ) }
    </>
  );
}
