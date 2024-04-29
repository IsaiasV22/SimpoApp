"use client";
import React, { useState } from "react";
//import "./Login.css";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "../globalState/GlobalState";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { left } from "@popperjs/core";

export default function Ayuda() {
  const high_contrast = useGlobalState((state) => state.high_contrast);

  return (
    <div className={`main-content ${high_contrast ? "high-contrast" : ""}`}>
      <div className="container my-5 ">
        <div className="card" style={{ padding: "3%", margin: "10%" }}>
          <Form id="editActividad">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Escribe tu nombre"
                aria-label=""
                //value=""
                //onChange={(e) => setDescripcion(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Correo"
                aria-label=""
                //value=""
                //onChange={(e) => setUbicacion(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Descripcion"
                as="textarea"
                aria-label=""
                style={{ height: "150px" }}
                //value=""
                //onChange={(e) => setUbicacion(e.target.value)}
              />
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
                  form="editActividad"
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
