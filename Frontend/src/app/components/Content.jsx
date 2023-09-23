"use client";
import React from "react";
import Login from "./login/Login.jsx";
import Link from "next/link";

const Content = () => {
  //parte para js

  //return

  return (
    <div
      className="d-flex justify-content-center align-items-center"
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