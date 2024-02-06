"use client";
import React, { useEffect, useState, useReducer } from "react";
import "./Simposio.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";

import { urlServer } from "@/app/Utiles.jsx";
import Modalidades from "../modalidades/Modalidades";
import SearchBar from "../searchbar/SearchBar";
import ActividadesFilter from "../actividades/Actividades";
import { ca } from "date-fns/locale";

function reducer(state, action) {
  switch (action.type) {
    case "UpdateMode":
      return {...state, mode: action.mode};
    case "UpdateValue":
      return {...state, value: action.value};
    case "UpdateModeAndValue":
      return {...state, mode: action.mode, value: action.value};
    default:
      return state;
  }
}


export default function Simposio({ element, talleres }) {

  const [state, dispatch] = useReducer(reducer, {mode:"Name", value:""});

  //console.log("Talleres -> ", talleres);
  //hook simposio
  const [simposio, setSimposio] = useState(null);
  //console.log("Simposio de la actividad: ", element.nombre);
  //useEffect
  useEffect(() => {
    getSimposio(element);
  }, []);

  //fetch in getSimposio
  async function getSimposio(elementId) {
    try {
      const response = await fetch(`${urlServer}eventos/evento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: elementId }),
        credentials: "include",
      });
      const data = await response.json();
      //console.log("Simposio por id: ", data[0]);
      setSimposio(data[0]);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }

  const filterActividades = (actividad) => {
    if(state.value === "") return true;
    if(state.mode === "Name") return actividad.descripcion.toLowerCase().includes(state.value);
    if(state.mode === "Author") return actividad.PonenteNombre.toLowerCase().includes(state.value.toLowerCase());
    if(state.mode === "Date") return actividad.dia_evento.includes(state.value);
  }

  return (
    <div>
      {simposio ? (
        <div>
          <div className="simposio-container">{simposio.nombre}</div>
          <div className="simposio-container">{simposio.descripcion}</div>
          <div className="simposio-container">{simposio.fecha}</div>
          <SearchBar dispatch={dispatch}/>
          {state.mode === 'Modalities' ? <Modalidades talleres={talleres} elementId={element} /> : 
          <ActividadesFilter elementId={element} filterFunction={filterActividades}/>}
        </div>
      ) : (
        <div>Cargando simposio ...</div>
      )}
    </div>
  );
}
