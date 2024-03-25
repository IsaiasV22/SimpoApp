import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ListaUsuarios from "./ListaUsuarios";

it("should have h1 usuarios", () => {
  render(<ListaUsuarios idEvento={3} />);
  expect(screen.getByText("Usuarios")).toBeInTheDocument();
});

it("should filter users based on search text", () => {
  const text = "No hay usuarios para mostrar";
  render(<ListaUsuarios idEvento={3} />);
  const searchInput = screen.getByPlaceholderText("Buscar por nombre");
  fireEvent.change(searchInput, { target: { value: "Alb" } });
  expect(screen.getByText(text)).toBeInTheDocument();
  expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
});
