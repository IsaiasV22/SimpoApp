import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";

export default function StatusBar() {
    //selected option hook
    const [selectedOption, setSelectedOption] = useState("All");
    //handle input change
    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
        // You can handle the selection here
        console.log("Selected:", eventKey);
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
