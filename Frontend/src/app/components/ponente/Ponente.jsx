"use client";
import React from "react";
import "./Ponente.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";

export default function Ponente({ count }) {
    return (
<div><Link href="../login">
        <button>ATRAS</button>
      </Link>
      <div className="ponente-container">ponente</div>
      </div>
    );
}