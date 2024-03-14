"use client";
import { urlServer } from "@/app/Utiles";
import styles from "./QRScanner.module.css"; // Importa los estilos específicos para este componente

// Importación de dependencias necesarias para el componente
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr"; // Librería para decodificar códigos QR
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";

// Componente QRScanner funcional
const QRScanner = () => {
  // Referencias al video y al canvas HTML donde se mostrará la cámara y se dibujará el QR escaneado
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Estado para controlar si se está escaneando o no
  const [isScanning, setIsScanning] = useState(false);

  const streamActive = useRef(null); // Crea una referencia para el stream

  // Efecto que se ejecuta al montar el componente. Configura el acceso a la cámara.
  useEffect(() => {
    //let streamActive = null; // Guarda la referencia al stream de video para poder detenerlo después

    // Solicita acceso a la cámara del dispositivo
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } }) // Intenta usar la cámara trasera por defecto
      .then((stream) => {
        streamActive.current = stream; // Guarda la referencia al stream
        videoRef.current.srcObject = stream; // Asigna el stream al elemento de video
        videoRef.current.play(); // Comienza a reproducir el video
        setIsScanning(true); // Actualiza el estado para indicar que se está escaneando
        scanQRCode(); // Inicia la función de escaneo de QR
      })
      .catch((error) => console.error(error)); // Captura y loguea errores si no se puede acceder a la cámara

    // Función de limpieza que se ejecuta al desmontar el componente
    return () => {
      // Detiene todas las pistas del stream para liberar la cámara
      if (streamActive.current) {
        streamActive.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamActive.current = null; // Limpia la referencia al stream
      }
      // Limpia el srcObject del video para evitar fugas de memoria
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // Función para registrar la asistencia con el código QR escaneado
  const registerAttendace = (code) => {
    const { username, activityId } = code; // Extrae los datos necesarios del código QR

    console.log(
      `Registrando asistencia de ${username} al evento ${activityId}`
    );

    // Hace una petición POST al servidor para registrar la asistencia
    fetch(`${urlServer}usuarios/asistirEvento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        activityId: activityId,
      }),
      credentials: "include",
    })
      .then((response) => {
        // Maneja la respuesta del servidor
        if (response.ok) {
          toast.success("¡Asistencia registrada!"); // Notificación de éxito
        } else {
          toast.error("Error al registrar asistencia"); // Notificación de error
        }
      })
      .catch((error) => {
        // Captura y loguea errores en la petición
        toast.error("Error al registrar asistencia: " + error.message);
      });
  };

  // Función para iniciar el escaneo de códigos QR
  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d"); // Obtiene el contexto 2D para dibujar en el canvas

    const scan = () => {
      // Verifica que el video esté listo para ser procesado
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Ajusta las dimensiones del canvas para que coincidan con las del video
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        // Dibuja el frame actual del video en el canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtiene la imagen del canvas para decodificar el QR
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        // Intenta decodificar un código QR de la imagen
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          // Si encuentra un código QR, loguea el resultado
          console.log(`Código QR detectado: ${code.data}`);
          video.srcObject.getTracks().forEach((track) => track.stop()); // Detiene el video
          registerAttendace(JSON.parse(code.data)); // Registra la asistencia con los datos del QR
          setIsScanning(false); // Actualiza el estado a no escaneando
        }
      }
      requestAnimationFrame(scan); // Continúa escaneando en el próximo frame
    };

    scan(); // Inicia el bucle de escaneo
  };

  // Función para reiniciar el escaneo en caso de ser necesario
  const restartScanning = () => {
    // Repite el proceso de solicitud de acceso a la cámara y comienza el escaneo
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } }) // Intenta usar la cámara trasera por defecto
      .then((stream) => {
        streamActive.current = stream; // Guarda la referencia al stream
        videoRef.current.srcObject = stream; // Asigna el stream al elemento de video
        videoRef.current.play(); // Comienza a reproducir el video
        setIsScanning(true); // Actualiza el estado para indicar que se está escaneando
      })
      .catch((error) => console.error(error));
  };

  // Renderiza el componente UI
  return (
    <div className={styles.container}>
      <Card className={`${styles.cardContainer}`}>
        <Card.Body>
          {/* Elementos ocultos de video y canvas para el escaneo */}
          <video style={{ display: "none" }} ref={videoRef}></video>
          <canvas ref={canvasRef}></canvas>
        </Card.Body>
        <Card.Footer>
          {/* Botones para controlar el escaneo */}
          {!isScanning ? (
            <Button
              variant="primary"
              onClick={restartScanning}
              className="w-100"
            >
              Scan Again
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled
              className={`w-100 ${styles.loadingText}`}
            >
              Scanning...
            </Button>
          )}

          {!isScanning && (
            <Button className={styles.scanned} disabled>
              Scanned data
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default QRScanner;
