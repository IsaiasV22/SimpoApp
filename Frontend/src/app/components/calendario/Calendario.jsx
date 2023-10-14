"use client";
import { useState, useEffect } from "react";
import Scheduler from "@/app/components/SchedulerAll/Scheduler";
import { urlServer } from "@/app/Utiles";

function App() {
  const [actividades, setActividades] = useState([]);

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hourNumber = parseInt(hours, 10);
  
    if (hourNumber === 0) return `12:${minutes} am`;
    if (hourNumber < 12) return `${hourNumber.toString().padStart(2, "0")}:${minutes} am`;
    return `${hourNumber}:${minutes} pm`;
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
        color: "#00c0f3", // Puedes asignar un color dinámicamente si lo deseas
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

  const events = [
    {
      id: "event-1",
      label: "Medical consultation",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "04:00 AM",
      endHour: "05:00 AM",
      date: "2023-10-05",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-2",
      label: "Medical consultation",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startHour: "09:00 AM",
      endHour: "10:00 AM",
      date: "2022-05-09",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-3",
      label: "Medical consultation",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startHour: "13 PM",
      endHour: "14 PM",
      date: "2022-05-10",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-4",
      label: "Consultation prénatale",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "08:00 AM",
      endHour: "09:00 AM",
      date: "2022-05-11",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
  ];

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
