import React from "react";
import Coauthor from "@/app/components/coauthor/Coauthor";

const page = ({ params }) => {

  
    const { coauthorC } = params;
    //console.log("Coauthor id: ", coauthorC);
    return (
      <>
        <div className="main-content">
          <Coauthor coauthorC={coauthorC} />
        </div>
      </>
    );
  };
  export default page;