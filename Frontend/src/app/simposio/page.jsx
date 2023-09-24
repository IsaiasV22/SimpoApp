"use client";
import React from "react";
import Simposio from "../components/simposio/Simposio";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const page = () => {
  console.log("about page");
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
