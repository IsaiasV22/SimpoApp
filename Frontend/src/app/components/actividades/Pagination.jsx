import React from "react";
import  Pagination  from "react-bootstrap/Pagination";

const pagination = ({ Actividades, actividadesPerPage,setCurrentPage,currentPage, setActividadesPerPage }) => {
  console.log(currentPage)
  let pages = [];
  for (let i = 1; i <= Math.ceil(Actividades.length / actividadesPerPage); i++) {
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
    if(currentPage > 1)
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if(currentPage < pages.length)
    setCurrentPage(currentPage + 1);
  };

  const handleLastPage = () => {
    setCurrentPage(pages.length);
  };

  const handleActivitiesPerPage = (event) => {
    console.log(event.target.value);
    setActividadesPerPage(event.target.value);
  };
  return (
    <div>
        <br/>
        <span>Activities per page: </span>
        <select onChange={handleActivitiesPerPage} value={actividadesPerPage}>
        {Array.from({ length: Actividades.length }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
        </select>
        <Pagination>
            <Pagination.First title="Go back to First page" onClick={()=>handleFirstPage()}/>
            <Pagination.Prev title="Go to previous page" onClick={()=>handlePrevPage()}/>
            {pages.map((number) => (
            <Pagination.Item key={number} active={number ===currentPage} onClick={()=>handleClick(number)}>
                {number}
            </Pagination.Item>
            ))}
            <Pagination.Next title="Go to Next page" onClick={()=>handleNextPage()}/>
            <Pagination.Last title="Go to Last page" onClick={()=>handleLastPage()}/>
        </Pagination>

    </div>
  );
};

export default pagination;
