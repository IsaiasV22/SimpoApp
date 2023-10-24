import { Inter } from "next/font/google";
//import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import dynamic from 'next/dynamic';
import "@/app/App.css";
import PWA from "@/app/components/PWA";
import Notificacion from "./components/Notificacion";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SimpoApp",
  description: "Generated by team 16",
  manifest: "/manifest.json",
  themeColor: "#00c0f3",
};

const Header = dynamic(() => import('@/app/components/Header'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*SW */}
        <PWA />    
        <Notificacion />
        <div style={{ fontFamily: "Trueno, sans-serif" }}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
