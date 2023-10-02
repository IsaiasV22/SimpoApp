"use client"
import React from "react";
import Actividad from "../components/actividad/Actividad";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

const page = () =>{
    //console.log("about page");
    const searchParams = useSearchParams();
    const actividadIdValues = searchParams.get("actividadId");
    const actividadId = actividadIdValues ? JSON.parse(actividadIdValues) : null;
    console.log("Actividad Id: ",actividadId);

    return(
        <>
        <Header />
        <div className="main-content">
        <Actividad actividadId={actividadId}/>
        </div>
        <Footer />
      </>

    );
};
export default page;