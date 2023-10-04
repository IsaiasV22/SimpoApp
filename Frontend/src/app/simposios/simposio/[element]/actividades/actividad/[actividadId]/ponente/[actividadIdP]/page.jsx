import React from "react";
import Ponente from "@/app/components/ponente/Ponente";

const page = ({ params }) => {
  const { actividadIdP } = params;
  console.log("Ponente : ", actividadIdP);
  return (
    <>
      <div className="main-content">
        <Ponente actividadIdP={actividadIdP} />
      </div>
    </>
  );
};
export default page;
