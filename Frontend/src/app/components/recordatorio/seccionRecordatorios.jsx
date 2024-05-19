import { useState, useEffect } from "react";
import { urlServer } from "@/app/Utiles.jsx";
import { useTranslation } from "react-i18next";

export default function SeccionRecordatorios( {activityId}) {
  console.log("activityId -> ", activityId);
  const [recordatorios, setRecordatorios] = useState([]);
  const { t } = useTranslation("actividades");
    useEffect(() => {
        fetchRecordatorios();
    }, []);

    const fetchRecordatorios = async () => {
        try {
          const id = activityId;
            const response = await fetch(`${urlServer}recordatorios/${id}`);
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
          <h5 className="card-title">{t("announcements: ")}</h5>
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
