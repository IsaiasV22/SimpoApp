
import React from "react";
import Simposio from "../../../components/simposio/Simposio";


const Page = ({params}) => {
  const {element} = params;
  //console.log("Elemento: ",element);

  return (
    <>
      <div className="main-content">
        <Simposio element={element} />
      </div>
    </>
  );
};

export default Page;
