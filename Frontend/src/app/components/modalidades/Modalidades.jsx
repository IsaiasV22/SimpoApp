import { Link } from "next/link";
import { useState } from "react";
import ActividadesFilter from "../actividades/Actividades";
export default function Modalidades({ talleres, elementId }) {
  const [talleresEstado, setTalleresEstado] = useState({});
  console.log("Talleres: ",talleres);
  const toggleActividades = (tallerId) => {
    setTalleresEstado((prevTalleresEstado) => ({
      ...prevTalleresEstado,
      [tallerId]: !prevTalleresEstado[tallerId],
    }));
  };
  const filterActividades = (actividad,taller) => {
    return actividad.PK_taller === taller ;
  }

  return (
    <div className="main-content">
      <div className="container my-5">
        <h1 className="mb-4">Modalities</h1>
        <div className="row">
          <div>
            {talleres ? (
              talleres.map((element) => (
                <div key={element.PK_taller} className={`col-12 mb-4`}>
                  {/* Utiliza el campo PK_actividad como clave única */}
                  <div className="card">
                    <div className="card-body position-relative d-flex bg-light w-100 justify-content-between ">
                      <h5 className="card-title">{element.descripcion}</h5>
                      <div className="d-flex">
                        <button
                          onClick={() => toggleActividades(element.PK_taller)}
                          className="btn btn-primary"
                        >
                          {talleresEstado[element.PK_taller]
                            ? "Ocultar actividades"
                            : "Ver actividades"}
                        </button>
                      </div>
                    </div>
                    {talleresEstado[element.PK_taller] && (
                      <ActividadesFilter elementId={elementId} filterFunction={(actividad)=>actividad.FK_taller == element.PK_taller}/>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                No hay Actividades para este simposio.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
