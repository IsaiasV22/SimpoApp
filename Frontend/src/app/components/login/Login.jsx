"use client";
import React, { useState } from "react";
import "./Login.css";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "../globalState/GlobalState"; // Asegúrate de que la ruta sea correcta
import {useRouter} from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setUserState = useGlobalState((state) => state.setUser);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const dataForm = { username, password };
    try {
      const response = await fetch(`${urlServer}usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña inválida");
      }

      const data = await response.json();

      if (data !== "") {
        setUserState(true); // Cambia el estado del usuario a true
        router.push('/simposios');
        //Redireccion a page simposios
        //window.location.href = "../../simposios";
      }
    } catch (error) {
      // Personaliza las notificaciones Toastify según el tipo de error
      toast.error(error.message, {
        className: "toastify-custom-error", // Usa la clase de estilo personalizada
      });
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="main-content">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first" style={{ marginBottom: "2rem" }}>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="login"
              onChange={(e) => setUsername(e.target.value)}
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
      <ToastContainer /> {/* Agrega este componente al final */}
    </div>
  );
}
