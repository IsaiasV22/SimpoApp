"use client";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "@/app/components/login/Login";


export default function Home() {
  return (
    <div>
      <div className="main-content">
        <Login />
      </div>
    </div>
  );
}
