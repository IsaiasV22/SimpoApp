import React from "react";
import "./Login.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
//import Link
import Link from "next/link";



export default function Login({ count }) {
  return (
    <div>
      <Link href="/">
        <button>ATRAS</button>
      </Link>
      <Link href="../../simposios">
        <button>SIMPOSIOS</button>
      </Link>
      <Link href="/">
        <button>SIMPOSIO</button>
      </Link>
      <Link href="/">
        <button>ACTIVIDADES</button>
      </Link>
      <Link href="/">
        <button>ACTIVIDAD</button>
      </Link>
      <Link href="/">
        <button>PONENTE</button>
      </Link>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}

          {/* Icon */}
          <div className="fadeIn first">
            <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="User Icon"
            />
          </div>

          {/* Login Form */}
          <form>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="login"
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          {/* Remind Password */}
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
