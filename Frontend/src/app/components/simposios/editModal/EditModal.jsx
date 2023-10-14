"use client";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import useGlobalState from "@/app/components/globalState/GlobalState";
import { urlServer } from "@/app/Utiles";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function EditSimposio(element) {
  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState(element.nombre);
  const [descripcion, setDescripcion] = useState(element.descripcion);
  const [lugar, setLugar] = useState(element.lugar);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Form id="editSimposio">
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