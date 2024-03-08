// ListaUsuarios.jsx
"use client";
import React, { useEffect, useState } from "react";
import "./ListaUsuarios.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "@/app/components/globalState/GlobalState";
//import BackButton from "./backButton/BackButton"; // Asegúrate de que la ruta sea correcta
import Notificacion from "../Notificacion";
import { usePathname } from "next/navigation";
//import usuarioCard from "./usuarioCard/EventoCard"; // Importando el componente usuarioCard

export default function ListaUsuarios({ idEvento }) {
  const [usuarios, setUsuarios] = useState([]);
  const [suscripcion, setSuscripcion] = useState(null);
  const user = useGlobalState((state) => state.user);
  const pathname = usePathname();
  const evento = useGlobalState((state) => state.evento);
  const rol = useGlobalState((state) => state.rol);
  const urlUsuarios = `${pathname}/listaUsuarios`;

  useEffect(() => {
    handleUsuarios();
  }, []);

  async function handleUsuarios() {
    let response = null;
    try {
      response = await fetch(`${urlServer}usuarios/listaUsuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ evento: idEvento }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de usuarios");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleSuscripcion(FK_evento_contenedor, FK_usuario) {
    try {
      const response = await fetch(
        `${urlServer}usuarios/cambiaSuscripcionEvento`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            evento: FK_evento_contenedor,
            username: FK_usuario,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      data.success === "Cambio a Suscrito!"
        ? toast.success(data.success)
        : toast.error(data.success);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="main-content">
      <Notificacion />
      <div className="container my-5">
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Usuarios
        </h1>

        <div className="row">
          {usuarios.length > 0 && user ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Estado de suscripción</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((element, index) => (
                  <tr key={index}>
                    <td>{element.cedula}</td>
                    <td>{element.nombre_documentos}</td>
                    <td>
                      <button
                        className={
                          element.estado_suscripcion === "Suscrito"
                            ? "btn btn-primary"
                            : "btn btn-danger"
                        }
                        onClick={() => {
                          handleSuscripcion(
                            idEvento,
                            element.PK_nombre_usuario
                          );
                          setTimeout(() => {
                            location.reload();
                          }, 5000);
                        }}
                      >
                        {element.estado_suscripcion}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="col-12">No hay usuarios para mostrar</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
