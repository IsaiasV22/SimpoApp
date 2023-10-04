"use client";
import React, { useState } from "react";
import "./Login.css";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "../globalState/GlobalState"; // Asegúrate de que la ruta sea correcta
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setUserState = useGlobalState((state) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const dataForm = { username, password };
    try {
      const response = await fetch(`${urlServer}usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Error desconocido"; // Mensaje de error predeterminado
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data !== "") {
        setUserState(true); // Cambia el estado del usuario a true
        router.push("/simposios");
        //Redireccion a page simposios
        //window.location.href = "../../simposios";
      }
    } catch (error) {
      // Personaliza las notificaciones Toastify según el tipo de error
      toast.error(error.message, {
        className: "toastify-custom-error", // Usa la clase de estilo personalizada
      });
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="main-content">
      <div className="main-content-login">
        {loading && <div className="spinner"></div>}
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first" style={{ marginBottom: "2rem", marginTop: "2rem" }}>
              <h2 style={{fontSize: "16px"}}>Inicio de Sesion</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="login"
                className="fadeIn second"
                name="login"
                placeholder="Username"
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
              <a className="underlineHover register" href="#">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Agrega este componente al final */}
    </div>
  );
}
