import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import CardInfo from "./CardInfo";
import { it } from "date-fns/locale";

//should have button location
it("should have button location", () => {
  render(<CardInfo />);
  expect(screen.getByText("Location")).toBeInTheDocument();
});