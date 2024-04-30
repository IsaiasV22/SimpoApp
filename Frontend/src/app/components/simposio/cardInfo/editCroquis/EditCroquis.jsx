"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function EditCroquis({ imageName, high_contrast }) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const { t } = useTranslation(["common"]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setFile(file);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    //console.log("Image name: ", imageName);

    try {
      const response = await fetch(
        `${urlServer}eventos/upload/${imageName}_croquis`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(t("Error_al_subir_la_imagen"));
      }

      const responseData = await response.json();
      //console.log(responseData.message); // Imprimir mensaje de éxito
    } catch (error) {
      toast.error(t("Error al subir la imagen"));
      //console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      await uploadImage();
    }

    toast.success(t("Editado_correctamente"));
    setTimeout(() => {
      handleClose();
      window.location.reload();
    }, 1500);

    handleClose();
  };

  return (
    <>
      <Button className="btnn-primary" onClick={handleShow}>
        {t("Edit")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Editar_Croquis")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>{t("Subir_Imagen")}</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("Close")}
          </Button>
          <div className={high_contrast ? "high-contrast" : ""}>
            <Button className="btnn-primary" onClick={handleSubmit}>
              {t("Save_Changes")}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCroquis;
