"use client";
import React, { useState, useEffect } from "react";
import "@/app/css/Heart.css";
import { urlServer } from "@/app/Utiles.jsx";
import Floater from "react-floater";

export default function Heart(actividad) {
  //estatus state hook
  const [isChecked, setIsChecked] = useState(false);

  //useEffect for checkbox
  useEffect(() => {
    handleCheckbox(actividad);
  }, []);



  const handleCheckboxClick =(event) => {
    event.stopPropagation(); // Evitar que el evento se propague hacia arriba
  };


  //handleIsChecked
  async function handleCheckbox(PK_actividad) {
    console.log("Checking state of activity ->  ", PK_actividad.actividad);
    try {
      const response = await fetch(
        `${urlServer}actividades/checkEstadoActividad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actividad: PK_actividad.actividad }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log("response: ", response);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("data -> ", data);
      setIsChecked(data.estatus);
      //return data.estatus;
      //toast.success(data.success);
    } catch (error) {
      //console.log("error -> ",error);
      console.error(error.message);
    }
    console.log("Heart checking state");
  }
  const handleCheckboxChange = (event) => {
    // Esta función se ejecutará cuando el estado del checkbox cambie
    // Cambiar el estado del checkbox al contrario del estado actual
   /* event.stopPropagation(); // Evitar que el evento se propague hacia arriba*/
    setIsChecked(event.target.checked);
    //console.log("Heart changed");
  };
  return (
    <div id="main-content">
      
      <div>
        <input
          type="checkbox"
          id="checkbox" 
          onClick={handleCheckboxClick}
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
        <label htmlFor="checkbox">
          <Floater
           title='Add to my calendar' 
           event='hover'
           placement='top'
           eventDelay={2}
           hideArrow={false}  
           >
          <button className="btn btn-primary">Me interesa</button>
          </Floater>
        </label>
      </div>
    </div>
  );
}
