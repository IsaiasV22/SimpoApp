import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import { useState, useEffect } from "react";

export default function StatusBar({ dispatch }) {
  //selected option hook
  const [selectedOption, setSelectedOption] = useState("All");
  //handle input change
  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    // You can handle the selection here
    console.log("Selected:", eventKey);
    //dispatch the filter function
    dispatch({
      type: "Update status filter",
      filterFun: filterFunction(eventKey),
    });
  };

  //filter function
  const filterFunction = (option) => {
    // get hour
    const actual_hour = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    //get day
    const actual_day = new Date().toISOString().split("T")[0];

    console.log("Actual hour: ", actual_hour);

    switch (option) {
      case "All":
        return () => true;
      case "Upcoming":
        //filter activities in a 12 hours range
        return (actividad) =>
          actividad.hora_inicio > actual_hour &&
          actividad.hora_inicio < (parseInt(actual_hour.split(":")[0]) + 12) + ":00:00" &&
          actividad.dia_evento.split("T")[0] === actual_day;
      case "In progress":
        return (actividad) =>
          actividad.hora_inicio < actual_hour &&
          actividad.hora_final > actual_hour && actividad.dia_evento.split("T")[0] === actual_day;
      case "Completed":
        return (actividad) => actividad.hora_final < actual_hour && actividad.dia_evento.split("T")[0] >= actual_day;
      default:
        return () => true;
    }
  };

  return (
    <div className="container">
      <div style={{ marginLeft: "10px" }}>
        <DropdownButton
          id="dropdown-basic-button"
          title="Status"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Upcoming">Upcoming</Dropdown.Item>
          <Dropdown.Item eventKey="In progress">In progress</Dropdown.Item>
          <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
        </DropdownButton>
        <Badge bg="success">{selectedOption}</Badge>
      </div>
    </div>
  );
}
