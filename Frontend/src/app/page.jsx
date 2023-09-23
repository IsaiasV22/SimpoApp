"use client";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="content">
        <Content/>
      </div>
      <Footer />
    </div>
  );
}
