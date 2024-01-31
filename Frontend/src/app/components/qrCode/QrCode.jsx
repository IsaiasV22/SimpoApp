"use client";

import React, { useState } from 'react';
import QRCode from 'qrcode.react';

import useGlobalState from "../globalState/GlobalState";

export default function AttendanceQR() {

    const [user, setUser] = useState(
        {
        userId: "Juan Pérez",
        activityId: "3"
    }
    );

    const generateQRText = () => {
        // Convert user information to a text string
        return JSON.stringify(user);
    };

    console.log("Este es el global state user", useGlobalState.userId);

    return (
        <>
        <h5 className="card-title"> Attendance QR </h5>
            {
                <div>{generateQRText()}</div> && 
                <div className="container my-3"><QRCode value={generateQRText()} /></div>
            }
        </>
    );
}