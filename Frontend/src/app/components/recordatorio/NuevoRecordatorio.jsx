"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//global state
import useGlobalState from "@/app/components/globalState/GlobalState";
//toast
import { ToastContainer, toast } from "react-toastify";
import { urlServer } from "@/app/Utiles.jsx";

export default function NuevoRecordatorio() {
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const [show, setShow] = useState(false);
  const [recordatorio, setRecordatorio] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recordatorio);
    // post recordatorio
    try {
      //mock server
      const response = await fetch(
        `${urlServer}recordatorios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recordatorio }),
        }
      );
      //check if response is 204

      if (response.status === 204) {
        toast.success("Recordatorio guardado correctamente");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar recordatorio ", error.code);
    }
    handleClose();
  };
  return (
    <>
      <Button className="btnn-primary" onClick={handleShow}>
        Nuevo recordatorio
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo recordatorio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ marginBottom: "5px" }}>
            Los recordatorios llegarán como notificación a los usuarios
            suscritos a esta actividad
          </span>
          <Form id="nuevoRecordatorio" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="recordatorio">Recordatorio</InputGroup.Text>
              <Form.Control
                as="textarea"
                placeholder="Escribe aquí tu recordatorio"
                aria-label=""
                aria-describedby="recordatorio"
                value={recordatorio}
                onChange={(e) => setRecordatorio(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div className={high_contrast ? "high-contrast" : ""}>
            <Button
              form="nuevoRecordatorio"
              type="submit"
              className="btnn-primary"
            >
              Guardar recordatorio
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
