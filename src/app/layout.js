'use client';

import { Inter } from "next/font/google";
// CSS imports
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/magnific-popup.css";
import "../../public/assets/css/fontawesome-all.min.css";
import "../../public/assets/css/flaticon.css";
import "../../public/assets/css/slick.css";
import "../../public/assets/css/default.css";
import "../../public/assets/css/stylee.css";
import "../../public/assets/css/responsive.css";

import "./globals.css";
import { Footer } from "./components/footer/Index";
import { Navbar } from "./components/navbar/Index";
import { DarkMode } from "./components/dark-mode/Index";
import React from "react";
import { ScrollToTop } from "./components/scroll-to-top";

// Import FontAwesomeIcons
import "./components/fontawesomeIcons";
import { DarkModeProvider, useDarkMode } from "./components/dark-mode/DarkModeContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <DarkModeProvider>
      <DarkModeLayout>{children}</DarkModeLayout>
    </DarkModeProvider>
  );
}

function DarkModeLayout({ children }) {
  // Use `useDarkMode` inside a child component of `DarkModeProvider`
  const { isDarkMode } = useDarkMode();

  return (
    <html lang="en" tg-theme={isDarkMode ? 'dark' : 'light'}>
      <body className={inter.className}>
        <DarkMode />
        <ScrollToTop />
        <header>
          <Navbar />
        </header>
        <main>{React.cloneElement(children, { isDarkMode })}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
