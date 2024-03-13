"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { urlServer } from "@/app/Utiles";

export default function AsistenciaActividades({pk}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${urlServer}estadisticas/Attendance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: pk }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData); // Almacenamos directamente los datos JSON recibidos
      } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
      }
    }
    fetchData();
  }, []);

  const generateXLSX = () => {
    if (data) {
      const wb = XLSX.utils.book_new(); // Nuevo libro
      const ws = XLSX.utils.aoa_to_sheet([]); // Nueva hoja de trabajo vacía

      // Título del simposio en la primera fila, fusionado de A a L
      XLSX.utils.sheet_add_aoa(
        ws,
        [[`Simposio: ${data.eventName[0].Simposio}`]],
        {
          origin: "A1",
        }
      );
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 11 } }];

      // Establecer los estilos del título del simposio
      const titleCellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
      ws[titleCellRef].s = {
        font: { sz: 14, bold: true },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: "FFFF00" } },
      };

      let rowIndex = 2; // Iniciar en la tercera fila después del título y una fila en blanco

      Object.entries(data.results).forEach(([actividad, users]) => {
        // Nombre de la actividad
        XLSX.utils.sheet_add_aoa(ws, [[`Actividad: ${actividad}`]], {
          origin: { r: rowIndex, c: 0 },
        });
        ws["!merges"].push({
          s: { r: rowIndex, c: 0 },
          e: { r: rowIndex, c: 11 },
        });

        // Establecer los estilos de la celda de actividad
        const activityCellRef = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
        ws[activityCellRef].s = {
          font: { sz: 12, bold: true },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "FFFF00" } },
        };

        rowIndex++; // Mover a la siguiente fila

        // Encabezados de la tabla para cada actividad
        const headers = [
          "Nombre",
          "",
          "",
          "Apellidos",
          "",
          "",
          "Correo",
          "",
          "",
          "Genero",
          "",
          "",
        ];
        XLSX.utils.sheet_add_aoa(ws, [headers], {
          origin: { r: rowIndex, c: 0 },
        });

        // Fusionar celdas de encabezados y aplicar estilos
        const headerRanges = [
          { s: { r: rowIndex, c: 0 }, e: { r: rowIndex, c: 2 } }, // A:C
          { s: { r: rowIndex, c: 3 }, e: { r: rowIndex, c: 5 } }, // D:F
          { s: { r: rowIndex, c: 6 }, e: { r: rowIndex, c: 8 } }, // G:I
          { s: { r: rowIndex, c: 9 }, e: { r: rowIndex, c: 11 } }, // J:L
        ];
        headerRanges.forEach((range) => {
          ws["!merges"].push(range);
          const headerCellRef = XLSX.utils.encode_cell({
            r: range.s.r,
            c: range.s.c,
          });
          ws[headerCellRef].s = {
            alignment: { horizontal: "center", vertical: "center" },
            fill: { fgColor: { rgb: "FFFF00" } },
          };
        });

        rowIndex++; // Mover a la siguiente fila

        // Datos de los usuarios
        users.forEach((user) => {
          const userRow = [
            { v: user.Nombre || "" },
            "",
            "",
            { v: user.Apellidos || "" },
            "",
            "",
            { v: user.Correo || "" },
            "",
            "",
            { v: user.Genero || "" },
            "",
            "",
          ];
          XLSX.utils.sheet_add_aoa(ws, [userRow], {
            origin: { r: rowIndex, c: 0 },
          });
          rowIndex++; // Mover a la siguiente fila después de cada usuario
        });

        rowIndex++; // Dejar una fila en blanco después de cada grupo de actividad
      });

      // Configuraciones adicionales aquí si es necesario

      // Añadir la hoja al libro
      XLSX.utils.book_append_sheet(wb, ws, "Asistencia");

      // Escribir el archivo
      XLSX.writeFile(wb, "AsistenciaActividades.xlsx");
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        style={{ margin: "0.5%" }}
        onClick={generateXLSX}
      >
        Download Attendance List
      </button>
    </div>
  );
}
