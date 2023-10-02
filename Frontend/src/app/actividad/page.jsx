import React from "react";
import Actividad from "../components/actividad/Actividad";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const page = () =>{
    //console.log("about page");
    return(
        <>
        <Header />
        <div className="main-content">
        <Actividad/>
        </div>
        <Footer />
      </>

    );
};
export default page;