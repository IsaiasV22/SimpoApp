"use client";
import React, { useState } from "react";
import "./Login.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
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
    console.log(JSON.stringify(dataForm));
    try {
      const response = await fetch(`${urlServer}usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        throw new Error("Usuario o contraseña invalida!");
      }
      const data = await response.json();
      console.log(data);
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
          {/* Tabs Titles */}

          {/* Icon */}
          <div className="fadeIn first">
            <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="User Icon"
            />
          </div>

          {/* Login Form */}
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
              type="text"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          {/* Remind Password */}
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
