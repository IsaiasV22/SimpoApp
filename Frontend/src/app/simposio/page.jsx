"use client";
import React, { useEffect, useState } from "react";
import Simposio from "../components/simposio/Simposio";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

const Page = () => {
  //const [element, setElement] = useState(null);
  const searchParams = useSearchParams();


    const elementValues = searchParams.get("element");
    console.log("Elemto del searchParams: ",elementValues);

      //setElement(JSON.parse(elementValues));
      //console.log("Elemento del estado: ",element);


  return (
    <>
      <Header />
      <div className="main-content">
        <Simposio element={JSON.parse(elementValues)} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
