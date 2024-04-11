import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import StatusBar from "./StatusBar";

/* 
      act(() => {
      /* fire events that update state 
    });
     assert on the output 

    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
        at C:\Users\Darkh\Desktop\SimpoApp-Official\Frontend\node_modules\react-bootstrap\cjs\DropdownMenu.js:38:3
        at div
        at Dropdown (C:\Users\Darkh\Desktop\SimpoApp-Official\Frontend\node_modules\@restart\ui\cjs\Dropdown.js:40:3)
        at C:\Users\Darkh\Desktop\SimpoApp-Official\Frontend\node_modules\react-bootstrap\cjs\Dropdown.js:41:43
        at C:\Users\Darkh\Desktop\SimpoApp-Official\Frontend\node_modules\react-bootstrap\cjs\DropdownButton.js:77:3
        at div
        at div
        at dispatch (C:\Users\Darkh\Desktop\SimpoApp-Official\Frontend\src\app\components\statusbar\StatusBar.jsx:6:37)
*/

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

/*   // Prueba para verificar que se actualiza el estado al seleccionar una opción
  it('should update status when selecting an option', () => {
    render(<StatusBar />);
    const dropdown = screen.getByText('Status');
    fireEvent.click(dropdown);
    const option = screen.getByText('In progress');
    fireEvent.click(option);
    expect(screen.getByText('In progress')).toBeInTheDocument();
  }); */
