"use client";
import { urlServer } from "@/app/Utiles";

import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserQRCodeReader } from '@zxing/browser';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./QrScanner.css";

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraError: null,
      scannedData: null,
      scanning: true
    };
    this.videoRef = React.createRef();
    this.codeReader = React.createRef();
  }

  componentDidMount() {
    this.codeReader.current = new BrowserQRCodeReader();
    this.requestCameraPermission();
  }

  componentWillUnmount() {
    if (this.videoRef.current && this.videoRef.current.srcObject) {
      const stream = this.videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });
      window.location.reload(); // Recargar la página al salir del componente
    }
  }

  requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoRef.current.srcObject = stream;
      this.codeReader.current
        .decodeFromVideoDevice(undefined, this.videoRef.current, (result) => {
          if (result) {
            const text = result.getText();
            this.setState({ scannedData: text, scanning: false });
          }
        })
        .catch((error) => {
          this.setState({ cameraError: "Error accessing QR reader: " + error });
        });
    } catch (error) {
      this.setState({ cameraError: "Error accessing camera: " + error.message });
    }
  };

  handleScanAgain = () => {
    this.setState({ scannedData: null, scanning: true });
  };

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
                  style={{ width: "100%" }}
                ></video>
                {scannedData ? (
                  <>
                    <Button className={"buttonCard scanned"} disabled>Scanned data</Button>
                    <Button className={"buttonCard"} onClick={this.handleScanAgain}>
                      Scan Again
                    </Button>
                  </>
                ) : (
                  <Button className={scanning ? "loading-text buttonCard" : ""} disabled>Scanning...</Button>
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