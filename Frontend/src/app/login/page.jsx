"use client";
import React, {useState} from "react";
import Login from "../components/login/Login";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const page = () => {
  return (
    <>
      <div className="content">
        <Login/>
      </div>
    </>
  );
};
export default page;