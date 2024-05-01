import { useState, useEffect } from "react";
import { urlServer } from "@/app/Utiles.jsx";
import { useTranslation } from "react-i18next";

export default function SeccionRecordatorios() {
  const [recordatorios, setRecordatorios] = useState([]);
  const { t } = useTranslation("actividades");
    useEffect(() => {
        fetchRecordatorios();
    }, []);

    const fetchRecordatorios = async () => {
        try {
            const response = await fetch(`${urlServer}recordatorios`);
            const data = await response.json();
            setRecordatorios(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

  return (
    <>
      {recordatorios.length > 0 && (
        <div style={{ "margin-top": "10px" }}>
          <h5 className="card-title">{t("Recordatorios: ")}</h5>
          <ul>
            {recordatorios.map((r) => (
              <li key={r.id}>
                {r.recordatorio}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
