import { render, screen, fireEvent,act } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import LanguageDropdown from "./languageDropdown";

it("should render the LanguageDropdown component", () => {
    render(<LanguageDropdown />);
    //language text
    expect(screen.getByText("Language")).toBeInTheDocument();
    
  });