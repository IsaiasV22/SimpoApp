"use client";
import React from "react";
import "./Actividades.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";

export default function Actividades({ count }) {
    return (
    <div><Link href="../login">
    <button>ATRAS</button>
  </Link>
  <div className="actividades-container">actividades</div>
  </div>
    );
}