"use client";
import React from "react";
import "./Simposio.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";

export default function Simposio({ count }) {
    return (
<div><Link href="../login">
        <button>ATRAS</button>
      </Link>
      <div className="simposio-container">simposio</div>
      </div>
    );
}