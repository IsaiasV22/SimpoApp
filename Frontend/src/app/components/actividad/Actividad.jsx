"use client";
import React from "react";
import "./Actividad.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";

export default function Actividad({ count }) {
    return (
        <div><Link href="../login">
        <button>ATRAS</button>
      </Link>
      <div className="actividad-container">actividad</div>
      </div>
        
    );
}