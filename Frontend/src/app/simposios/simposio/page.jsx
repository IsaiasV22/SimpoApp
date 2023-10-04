"use client";
import React from "react";
import Simposio from "../../components/simposio/Simposio";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const elementValues = searchParams.get("element");
  const element = elementValues ? JSON.parse(elementValues) : null;
  //console.log("Elemento: ",element);

  return (
    <>
      <div className="main-content">
        <Simposio element={element} />
      </div>
    </>
  );
};

export default Page;
