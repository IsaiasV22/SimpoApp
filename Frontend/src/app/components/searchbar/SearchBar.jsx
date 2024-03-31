import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StatusBar from "../statusbar/StatusBar";
import "./Search.css";

//Searchbar component with dropdown menu for search by options
export default function SearchBar({ dispatch, dia_inicio }) {
  console.log("dia_inicio: ", dia_inicio);
  //text hook
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  //selected option hook
  const [selectedOption, setSelectedOption] = useState("Title");
  //handle input change
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    console.log("Selected:", selectedOption, " value:", event.target.value);
    //dispatch the action
    dispatch({
      type: "JustOneFilter",
      mode: selectedOption,
      filterFun: filterFunction(selectedOption,event.target.value),
    });
  };

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    // You can handle the selection here
    console.log("Selected:", eventKey, " value:", searchText);
    // Add your custom logic based on the selected item
    dispatch({
      type: "JustOneFilterAndMode",
      mode: eventKey,
      filterFun: filterFunction(eventKey,searchText),
    });
  };

  const handleSearch = () => {
    // Add your custom logic here
    console.log("Selected:", selectedOption, " value:", searchText);
    dispatch({
      type: "JustOneFilter",
      mode: selectedOption,
      filterFun: filterFunction(selectedOption,searchText),
    });
  };

  const filterFunction = (option,searchParameter) => {
    switch (option) {
      case "Title":
        return (actividad) =>
          actividad.descripcion
            .toLowerCase()
            .includes(searchParameter.toLowerCase());
      case "Author":
        return (actividad) =>
          actividad.PonenteNombre.toLowerCase().includes(
            searchParameter.toLowerCase()
          );
      /*       case "Date":
        return actividad.dia_evento.includes(searchText);
      case "Modalities":
        return actividad.modalidades.includes(searchText); */
      default:
        true;
    }
  };

  return (
    <div className="container">
      <div style={{ marginLeft: "10px" }}>
        <div className="dropdown-buttons-container">
          <div className="flex-column ">
            <DropdownButton
              id="dropdown-basic-button"
              title="Search by"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
              <Dropdown.Item eventKey="Author">Author</Dropdown.Item>
              <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
              <Dropdown.Item eventKey="Modalities">Modalities</Dropdown.Item>
            </DropdownButton>
            <Badge bg="success">{selectedOption}</Badge>
          </div>
          <StatusBar />
        </div>
      </div>
      {["Title", "Author"].includes(selectedOption) ? (
        <div className="row">
          <div className="col-12">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Recipient's username"
                value={searchText}
                onChange={handleInputChange}
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {selectedOption === "Date" ? (
        <div>
          <DatePicker
            showIcon
            selected={selectedDate}
            placeholderText="Click to select a date"
            openToDate={new Date(dia_inicio)}
            toggleCalendarOnIconClick
            dateFormat={"MM / dd / yyyy"}
            onChange={(date) => {
              console.log("date to be dispatched -> ", date.toISOString());
              setSelectedDate(date);
              dispatch({
                type: "JustOneFilter",
                mode: selectedOption,
                filterFun: (actividad) =>
                  actividad.dia_evento.includes(date.toISOString()),
              });
            }}
            startDate={searchText}
          />
        </div>
      ) : null}
    </div>
  );
}
