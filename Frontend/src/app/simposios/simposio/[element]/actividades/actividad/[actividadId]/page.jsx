import React from "react";
import Actividad from "@/app/components/actividad/Actividad";

const page = ({ params }) => {
  //console.log("about page");
  /*const searchParams = useSearchParams();
    const actividadIdValues = searchParams.get("actividadId");
    const actividadId = actividadIdValues ? JSON.parse(actividadIdValues) : null;*/

  const { actividadId } = params;
  console.log("Actividad Id: ", actividadId);
  return (
    <>
      <div className="main-content">
        <Actividad actividadId={actividadId} />
      </div>
    </>
  );
};
export default page;
