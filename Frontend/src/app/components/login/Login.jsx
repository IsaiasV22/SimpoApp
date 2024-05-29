"use client";
import React, { useState, useEffect } from "react";
import "./Login.css";
import { urlServer } from "@/app/Utiles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalState from "../globalState/GlobalState";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
//import the i18n instance
import "@/app/locales/locale";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setUserState = useGlobalState((state) => state.setUser);
  const setRolState = useGlobalState((state) => state.setRol);
  const high_contrast = useGlobalState((state) => state.high_contrast);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //i18n translate strategy
  const { t, i18n } = useTranslation(["common"]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const dataForm = { username, password };
    try {
      const response = await fetch(`${urlServer}usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
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
        localStorage.removeItem("user");
        setUserState(true); // Cambia el estado del usuario a true
        setRolState(data.user[0].FK_rol); // Guarda el rol del usuario

        router.push("/simposios");
        //Redireccion a page simposios
        //window.location.href = "../../simposios";
      }
    } catch (error) {
      // Personaliza las notificaciones Toastify según el tipo de error
      toast.error(error.message, {
        className: "toastify-custom-error", // Usa la clase de estilo personalizada
      });
      console.error("Error en la petición fetch: ", error);
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <>

      <div className={`main-content ${high_contrast ? "high-contrast" : ""}`}>
        <div className="main-content-login">
          {loading && <div className="spinner"></div>}
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div
                className="fadeIn first"
                style={{ marginBottom: "2rem", marginTop: "2rem" }}
              >
                <h2 style={{ fontSize: "16px" }}>{t("log_in")}</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="login"
                  className="fadeIn second"
                  name="login"
                  placeholder={t("Username")}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado de showPassword
                    id="password"
                    className="fadeIn third"
                    name="login"
                    placeholder={t("Password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="password-toggle-icon"
                  ></span>
                </div>
                <input
                  type="submit"
                  className="fadeIn fourth"
                  value={t("log_in")}
                />
              </form>

              <div id="formFooter">
                <a className="underlineHover register" href="#">
                  {t("Register")}
                </a>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer /> {/* Agrega este componente al final */}
      </div>
    </>
  );
}
