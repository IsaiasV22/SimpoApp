"use client"
import React, { useState } from "react";
import "./Login.css";
import Link from "next/link";
import { urlServer } from "@/app/Utiles";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

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

      if (data !== "") {
        window.location.href = "../../simposios";
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
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
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado de showPassword
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="password-toggle-icon"
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
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
