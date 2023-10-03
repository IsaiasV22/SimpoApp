"use client";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/App.css";

const Content = ({onLogged}) => {
  //parte para js
  //return

  return (
    <div
      className="d-flex justify-content-center align-items-center main-content"
      style={{ height: "40vh" }}
    >
      <Link href="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
    </div>
  );
};
//export default Header;
export default Content;