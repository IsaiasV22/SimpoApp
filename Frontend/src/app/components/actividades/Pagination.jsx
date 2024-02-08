import React from "react";
import  Pagination  from "react-bootstrap/Pagination";

const pagination = ({ totalActividades, actividadesPerPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalActividades / actividadesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>

        <Pagination>
            <Pagination.First title="Go back to First page"/>
            <Pagination.Prev title="Go to previous page"/>
            {pages.map((number) => (
            <Pagination.Item key={number} active={number ===1}>
                {number}
            </Pagination.Item>
            ))}
            <Pagination.Next title="Go to Next page"/>
            <Pagination.Last title="Go to Last page"/>
        </Pagination>

    </div>
  );
};

export default pagination;
