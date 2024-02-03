import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useState} from "react";
//Searchbar component with dropdown menu for search by options
export default function SearchBar({dispatch}) {
 //text hook
    const [searchText, setSearchText] = useState("");
 //selected option hook
    const [selectedOption, setSelectedOption] = useState("Name");   
 //handle input change
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        console.log("Selected:", selectedOption, ' value:', event.target.value);
        //dispatch the action
        dispatch({type: "UpdateModeAndValue", mode: selectedOption, value: event.target.value});
    };

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    // You can handle the selection here
    console.log("Selected:", eventKey, ' value:', searchText);
    // Add your custom logic based on the selected item
    dispatch({type: "UpdateModeAndValue", mode: eventKey, value: searchText});
  };

  const handleSearch = () => {
    // Add your custom logic here
    console.log("Selected:", selectedOption, ' value:', searchText);
    dispatch({type: "UpdateModeAndValue", mode: selectedOption, value: searchText});
  };

  return (
    <div>
      <div className="container">
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
      </div>
      <DropdownButton
        id="dropdown-basic-button"
        title="Search by"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey='Name'>Name</Dropdown.Item>
        <Dropdown.Item eventKey='Author'>Author</Dropdown.Item>
        <Dropdown.Item eventKey='Date'>Date</Dropdown.Item>
        <Dropdown.Item eventKey='Modalities'>Modalities</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
