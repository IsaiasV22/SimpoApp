"use client";
import React from "react";
import Simposios from "../components/simposios/Simposios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const page = () => {
  //console.log("about page");
  return (
    <>
      <Header />
      <Simposios />
      <Footer />
    </>
  );
};
export default page;
