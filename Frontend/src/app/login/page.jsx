"use client";
import React, {useState} from "react";
import Login from "../components/login/Login";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const page = () => {
  //estado para mostrar el componente logout si esta logueado el usuario
  const [isLogged, setIsLogged] = useState(false);

   //funcion para cambiar el estado de isLogged
   const toggleIsLogged = () => {
    console.log("Cambio estado: ",isLogged);
    setIsLogged(!isLogged);
  };
  
  return (
    <>
      <Header onLogged={toggleIsLogged} isLogged={isLogged}/>
      <div className="content">
        <Login onLogged={toggleIsLogged}/>
      </div>
      <Footer />
    </>
  );
};
export default page;