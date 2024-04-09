"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGlobalState from "@/app/components/globalState/GlobalState";
import { urlServer } from "@/app/Utiles";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function BackButton() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const setUserState = useGlobalState((state) => state.setUser);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${urlServer}usuarios/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
      typeof window !== "undefined" && localStorage.removeItem("user");
      setUserState(false); // Cambia el estado del usuario a false
      router.push("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        className: "toastify-custom-error",
      });
    }
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        className="btn mb-3 btnn-primary"
        onClick={handleBackClick}
      >
        ATRAS
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Si regresas, se cerrará la sesión. ¿Deseas continuar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BackButton;
