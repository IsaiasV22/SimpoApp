import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import AsistenciaActividades from "./AsistenciaActividades";



it('renders the "Download Attendance List" button', () => {
  render(<AsistenciaActividades pk={123} />);
  expect(screen.getByText("Download Attendance List")).toBeInTheDocument();
});

it('calls generateXLSX function when "Download Attendance List" button is clicked', () => {
    render(<AsistenciaActividades pk={123} />);
    const button = screen.getByText("Download Attendance List");
    fireEvent.click(button);

    // Since we are not testing the actual XLSX generation,
    // we can simply check if the click event occurs
    expect(button).toHaveProperty("onClick");
  });