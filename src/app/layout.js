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

import "./components/fontawesomeIcons";
import { DarkModeProvider, useDarkMode } from "./components/dark-mode/DarkModeContext";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import AdSense from "./components/ads/AdSense";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <DarkModeProvider>
      <DarkModeLayout>{children}</DarkModeLayout>
    </DarkModeProvider>
  );
}

function DarkModeLayout({ children }) {
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();

  // Define the routes where Navbar and Footer should not be displayed
  const hiddenRoutes = ['/login', '/auth/callback'];
  const hideNavbarFooter = hiddenRoutes.includes(pathname);

  return (
    <html lang="en" tg-theme={isDarkMode ? 'dark' : 'light'}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8108715818808220" />
        {/* <AdSense
          pId={`ca-pub-8108715818808220`}
        /> */}
      </head>
      <body className={inter.className}>
        <DarkMode />
        <ScrollToTop />
        {!hideNavbarFooter && (
          <header>
            <Navbar />
          </header>
        )}
        <main>{React.cloneElement(children, { isDarkMode })}</main>
        <Toaster />
        {!hideNavbarFooter && (
          <footer>
            <Footer />
          </footer>
        )}
      </body>
    </html>
  );
}
