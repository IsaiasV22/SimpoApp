import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Actividades from "./Actividades";

// Mock de la función de filtro
const mockFilterFunction = jest.fn();

const actividadesMock = [
  {
    PK_actividad: 1,
    descripcion: "Actividad 1",
    hora_inicio: "10:00",
    hora_final: "12:00",
    dia_evento: "2024-03-15",
    ubicacion: "Ubicación 1",
    estatus: true,
  },
  {
    PK_actividad: 2,
    descripcion: "Actividad 2",
    hora_inicio: "13:00",
    hora_final: "15:00",
    dia_evento: "2024-03-16",
    ubicacion: "Ubicación 2",
    estatus: false,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

it("renders without crashing", () => {
  render(
    <Actividades elementId={123} filterFunction={mockFilterFunction} />
  );
  expect(screen.getByText("Total results: 0")).toBeInTheDocument();
});
