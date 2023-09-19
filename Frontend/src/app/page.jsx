"use Client";
import Image from "next/image";
import styles from "./page.module.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="vh-100">
      <Header />
      <div className="wrapper-center">
        <Content />
        <Footer className="mt-auto" />
      </div>
    </div>
  );
}
