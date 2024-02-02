

//Searchbar component with dropdown menu for search by options
export default function SearchBar() {
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
                    aria-describedby="button-addon2"
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >
                    Search
                </button>
                </div>
            </div>
            </div>
        </div>
        <div>
            <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Search by
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                <a className="dropdown-item" href="#">
                    Action
                </a>
                </li>
                <li>
                <a className="dropdown-item" href="#">
                    Another action
                </a>
                </li>
                <li>
                <a className="dropdown-item" href="#">
                    Something else here
                </a>
                </li>
            </ul>
            </div>
        </div>
        </div>
    );
    }