"use client";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <div className="row">
          {/* Dirección */}
          <div className="col-md-3">
            <section className="mb-4">
              <h5>Dirección</h5>
              <br />
              <p>
                <a
                  className="link-footer"
                  href="https://www.google.co.cr/maps/place/UCR,+Centro+de+Investigaci%C3%B3n+en+Matem%C3%A1tica+Pura+y+Aplicada+(CIMPA)/@9.93902,-84.0437917,18z/data=!4m6!3m5!1s0x8fa0e475eebadebf:0x1007763c59d9f91e!8m2!3d9.9393195!4d-84.042161!16s%2Fg%2F11b6glk9lj?hl=es-419&entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-geo-alt"></i>
                  Costa Rica, San José, Montes de Oca, Ciudad de la
                  Investigación, 100m N del Colegio Monterrey
                </a>
              </p>
              <p>
                <i className="bi bi-telephone"></i> (506) 2511-3419 / 2511-6606
              </p>
              <p>
                <i className="bi bi-envelope"></i> cimpa@ucr.ac.cr
              </p>
            </section>
          </div>

          {/* Servicios del CIMPA */}
          <div className="col-md-3">
            <section className="mb-4">
              <h5>Actividades</h5>
              <br />
              <p>
                <a
                  className="link-footer"
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/simmac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SIMMAC
                </a>
              </p>
              <p>
                <a
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/emalca"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EMALCA
                </a>
              </p>
              <p>
                <a
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/ifcs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IFCS
                </a>
              </p>
              <p>
                <a
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/jornadas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jornadas de Álgebra
                </a>
              </p>
              <p>
                <a
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/seminarios-de-investigacion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Seminarios de Investigación
                </a>
              </p>
              <p>
                <a
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/cafes-matematicos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cafés Matemáticos
                </a>
              </p>
              <p>
                <a
                  href="https://www.cimpa.ucr.ac.cr/index.php/actividades/calendario-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Calendario
                </a>
              </p>
            </section>
          </div>

          {/* Enlaces de Interés */}
          <div className="col-md-3">
            <section className="mb-4">
              <h5>Enlaces de Interés</h5>
              <br />
              <p>
                <a
                  href="https://vinv.ucr.ac.cr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vicerrectoría de Investigación
                </a>
              </p>
              <p>
                <a
                  href="http://www.emate.ucr.ac.cr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escuela de Matemática
                </a>
              </p>
              <p>
                <a
                  href="http://www.estadistica.ucr.ac.cr/index.php/es/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escuela de Estadística
                </a>
              </p>
              {/* ... puedes continuar agregando más enlaces aquí */}
            </section>
          </div>

          {/* Redes Sociales */}
          <div className="col-md-3">
            <section className="mb-4">
              <h5>Redes sociales</h5>
              <br />
              {/* ... (código de los íconos de redes sociales) */}
              <a
                href="https://es-la.facebook.com/CIMPA.UniversidadCostaRica/"
                className="btn btn-outline-light m-1"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i> {/* Ícono de Facebook */}
              </a>

              <a
                href="https://www.instagram.com/cimpaucr/"
                className="btn btn-outline-light m-1"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i> {/* Ícono de Instagram */}
              </a>

              <a
                href="https://twitter.com/CimpaUcr"
                className="btn btn-outline-light m-1"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter"></i> {/* Ícono de Twitter */}
              </a>

              <a
                href="https://www.youtube.com/channel/UCzErFlxkACpOo5iXhepQOMg"
                className="btn btn-outline-light m-1"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-youtube"></i> {/* Ícono de YouTube */}
              </a>
            </section>
          </div>
        </div>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright: CIMPA
      </div>
    </footer>
  );
};

export default Footer;
