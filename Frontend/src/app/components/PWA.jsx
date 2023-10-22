"use client";
import { useEffect} from "react";

export default function PWA() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => {
            console.log("service worker registration successful", reg);
            })
            .catch((err) => {
            console.warn("service worker registration failed", err.message);
            });
        }
    }, []);
    
    return <></>;
    }