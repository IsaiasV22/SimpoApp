"use client";
import useGlobalState from "./globalState/GlobalState";
import { useEffect } from "react";
import { urlServer } from "../Utiles";

export default function Notificacion() {
  const suscribed = useGlobalState((state) => state.suscribed);
  const setSuscribed = useGlobalState((state) => state.setSuscribed);
  useEffect(() => {
    usePushNotifications(suscribed, setSuscribed);
  }, []);
  return <></>;
}

async function usePushNotifications(sus, setSus) {
  const suscribed = sus;
  const setSuscribed = setSus;

  const publicKey =
    "BIKroZH-Tg82nsN44yllJMxG9EC2xcp6J_d6o44Gi9JjMxV1o_glCf_Y3QFiYhg5TosPCfZHPkE1hu859cfQbsg";

  if ("Notification" in window && "serviceWorker" in navigator && !suscribed) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey,
        });

        // Envía la suscripción al backend
        await fetch(`${urlServer}pwa/suscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
          credentials: "include",
        });

        // Envía la suscripción al backend si es necesario.
        console.log("Suscripción exitosa:", subscription);

        // Actualiza el estado global para indicar que el usuario está suscrito
        setSuscribed(true);
      } else {
        console.warn("notifications denied");
      }
    } catch (error) {
      console.error("Error subscribing to push notifications", error);
    }
  }

  return suscribed;
}
