"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import useGlobalState from "@/app/components/globalState/GlobalState";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditSimposio(element) {
  //console.log("Elemento a editar: ", element);
  const [show, setShow] = useState(false);
  
  const PK_evento_contenedor = element.pk;
  const id=element.pk;
  const [nombre, setNombre] = useState(element.nombre);
  const [descripcion, setDescripcion] = useState(element.descripcion);
  const [lugar, setLugar] = useState(element.lugar);
  const [dia_inicio, setDiaInicio] = useState(new Date(element.dia_inicio));
  const [dia_final, setDiaFinal] = useState(new Date(element.dia_final));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const newEvento = { id, PK_evento_contenedor, nombre, descripcion, lugar, dia_inicio, dia_final };
    //console.log(newEvento);

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

      toast.success("Editado correctamente");
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log("error -> ",error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Simposio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="editSimposio" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <InputGroup.Text id="nombre">Nombre</InputGroup.Text>
                <Form.Control
                    placeholder=""
                    aria-label=""
                    aria-describedby="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="descripcion">Descripcion</InputGroup.Text>
                <Form.Control
                    as="textarea"
                    aria-label=""
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="lugar">Lugar</InputGroup.Text>
                <Form.Control
                    placeholder=""
                    aria-label=""
                    aria-describedby="lugar"
                    value={lugar}
                    onChange={(e) => setLugar(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="imagen">Imagen</InputGroup.Text>
                <Form.Control
                    type="file"
                />
            </InputGroup>
            <div>
              <DatePicker
                showIcon
                selectsStart
                selected={dia_inicio}
                onChange={date => setDiaInicio(date)}
                startDate={dia_inicio}
              />
              <DatePicker
                showIcon
                selectsEnd
                selected={dia_final}
                onChange={date => setDiaFinal(date)}
                endDate={dia_final}
                startDate={dia_inicio}
                minDate={dia_inicio}
            />
            </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="editSimposio" type="submit" variant="primary">Editar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditSimposio;