import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import StatusBar from "./StatusBar";



//should have text Status
it("should have text Status", () => {
  render(<StatusBar />);
  expect(screen.getByText("Status")).toBeInTheDocument();
});

//shoud have a text 'in progress' when selected in the dropdown
it('should have a text "In progress" when selected in the dropdown', () => {
  //create mock function for dispatch prop
  const dispatch = jest.fn();
  render(<StatusBar dispatch={dispatch} />);
  //act to click the dropdown button
  act(() => {
    fireEvent.click(screen.getByText("Status"));
  });

  //expect to find the text 'In progress' in the dropdown
  expect(screen.getByText("In progress")).toBeInTheDocument();
});

// It should have text "Upcoming" when selected "Upcoming" option in the dropdown menu
it('should have a text "Upcoming" when selected option in the dropdown menu', () => {
  // create mock function for dispatch prop
  const dispatch = jest.fn();
  render(<StatusBar dispatch={dispatch} />);
  // act to click the dropdown button
  act(() => {
    fireEvent.click(screen.getByText("Status"));
  });
  // expect to find the text "Upcoming" in the dropdown
  expect(screen.getByText("Upcoming")).toBeInTheDocument();
});


