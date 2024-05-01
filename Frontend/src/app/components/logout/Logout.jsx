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

  //translation hook
  const { t } = useTranslation(["common"]);

  //handleLogout que realiza un fetch a urlServer + usuarios/logout
  async function handleLogout() {
    try {
      const response = await fetch(`${urlServer}usuarios/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

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
