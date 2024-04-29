"use client";
import { useState, useEffect } from "react";
import Scheduler from "@/app/components/SchedulerAll/Scheduler";
import { urlServer } from "@/app/Utiles";
import styles from "@/app/App.css";

function App() {
  const [actividades, setActividades] = useState([]);

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hourNumber = parseInt(hours, 10);

    if (hourNumber === 0) return `12:${minutes}`;
    if (hourNumber < 12)
      return `${hourNumber.toString().padStart(2, "0")}:${minutes}`;
    return `${hourNumber}:${minutes}`;
  };

  const handlerEvents = async () => {
    try {
      const response = await fetch(`${urlServer}usuarios/calendarioUsuario`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      // Transformar la respuesta de la API al formato de events
      const transformedData = data.map((item, index) => ({
        id: `event-${item.PK_actividad}`,
        label: item.descripcion,
        groupLabel: item.FK_usuario,
        user: item.FK_usuario,
        color: "#00212a", // Puedes asignar un color dinámicamente si lo deseas
        startHour: convertTo12HourFormat(item.hora_inicio),
        endHour: convertTo12HourFormat(item.hora_final),
        date: new Date(item.dia_evento).toISOString().split("T")[0],
        createdAt: new Date(),
        createdBy: item.FK_usuario,
      }));

      setActividades(transformedData);
    } catch (error) {
      //FIXME: Mostrar error en pantalla con el tostify
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    handlerEvents();
    console.log("Actividades: ", actividades);
  }, []);

  const [state] = useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon", // or sun
      defaultMode: "day", // or week | day | timeline
      minWidth: 240,
      maxWidth: 240,
      minHeight: 240,
      maxHeight: 540,
    },
    alertProps: {
      /*open: true,
      color: "info", // info | success | warning | error
      severity: "info", // info | success | warning | error
      message: "Let's start with awesome react-mui-scheduler ",
      showActionButton: true,
      showNotification: true,
      delay: 1500,*/
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
    },
  });

  const handleCellClick = (event, row, day) => {
    // Do something...
  };

  const handleEventClick = (event, item) => {
    // Do something...
  };

  const handleEventsChange = (item) => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  };

  return (
    <div className="m-3 ">
      <h1>Calendario</h1>
      <Scheduler
        locale="en"
        events={actividades}
        legacyStyle={false}
        options={state?.options}
        alertProps={state?.alertProps}
        toolbarProps={state?.toolbarProps}
        onEventsChange={handleEventsChange}
        onCellClick={handleCellClick}
        onTaskClick={handleEventClick}
        onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
      />
    </div>
  );
}

export default App;
