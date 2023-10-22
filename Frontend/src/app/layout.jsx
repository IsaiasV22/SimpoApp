
import { Inter } from "next/font/google";
//import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import dynamic from "next/dynamic";
import "@/app/App.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SimpoApp",
  description: "Generated by team 16",
  manifest: "/manifest.json",
};

const Header = dynamic(() => import("@/app/components/Header"), {
  ssr: false,
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {/*No javascript case */}
        <noscript>Please enable javascript to run this app</noscript>
        <div style={{ fontFamily: "Trueno, sans-serif" }}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
