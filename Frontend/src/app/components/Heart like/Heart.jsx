"use client";
import React, { useState, useEffect } from "react";
import "@/app/css/Heart.css";
import { urlServer } from "@/app/Utiles.jsx";

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
          <svg
            id="heart-svg"
            viewBox="467 392 58 57"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Group"
              fill="#FFFFFF"
              fill-rule="evenodd"
              transform="translate(467 392)"
            >
              <path
                d="M28.9955034,43.5021565 C29.8865435,42.7463028 34.7699838,39.4111958 36.0304386,38.4371087 C41.2235681,34.4238265 43.9999258,30.3756814 44.000204,25.32827 C43.8745444,20.7084503 40.2276972,17 35.8181279,17 C33.3361339,17 31.0635318,18.1584833 29.5323721,20.1689268 L28.9999629,20.8679909 L28.4675537,20.1689268 C26.936394,18.1584833 24.6637919,17 22.181798,17 C17.6391714,17 14,20.7006448 14,25.3078158 C14,30.4281078 16.7994653,34.5060727 22.0294634,38.5288772 C23.3319753,39.530742 27.9546492,42.6675894 28.9955034,43.5021565 Z"
                id="heart"
                stroke="#808080"
              />
              <circle
                id="main-circ"
                fill="#00c0f3"
                opacity="0"
                cx="29.5"
                cy="29.5"
                r="1.5"
              />

              <g
                className="grp"
                id="grp7"
                opacity="0"
                transform="translate(7 6)"
              >
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#ffe06a"
                  cx="2"
                  cy="6"
                  r="2"
                />
                <circle
                  className="cir-b "
                  id="oval2"
                  fill="#6dc067"
                  cx="5"
                  cy="2"
                  r="2"
                />
              </g>

              <g
                className="grp"
                id="grp6"
                opacity="0"
                transform="translate(0 28)"
              >
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#005da4"
                  cx="2"
                  cy="7"
                  r="2"
                />
                <circle
                  className="cir-b"
                  id="oval2"
                  fill="#00c0f3"
                  cx="3"
                  cy="2"
                  r="2"
                />
              </g>

              <g
                className="grp"
                id="grp3"
                opacity="0"
                transform="translate(52 28)"
              >
                <circle
                  className="cir-b"
                  id="oval2"
                  fill="#ffe06a"
                  cx="2"
                  cy="7"
                  r="2"
                />
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#6dc067"
                  cx="4"
                  cy="2"
                  r="2"
                />
              </g>

              <g
                className="grp"
                id="grp2"
                opacity="0"
                transform="translate(44 6)"
              >
                <circle
                  className="cir-b"
                  id="oval2"
                  fill="#005da4"
                  cx="5"
                  cy="6"
                  r="2"
                />
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#00c0f3"
                  cx="2"
                  cy="2"
                  r="2"
                />
              </g>

              <g
                className="grp"
                id="grp5"
                opacity="0"
                transform="translate(14 50)"
              >
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#ffe06a"
                  cx="6"
                  cy="5"
                  r="2"
                />
                <circle
                  className="cir-b"
                  id="oval2"
                  fill="#6dc067"
                  cx="2"
                  cy="2"
                  r="2"
                />
              </g>

              <g
                className="grp"
                id="grp4"
                opacity="0"
                transform="translate(35 50)"
              >
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#005da4"
                  cx="6"
                  cy="5"
                  r="2"
                />
                <circle
                  className="cir-b"
                  id="oval2"
                  fill="#00c0f3"
                  cx="2"
                  cy="2"
                  r="2"
                />
              </g>

              <g
                className="grp"
                id="grp1"
                opacity="0"
                transform="translate(24)"
              >
                <circle
                  className="cir-a"
                  id="oval1"
                  fill="#ffe06a"
                  cx="2.5"
                  cy="3"
                  r="2"
                />
                <circle
                  className="cir-b"
                  id="oval2"
                  fill="#6dc067"
                  cx="7.5"
                  cy="2"
                  r="2"
                />
              </g>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
}
