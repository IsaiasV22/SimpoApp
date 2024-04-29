"use client";
import React, { useState } from "react";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "../globalState/GlobalState";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";

export default function Ayuda() {
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [validated, setValidated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    const newSolicitudAyuda = {
      nombre_usuario,
      correo,
      descripcion,
    };
    try {
      const response = await fetch(`${urlServer}solicitudesAyuda/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSolicitudAyuda),
        credentials: "include",
      });

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      toast.success("Solicitud enviada correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log("error -> ", error);
      toast.error(error.message);
    }
  }

  return (
    <div className={`main-content ${high_contrast ? "high-contrast" : ""}`}>
      <ToastContainer />
      <div className="container my-5 ">
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Solicitud de ayuda
        </h1>
        <div className="card" style={{ padding: "3%" }}>
          <Form id="solicitudAyuda" noValidate validated={validated} onSubmit={handleSubmit}>
            <InputGroup className="mb-2" has-validation >
              <Form.Control
                type="text"
                required
                placeholder="Nombre"
                value={nombre_usuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
              <FormControl.Feedback type="invalid">
                Por favor ingrese su nombre
              </FormControl.Feedback>
            </InputGroup>
            <InputGroup className="mb-2" has-validation >
              <Form.Control
                type="email"
                required
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <FormControl.Feedback type="invalid">
                Por favor ingrese un correo valido
              </FormControl.Feedback>
            </InputGroup>
            <InputGroup className="mb-2" has-validation >
              <Form.Control
                type="text"
                required
                placeholder="Descripcion"
                as="textarea"
                style={{ height: "150px" }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <FormControl.Feedback type="invalid">
                Por favor ingrese una descripcion de su problema
              </FormControl.Feedback>
            </InputGroup>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={""}>
                Cancelar
              </Button>
              <div
                className={high_contrast ? "high-contrast" : ""}
                style={{ marginLeft: "5px" }}
              >
                <Button
                  form="solicitudAyuda"
                  type="submit"
                  className="btnn-primary"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
