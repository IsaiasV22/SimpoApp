import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import UpdateModal from "./UpdateModal";

describe("UpdateModal", () => {
    it("should render the UpdateModal component", () => {
        render(<UpdateModal />);
        const component = screen.getByText('Edit');
        expect(component).toBeInTheDocument();
    });
    });