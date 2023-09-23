"use client";
import React from "react";
import Login from "../components/login/Login";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
const page = () => {
  console.log("about page");
  return (
    <>
      <Header />
      <div className="content">
        <Login />
      </div>
      <Footer />
    </>
  );
};
export default page;
