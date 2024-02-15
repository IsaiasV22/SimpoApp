import React from "react";
import Pagination from "react-bootstrap/Pagination";
import ResponsivePagination from "react-responsive-pagination";
import "./Pagination.css";

const pagination = ({
  Actividades,
  actividadesPerPage,
  setCurrentPage,
  currentPage,
  setActividadesPerPage,
}) => {
  console.log(currentPage);
  let pages = [];
  for (
    let i = 1;
    i <= Math.ceil(Actividades.length / actividadesPerPage);
    i++
  ) {
    pages.push(i);
  }

  const handleClick = (number) => {
    console.log(number);
    setCurrentPage(number);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  const handleLastPage = () => {
    setCurrentPage(pages.length);
  };

  const handleActivitiesPerPage = (event) => {
    console.log(event.target.value);
    setActividadesPerPage(event.target.value);
  };

  const handlePageChange = (page) => {
    console.log('Page : ',page);
    setCurrentPage(page);
  };
  return (
    <div>
      <hr />
      <div className="centered">
        <br />
        <div style={{ display: "flex", marginBottom: "2px" }}>
          <span className="m-1 ">Activities per page:</span>
          <select onChange={handleActivitiesPerPage} value={actividadesPerPage}>
            {Array.from({ length: Actividades.length }, (_, i) =>
              i + 1 === actividadesPerPage ||
              (i + 1) % 5 == 0 ||
              i + 1 === Actividades.length ? (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ) : null
            )}
          </select>
        </div>
        <ResponsivePagination
          total={Actividades.length}
          current={currentPage}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
};

export default pagination;
