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
      type: "Update search filter",
      mode: selectedOption,
      filterFun: filterFunction(selectedOption, event.target.value),
    });
  };

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    //console.log("Selected:", eventKey, " value:", searchText);\
    //dispatch the selected mode and filter function
    dispatch({
      type: "Update mode and search filter",
      mode: eventKey,
      filterFun: filterFunction(eventKey, searchText),
    });
  };

  const handleSearch = () => {
    console.log("Selected:", selectedOption, " value:", searchText);
    dispatch({
      type: "Update search filter",
      mode: selectedOption,
      filterFun: filterFunction(selectedOption, searchText),
    });
  };

  const filterFunction = (option, searchParameter) => {
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

      default:
        return () => true;
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
          <StatusBar dispatch={dispatch} />
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
              /* console.log("date to be dispatched -> ", date.toISOString()); */
              setSelectedDate(date);
              dispatch({
                type: "Update search filter",
                mode: selectedOption,
                filterFun: (actividad) =>
                  actividad.dia_evento.includes(date.toISOString()),
              });
            }}
            startDate={searchText}
            closeOnScroll={true}
          />
        </div>
      ) : null}
    </div>
  );
}
