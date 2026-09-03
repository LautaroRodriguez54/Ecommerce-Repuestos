import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import {NavBar} from "../components/navBar/NavBar";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Altamira Group S.A.",
  description: "Altamira Group S.A. es una empresa dedicada a la importación y distribución de repuestos automotrices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body>
        <header>
          <NavBar />
        </header>
        <main>
          {children}
        </main>
        <footer>
          
        </footer>
      </body>
    </html>
  );
}
