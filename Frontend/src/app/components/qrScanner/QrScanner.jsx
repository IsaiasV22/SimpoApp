"use client";
import { urlServer } from "@/app/Utiles";

import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserQRCodeReader } from "@zxing/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./QrScanner.css";

// Definición de la clase QRScanner que extiende de Component
class QRScanner extends Component {
  constructor(props) {
    super(props);
    // Inicialización del estado del componente
    this.state = {
      cameraError: null, // Error de la cámara
      scannedData: null, // Datos escaneados
      scanning: true, // Estado del escaneo
    };
    // Creación de referencias a los elementos de video y lector de códigos
    this.videoRef = React.createRef();
    this.codeReader = React.createRef();
  }

  // Método que se ejecuta después de que el componente se ha montado
  componentDidMount() {
    // Inicialización del lector de códigos QR
    this.codeReader.current = new BrowserQRCodeReader();
    // Solicitud de permiso para usar la cámara
    this.requestCameraPermission();
  }

  // Método que se ejecuta antes de que el componente se desmonte
  componentWillUnmount() {
    // Si el video está en reproducción, detiene la transmisión y recarga la página
    if (this.videoRef.current && this.videoRef.current.srcObject) {
      const stream = this.videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }
    //Recarga la pagina
    window.location.reload();
  }

  // Método que se ejecuta cuando se escanea un código QR con éxito
  handleScanSuccess = (data) => {
    // Parseo de los datos escaneados
    const parsedData = JSON.parse(data);
    const username = parsedData.username;
    const activityId = parsedData.activityId;

    console.log("QR code scanned:", username, activityId);

    // Actualización del estado con los datos escaneados
    this.setState({ scannedData: parsedData, scanning: false });
    this.codeReader.current.reset();

    //hacer un fetch a la API urlServer/usuarios/asistirEvento y dara lo que contiene es {"username":"AlbertoAVC","activityId":"1"}
    /*fetch(`${urlServer}/usuarios/asistirEvento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username: username,
        activityId: activityId 
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("¡Asistencia registrada!");
        } else {
          toast.error("Error al registrar asistencia");
        }
      })
      .catch((error) => {
        toast.error("Error al registrar asistencia: " + error.message);
      });*/
  };

  // Método para solicitar permiso para usar la cámara
  requestCameraPermission = async () => {
    try {
      // Solicita permiso para usar la cámara
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoRef.current.srcObject = stream;
      // Inicia el escaneo de códigos QR
      this.codeReader.current
        .decodeFromVideoDevice(undefined, this.videoRef.current, (result) => {
          if (result) {
            const text = result.getText();
            this.handleScanSuccess(text);
          }
        })
        .catch((error) => {
          // En caso de error, actualiza el estado con el mensaje de error
          this.setState({ cameraError: "Error accessing QR reader: " + error });
        });
    } catch (error) {
      // En caso de error, actualiza el estado con el mensaje de error
      this.setState({
        cameraError: "Error accessing camera: " + error.message,
      });
    }
  };

  // Método para iniciar un nuevo escaneo
  handleScanAgain = () => {
    // Reinicia el estado del escaneo
    this.setState({ scannedData: null, scanning: true });
    // Inicia el escaneo de códigos QR
    this.codeReader.current.decodeFromVideoDevice(
      undefined,
      this.videoRef.current,
      (result) => {
        if (result) {
          const text = result.getText();
          this.handleScanSuccess(text);
        }
      }
    );
  };

  // Método para renderizar el componente
  render() {
    const { cameraError, scannedData, scanning } = this.state;

    return (
      <div className="container">
        <Card className="card-container">
          <Card.Body>
            {cameraError ? (
              <p>{cameraError}</p>
            ) : (
              <>
                <video
                  ref={this.videoRef}
                  autoPlay
                  playsInline
                  style={{ width: "100%"}}
                ></video>
                {scannedData ? (
                  <>
                    <Button className={"buttonCard scanned"} disabled>
                      Scanned data
                    </Button>
                    <Button
                      className={"buttonCard"}
                      onClick={this.handleScanAgain}
                    >
                      Scan Again
                    </Button>
                  </>
                ) : (
                  <Button
                    className={scanning ? "loading-text buttonCard" : ""}
                    disabled
                  >
                    Scanning...
                  </Button>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default QRScanner;