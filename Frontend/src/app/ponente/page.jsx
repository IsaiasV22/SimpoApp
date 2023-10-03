"use client";
import React from "react";
import Ponente from "../components/ponente/Ponente";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";
const page = () =>{
    const searchParams = useSearchParams();
    const ponenteValues = searchParams.get("ponente");
    const ponente = ponenteValues ? JSON.parse(ponenteValues) : null;
    //console.log("Ponente : ",ponente);
    return(
        <>
        <Header />
        <div className="main-content">
        <Ponente ponente={ponente}/>
        </div>
        <Footer />
      </>
    );
};
export default page;