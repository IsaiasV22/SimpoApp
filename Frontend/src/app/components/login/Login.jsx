"use client";
import React, { useState } from "react";
import "./Login.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/App.css";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Lógica de envío del formulario
    const dataForm = { id, password };
    try {
      const response = await fetch(`${urlServer}usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataForm),
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña inválida");
      }

      const data = await response.json();
      console.log(data);

      // Verificar si los datos son diferentes de vacío
      if (data !== "") {
        // Redirigir al usuario a la página "SIMPOSIOS"
        window.location.href = "../../simposios"; // Cambiar esto por la URL correcta
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="main-content">
      <Link href="/">
        <button>ATRAS</button>
      </Link>
      <Link href="../../simposios">
        <button>SIMPOSIOS</button>
      </Link>
      <Link href="../../simposio">
        <button>SIMPOSIO</button>
      </Link>
      <Link href="../../actividades">
        <button>ACTIVIDADES</button>
      </Link>
      <Link href="../../actividad">
        <button>ACTIVIDAD</button>
      </Link>
      <Link href="../../ponente">
        <button>PONENTE</button>
      </Link>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="User Icon"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="login"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
