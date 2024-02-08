import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const pagination = ({ totalActividades, actividadesPerPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalActividades / actividadesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {totalActividades > 0 ? (
        <ButtonToolbar aria-label="Toolbar with button groups">
          <Button variant="primary" className='m-2 '>Previous</Button>
          <ButtonGroup className="me-2" aria-label="First group">
            {pages.map((number) => (
              <Button key={number} variant="primary">
                {number}
              </Button>
            ))}
          </ButtonGroup>
          <Button variant="primary">Next</Button>
        </ButtonToolbar>
      ) : null}
    </div>
  );
};

export default pagination;
