import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ActividadesFilter from "./Actividades";

// Mock de la función de filtro
const mockFilterFunction = jest.fn();


//limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

it("renders without crashing", () => {
  render(<ActividadesFilter elementId={123} filterFunction={mockFilterFunction} />);
  expect(screen.getByText("Total results: 0")).toBeInTheDocument();
});

it("renders without crashing with empty activities", () => {
  render(<ActividadesFilter elementId={123} filterFunction={mockFilterFunction} />);

  expect(screen.getByText("Total results: 0")).toBeInTheDocument();
  expect(screen.getByText("Total activities per page: 0")).toBeInTheDocument();
  expect(screen.getByText("Current page : 1")).toBeInTheDocument();
  expect(screen.getByText("No hay Actividades")).toBeInTheDocument();
});


