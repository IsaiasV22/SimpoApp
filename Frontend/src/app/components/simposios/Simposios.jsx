"use client";
import React from "react";
import "./Simposios.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";

export default function Simposios({ count }) {
    return (
<div><Link href="../login">
        <button>ATRAS</button>
      </Link>
      <div className="simposios-container">simposios</div>
      </div>
    );
}
