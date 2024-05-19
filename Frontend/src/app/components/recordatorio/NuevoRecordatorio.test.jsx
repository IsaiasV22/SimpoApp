import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import NuevoRecordatorio from "./NuevoRecordatorio";

describe("NuevoRecordatorio", () => {
  it("should render the NuevoRecordatorio component", () => {
    render(<NuevoRecordatorio />);
    const component = screen.getByText('Nuevo recordatorio');
    expect(component).toBeInTheDocument();
  });
});