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
import { format } from "date-fns";
import moment from "moment";

function UpdateModal(element) {
  const [show, setShow] = useState(false);
  const PK_actividad = element.pk;
  const id = element.pk;
  const [descripcion, setDescripcion] = useState(element.descripcion);
  const [descripcion_d, setDescripcion_d] = useState(element.descripcion_d);
  const [dia_evento, setDiaEvento] = useState(new Date(element.dia_evento));
  const [hora_inicio, setHoraInicio] = useState(
    moment(element.hora_inicio, "HH:mm:ss").toDate()
  );
  const [hora_final, setHoraFinal] = useState(
    moment(element.hora_final, "HH:mm:ss").toDate()
  );
  const [ubicacion, setUbicacion] = useState(element.ubicacion);

  const [estatus, setEstatus] = useState(element.estatus);
  const isChecked = (value) => value == estatus;
  const onSelect = ({ target:{ value}}) => setEstatus(value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const horaInicioFormatted = format(hora_inicio, "HH:mm:ss");
    const horaFinalFormatted = format(hora_final, "HH:mm:ss");

    const newActivity = {
      id,
      PK_actividad,
      descripcion,
      descripcion_d,
      dia_evento,
      hora_inicio: horaInicioFormatted,
      hora_final: horaFinalFormatted,
      ubicacion,
      estatus,
    };

    try {
      const response = await fetch(`${urlServer}actividades/updateActivity`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
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
      console.log("error -> ", error);
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
          <Modal.Title>Editar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editActividad" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="descripcion">Descripción</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label=""
                aria-describedby="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="descripcion_d">
                Descripción detallada
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label=""
                value={descripcion_d}
                onChange={(e) => setDescripcion_d(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="ubicacion">Ubicación</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label=""
                aria-describedby="ubicacion"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Radio
                name="estatus"
                id="showRadio"
                value={1}
                checked={isChecked(1)}
                onChange={onSelect}
              />
              <InputGroup.Text id="mostrar">Mostrar</InputGroup.Text>

              <InputGroup.Radio
                name="estatus"
                id="hideRadio"
                value={0}
                checked={isChecked(0)}
                onChange={onSelect}
              />
              <InputGroup.Text id="ocultar">Ocultar</InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="dia_evento">Dia evento</InputGroup.Text>
            </InputGroup>
            <div>
              <DatePicker
                showIcon
                selectsStart
                selected={dia_evento}
                onChange={(date) => setDiaEvento(date)}
                startDate={dia_evento}
              />
            </div>
            <InputGroup className="mb-3">
              <InputGroup.Text id="hora_inicio">Hora inicio</InputGroup.Text>
            </InputGroup>
            <div>
                <DatePicker
                  showIcon
                  selected={hora_inicio}
                  onChange={(date) => {
                    console.log("Entrando al DatePicker de hora_inicio:");
                    console.log(
                      "Aplicamos formate al date: " + format(date, "HH:mm:ss")
                    );

                    console.log("dia_evento: " + dia_evento);
                    console.log("hora_inicio: " + hora_inicio);
                    console.log("date: " + date);

                    setHoraInicio(date);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            <InputGroup className="mb-3">
              <InputGroup.Text id="hora_final">Hora final</InputGroup.Text>
            </InputGroup>
            <div>
                <DatePicker
                  showIcon
                  selected={hora_final}
                  onChange={(date) => {
                    console.log("Entrando al DatePicker de hora_final:");
                    console.log(
                      "Aplicamos formate al date: " + format(date, "HH:mm:ss")
                    );
                    setHoraFinal(date);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="editActividad" type="submit" variant="primary">
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
