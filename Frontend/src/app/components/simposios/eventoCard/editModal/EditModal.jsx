"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useGlobalState from "@/app/components/globalState/GlobalState";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";
// translation hook
import { useTranslation } from "react-i18next";

function EditSimposio(element) {
  const [show, setShow] = useState(false);

  const PK_evento_contenedor = element.pk;
  const id = element.pk;
  const [nombre, setNombre] = useState(element.nombre);
  const [descripcion, setDescripcion] = useState(element.descripcion);
  const [lugar, setLugar] = useState(element.lugar);
  const [dia_inicio, setDiaInicio] = useState(new Date(element.dia_inicio));
  const [dia_final, setDiaFinal] = useState(new Date(element.dia_final));
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const { t } = useTranslation(["common"]);

  const [file, setFile] = useState(null); //Estado de la imagen

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const newEvento = {
      id,
      PK_evento_contenedor,
      nombre,
      descripcion,
      lugar,
      dia_inicio,
      dia_final,
    };

    //Si se sube una imagen se guarda en el server
    if (file) {
      await uploadImage();
    }

    try {
      const response = await fetch(`${urlServer}eventos/updateEventById`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvento),
        credentials: "include",
      });

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      toast.success(t("Editado_correctamente"));
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log("error -> ", error);
      toast.error(error.message);
    }
  }

  const uploadImage = async () => {
    //fetch para subir la imagen al server
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${urlServer}eventos/upload/${PK_evento_contenedor}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const responseData = await response.json();
      //console.log(responseData.message); // Imprimir mensaje de éxito
    } catch (error) {
      toast.error(t("Error_al_subir_la_imagen"));
      console.error(error.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; //Guardar la imagen que se sube
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setFile(file);
    }
  };

  return (
    <>
      <Button className="btn btnn-primary" onClick={handleShow}>
        {t("Edit")}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Edit_event")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editSimposio" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="nombre">{t("Nombre")}</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label=""
                aria-describedby="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="descripcion">{t("Descripcion")}</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label=""
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="lugar">{t("Lugar")}</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label=""
                aria-describedby="lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="imagen">{t("Imagen")}</InputGroup.Text>
              <Form.Control type="file" onChange={handleFileChange} />
            </InputGroup>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="diaInicio">{t("Dia_de_inicio")}</InputGroup.Text>
                <DatePicker
                  showIcon
                  selectsStart
                  selected={dia_inicio}
                  onChange={(date) => setDiaInicio(date)}
                  startDate={dia_inicio}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="diaFinal">
                  {t("Dia_de_finalizacion")}
                </InputGroup.Text>
                <DatePicker
                  showIcon
                  selectsEnd
                  selected={dia_final}
                  onChange={(date) => setDiaFinal(date)}
                  endDate={dia_final}
                  startDate={dia_inicio}
                  minDate={dia_inicio}
                />
              </InputGroup>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("Close")}
          </Button>
          <div className={high_contrast ? "high-contrast" : ""}>
            <Button form="editSimposio" type="submit" className="btnn-primary">
              {t("Aplicar_cambios")}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditSimposio;
