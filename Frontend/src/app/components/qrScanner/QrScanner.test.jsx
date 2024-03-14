import {render, screen, fireEvent} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import QrScanner from "./QrScanner";

//check if scanning button is rendered
it('renders the "Scan" button', () => {
  render(<QrScanner />);
  expect(screen.getByText("Scan Again", { selector: 'button' })).toBeInTheDocument();
});