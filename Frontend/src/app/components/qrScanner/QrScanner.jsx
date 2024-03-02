"use client";
import { urlServer } from "@/app/Utiles";

import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserQRCodeReader } from '@zxing/browser';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./QrScanner.css";

export default function QRScanner() {
  const [cameraError, setCameraError] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(true); // Nuevo estado para controlar si se está escaneando o no
  const videoRef = useRef(null);
  const codeReader = new BrowserQRCodeReader();

  useEffect(() => {
    requestCameraPermission();
    return () => {
      codeReader.stopContinuousDecode();
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      codeReader
        .decodeFromVideoDevice(undefined, videoRef.current, (result) => {
          if (result) {
            const text = result.getText();
            setScannedData(text);
            setScanning(false); // Dejar de escanear una vez que se ha detectado un código
            toast.success("Scan successful!");
          }
        })
        .catch((error) => {
          setCameraError("Error accessing QR reader: " + error);
        });
    } catch (error) {
      setCameraError("Error accessing camera: " + error.message);
    }
  };

  const handleScanAgain = () => {
    setScannedData(null);
    setScanning(true); // Volver a habilitar el escaneo
  };

  return (
    <div className="container">
      <Card className="card-container">
        <Card.Body>
          {cameraError ? (
            <p>{cameraError}</p>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%" }}
              ></video>
              {scannedData ? (
                <>
                  <Button className={"buttonCard scanned"} disabled>Scanned data</Button>
                  <Button className={"buttonCard"} onClick={handleScanAgain}>
                    Scan Again
                  </Button>
                </>
              ) : (
                <Button className={scanning ? "loading-text buttonCard" : ""} disabled>Scanning...</Button> // Aplicar la clase de animación si se está escaneando
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}