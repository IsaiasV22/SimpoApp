"use client";
import React from "react";
import "./Simposios.css"; 
//import Link
import Link from "next/link";

export default function Simposios() {
  return (
    <div className="main-content">
      <Link href="../login">
        <button>ATRAS</button>
      </Link>
      <div className="simposios-container">simposios</div>
    </div>
  );
}