"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//global state
import useGlobalState from "@/app/components/globalState/GlobalState";
//toast
import toast, { Toaster } from 'react-hot-toast';
import { urlServer } from "@/app/Utiles.jsx";
// translate hook
import { useTranslation } from "react-i18next";

export default function NuevoRecordatorio({ activityId }) {
  console.log("activityId -> ", activityId);
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const [show, setShow] = useState(false);
  const [recordatorio, setRecordatorio] = useState("");
  const { t } = useTranslation("actividades");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recordatorio);
    // post recordatorio
    try {
      //mock server
      const response = await fetch(`${urlServer}recordatorios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recordatorio, id: activityId})
      });
      //check if response is 204

      if (response.status === 204) {
        toast.success(t("Recordatorio guardado correctamente"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("Error al guardar recordatorio "), error.code);
    }
    handleClose();
  };
  return (
    <>
      <Button className="btnn-primary" onClick={handleShow}>
        {t("Nuevo recordatorio")}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Nuevo recordatorio")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ marginBottom: "5px" }}>
            {t(
              "Los recordatorios llegarán como notificación a los usuarios suscritos a esta actividad"
            )}
          </span>
          <Form id="nuevoRecordatorio" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="recordatorio">
                {t("Recordatorio")}
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                placeholder={t("Escribe aquí tu recordatorio")}
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
            {t("Close")}
          </Button>
          <div className={high_contrast ? "high-contrast" : ""}>
            <Button
              form="nuevoRecordatorio"
              type="submit"
              className="btnn-primary"
            >
              {t("Guardar recordatorio")}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
