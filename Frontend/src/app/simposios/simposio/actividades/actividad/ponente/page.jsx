"use client";
import React from "react";
import Ponente from "../../../../../components/ponente/Ponente";
import { useSearchParams } from "next/navigation";
const page = () =>{
    const searchParams = useSearchParams();
    const ponenteValues = searchParams.get("ponente");
    const ponente = ponenteValues ? JSON.parse(ponenteValues) : null;
    //console.log("Ponente : ",ponente);
    return(
        <>
        <div className="main-content">
        <Ponente ponente={ponente}/>
        </div>
      </>
    );
};
export default page;