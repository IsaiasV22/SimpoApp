"use client";
import React, { useEffect, useState } from "react";
import { urlServer } from "@/app/Utiles.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";

import Papa from "papaparse";
// translation hook
import { useTranslation } from "react-i18next";

// ...

// Función para generar el archivo CSV
function generateCSV(data) {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Estadisticas() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // translation hook
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    document.title = "Estadisticas";
  }, []);

  // Función para manejar la carga de datos
  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(
        `${urlServer}estadisticas/AllSimposiosAllDetails`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setData(data);
      generateCSV(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      <button
        className="btn btnn-primary"
        style={{ margin: "0.5%" }}
        onClick={fetchData}
      >
        {t("Descargar_Información_Estadistica")}
      </button>
      <ToastContainer/>
    </>
  );
}

export default Estadisticas;
