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

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const user = useGlobalState((state) => state.user);
  const pathname = usePathname();
  const [suscripcion, setSuscripcion] = useState(null);
  const evento = useGlobalState((state) => state.evento);
  const rol = useGlobalState((state) => state.rol);
  const urlUsuarios = `${pathname}/listaUsuarios`;

  useEffect(() => {
    handleUsuarios();
  }, []);

  async function handleUsuarios() {
    console.log("entro al handleUsuarios");
    let response = null;
    try {
      console.log("1");
      response = await fetch(`${urlServer}usuarios/listaUsuarios`);
            console.log("2");
                        console.log(response);

      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de eventos");
      }
      const data = await response.json();
      setEventos(data);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="main-content">
      <Notificacion />
      <div className="container my-5">
        {/*         <BackButton />
         */}
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Usuarios
        </h1>

        <div className="row">
          {usuarios.length > 0 && user ? (
            usuarios.map((element, index) => (
              <div key={index} className="col-12">
                {element.nombre}
              </div>
            ))
          ) : (
            <div className="col-12">No users to display</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
