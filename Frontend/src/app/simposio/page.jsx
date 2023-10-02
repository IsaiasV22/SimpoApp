"use client";
import React from "react";
import Simposio from "../components/simposio/Simposio";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const elementValues = searchParams.get("element");
  const element = elementValues ? JSON.parse(elementValues) : null;
  console.log("Elemento: ",element);

  return (
    <>
      <Header />
      <div className="main-content">
        <Simposio element={element} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
