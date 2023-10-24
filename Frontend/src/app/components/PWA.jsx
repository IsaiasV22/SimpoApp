"use client";
import { useEffect } from "react";
import useGlobalState from "@/app/components/globalState/GlobalState";
import { urlServer } from "../Utiles";

export default function PWA() {
  const suscribed = useGlobalState((state) => state.suscribed);
  const setSuscribed = useGlobalState((state) => state.setSuscribed);
  useEffect(() => {
    //checkSWUpdate();
    registerServiceWorker();
    //usePushNotifications(suscribed, setSuscribed);
  }, []);

  return <></>;
}

//check if sw update is available else register sw
const checkSWUpdate = async () => {
  "serviceWorker" in navigator && typeof window !== "undefined"
    ? await navigator.serviceWorker
        .getRegistration()
        .then((reg) => {
          reg && reg.waiting
            ? updateWorker(reg.waiting)
            : registerServiceWorker();
        })
        .catch((err) => {
          console.warn("service worker registration failed", err.message);
        })
    : null;
};

//register sw
const registerServiceWorker = async () => {
  "serviceWorker" in navigator && typeof window !== "undefined"
    ? await navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("service worker registration successful");
        })
        .catch((err) => {
          console.warn("service worker registration failed", err.message);
        })
    : null;
};

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
        console.warn("Permiso para notificaciones denegado.");
      }
    } catch (error) {
      console.error("Error al suscribirse a las notificaciones push:", error);
    }
  }

  return suscribed;
}

//
