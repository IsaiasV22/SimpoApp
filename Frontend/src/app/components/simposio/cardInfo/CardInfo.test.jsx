import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import EditCroquis from "./editCroquis/EditCroquis";

//should have button location
//fake test with  NO CardInfo Render
it('should render EditCroquis', () => {
  render(<EditCroquis imageName={'as'} high_contrast={true}/>);
  expect(screen.getByText("Editar")).toBeInTheDocument();
});
