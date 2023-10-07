import { Inter } from "next/font/google";
//import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Header = dynamic(() => import('@/app/components/Header'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ fontFamily: "Trueno, sans-serif" }}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
