"use client";
import React from "react";
import { urlServer } from "@/app/Utiles";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useGlobalState from "@/app/components/globalState/GlobalState";
//translation hook
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
  const router = useRouter();
  const setUserState = useGlobalState((state) => state.setUser);
  const setUserRol = useGlobalState((state) => state.setRol);
  // global state subscription
  const setSuscribed = useGlobalState((state) => state.setSuscribed);
  const suscribeState = useGlobalState((state) => state.suscribed);

  //translation hook
  const { t } = useTranslation(["common"]);

  //handleLogout que realiza un fetch a urlServer + usuarios/logout
  async function handleLogout() {
    //delete subscription
    console.log("trying to delete subscription");
    try{
    await deleteSubscription();
    console.log("subscription deleted");
    }catch (error) {
      console.error("Error deleting subscription", error);
      toast.error(t("Error deleting subscription"));
    }
    
    try {
      const response = await fetch(`${urlServer}usuarios/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
      console.log("Sesión cerrada");  
      setUserState(false); // Cambia el estado del usuario a false
      setUserRol(0); // Cambia el rol del usuario a 0
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        className: "toastify-custom-error",
      });
    }
  }

  const deleteSubscription = async () => {
    //check if user is subscribed
    const subscription = await navigator.serviceWorker.ready.then((registration) => {
      return registration.pushManager.getSubscription();
    });

     if (subscription) {
      try{
      //unsubscribe from service worker
      await subscription.unsubscribe();
      //set permission to false
      //Notification.reset();
      //delete subscription from global state
      setSuscribed(false);
      console.log("Unsubscribed from service worker");
      console.log("trying to delete subscription from db");
      await fetch(`${urlServer}pwa/unsubscribe`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
    });
    console.log("subscription deleted from db");
     
    } catch (error) {
      console.error("Error unsubscribing from service worker", error);
      toast.error("Error unsubscribing from service worker");
    }
    } 
  }


  return (
    <>
      <button
        className="nav-link btn btn-link text-danger"
        onClick={handleLogout}
      >
        {t("Logout")}
      </button>
    </>
  );
};

export default LogoutButton;
