"use client";
import { useEffect } from "react";
import useGlobalState from "@/app/components/globalState/GlobalState";

export default function Notificacion () {
  const { suscribed, handlePushSubscription } = usePushNotifications();

  useEffect(() => {
    handlePushSubscription();
  }, [suscribed, handlePushSubscription]); // Asegúrate de incluir suscribed y handlePushSubscription en las dependencias

  return (
    <div>
      {!suscribed && (
        <button onClick={handlePushSubscription}>
          Suscribirse a Notificaciones
        </button>
      )}
    </div>
  );
}
function usePushNotifications() {
  const suscribed = useGlobalState((state) => state.suscribed);
  const setSuscribed = useGlobalState((state) => state.setSuscribed);

  const publicKey =
    "BIKroZH-Tg82nsN44yllJMxG9EC2xcp6J_d6o44Gi9JjMxV1o_glCf_Y3QFiYhg5TosPCfZHPkE1hu859cfQbsg";

  const handlePushSubscription = async () => {
    if (
      "Notification" in window &&
      "serviceWorker" in navigator &&
      !suscribed
    ) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey,
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
  };

  return { suscribed, handlePushSubscription };
}
