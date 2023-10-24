"use client";
import useGlobalState from "./globalState/GlobalState";

export default function Notificacion() {
  const suscribed = useGlobalState((state) => state.suscribed);
  const setSuscribed = useGlobalState((state) => state.setSuscribed);
  return (
    <div>
      <button onClick={() => handleNotification(suscribed, setSuscribed)}>
        Get Notification
      </button>
    </div>
  );
}

const handleNotification = (sus, setSus) => {
  sus ? console.log("ya esta suscrito") : console.log("no esta suscrito");
  console.log("clicked");
};
