"use client";
import React, { useEffect } from "react";
import Simposio from "../components/simposio/Simposio";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

const page = () => {
  //console.log("about page");
  const searchParams = useSearchParams()
  // Verificar si el router está montado antes de acceder a router.query
  //const { element } = searchParams.get('element');
  console.log("Search params ALL -> "+ searchParams.getAll());

  return (
    <>
      <Header />
      <div className="main-content">
        <Simposio />
      </div>
      <Footer />
    </>
  );
};
export default page;
