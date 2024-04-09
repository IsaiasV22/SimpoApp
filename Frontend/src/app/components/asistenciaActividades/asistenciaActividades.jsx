"use client";
import React, { useEffect, useState } from "react";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { urlServer } from "@/app/Utiles";

export default function AsistenciaActividades({ pk }) {
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
  }, [pk]);

  const generateXLSX = async () => {
    if (!data) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Asistencia");

    // Título del simposio
    worksheet.mergeCells('A1:R1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = `Simposio: ${data.eventName[0].Simposio}`;
    titleCell.style = {
      font: { size: 14, bold: true },
      alignment: { horizontal: 'left', vertical: 'middle' },
      fill: { type: 'pattern', pattern:'solid', fgColor:{ argb:'33FFFF' } }
    };

    let rowIndex = 3;
    Object.entries(data.results).forEach(([actividad, users]) => {
      // Nombre de la actividad
      const actividadCell = `A${rowIndex}:R${rowIndex}`;
      worksheet.mergeCells(actividadCell);
      const headerCell = worksheet.getCell(`A${rowIndex}`);
      headerCell.value = `Actividad: ${actividad}`;
      headerCell.style = {
        font: { size: 12, bold: true },
        alignment: { horizontal: 'left', vertical: 'middle' },
        fill: { type: 'pattern', pattern:'solid', fgColor:{ argb:'FFFF99' } }
      };
      rowIndex++;

      // Encabezados de los usuarios
      const headers = ['Nombre', 'Apellidos', 'Correo', 'Genero', 'Afiliacion', 'Pais'];
      headers.forEach((header, i) => {
        const cell = worksheet.getCell(`${String.fromCharCode(65 + i * 3)}${rowIndex}`);
        cell.value = header;
        cell.style = {
          font: { size: 11, bold: true },
          alignment: { horizontal: 'center', vertical: 'middle' },
          fill: { type: 'pattern', pattern:'solid', fgColor:{ argb:'FFFF00' } }
        };
        worksheet.mergeCells(`${String.fromCharCode(65 + i * 3)}${rowIndex}:${String.fromCharCode(67 + i * 3)}${rowIndex}`);
      });
      rowIndex++;

      // Datos de los usuarios
      users.forEach((user) => {
        const columns = ['A', 'D', 'G', 'J', 'M', 'P'];
        columns.forEach((col, i) => {
          const userCell = worksheet.getCell(`${col}${rowIndex}`);
          userCell.value = user[Object.keys(user)[i]];
          userCell.style = {
            font: { size: 10 },
            alignment: { horizontal: 'left', vertical: 'middle' }
          };
          worksheet.mergeCells(`${col}${rowIndex}:${String.fromCharCode(col.charCodeAt(0) + 2)}${rowIndex}`);
        });
        rowIndex++;
      });

      rowIndex++; // Espacio después de cada actividad
    });

    // Configuración de anchos de columnas aquí si es necesario

    // Guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `Asistencia_${data.eventName[0].Simposio}.xlsx`);
  };

  return (
    <div>
      <button
        className="btn btnn-primary"
        style={{ margin: "0.5%" }}
        onClick={generateXLSX}
      >
        Download Attendance List
      </button>
    </div>
  );
}