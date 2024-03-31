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
  console.log("Action -> ", action.mode);
  switch (action.type) {
    case "JustOneFilter":
      return { ...state, filters: [action.filterFun] };
    case "JustOneFilterAndMode":
      return { ...state, mode: action.mode, filters: [action.filterFun] };
    case "AddFilter":
      return { ...state, filters: [...state.filters, action.filterFun] };
    default:
      return state;
  }
}

//initial state for useReducer
const initialState = {
  mode: "Title",
  filters: [],
};

export default function Simposio({ element, talleres }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //console.log("Talleres -> ", talleres);
  //hook simposio
  const [simposio, setSimposio] = useState(null);
  //console.log("Simposio de la actividad: ", element.nombre);
  //useEffect
  useEffect(() => {
    getSimposio(element);
  }, []);

  //fetch in getSimposio
  async function getListaUsuarios() {
    try {
      const response = await fetch(`${urlServer}usuarios/listaUsuarios`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }

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
      console.log("Simposio por id: ", data[0]);
      setSimposio(data[0]);
    } catch (error) {
      toast.error(error.message);
      //alert(error.message);
    }
  }

  return (
    <div>
      {simposio ? (
        <div>
          <div className="simposio-container">{simposio.nombre}</div>
          <div className="simposio-container">{simposio.descripcion}</div>
          <div className="simposio-container">{simposio.fecha}</div>
          <SearchBar
            dispatch={dispatch}
            dia_inicio={simposio.dia_inicio.slice(0, 10)}
          />
          {state.mode === "Modalities" ? (
            <Modalidades talleres={talleres} elementId={element} />
          ) : (
            <ActividadesFilter
              elementId={element}
              filterFunctions={state.filters}
            />
          )}
        </div>
      ) : (
        <div>Cargando simposio ...</div>
      )}
    </div>
  );
}
