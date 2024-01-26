
import React from "react";
import Simposio from "../../../components/simposio/Simposio";
import { urlServer } from "@/app/Utiles.jsx";

const fetchTalleresById = async (id) => {
  //post request
  const res = await fetch(`${urlServer}eventos/talleresByEventoId`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}


const Page = async ({params}) => {
  const {element} = params;
  console.log("Elemento: ",element);
  const talleres = await fetchTalleresById(element);
  console.log("Talleres: ",talleres);
  return (
    <>
      <div className="main-content">
        <Simposio element={element} talleres={talleres} />
      </div>
    </>
  );
};

export default Page;
