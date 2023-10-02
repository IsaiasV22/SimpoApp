"use client";
import React from "react";

const LogoutButton = ({ handleLogout }) => {
  return (
    <li className="nav-item">
      <button
        className="nav-link btn btn-link text-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  );
};

export default LogoutButton;


