'use client'


import { Inter } from "next/font/google";
// CSS
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/magnific-popup.css";
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
import React, { useState } from "react";
import { ScrollToTop } from "./components/scroll-to-top";

// Import FontAwsomeIcons
import "./components/fontawesomeIcons";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeSiteMode = () => {
    setIsDarkMode(prevState => !prevState);
  };
  

  return (
    <html lang="en" tg-theme={isDarkMode ? 'dark' : 'light'}>
      <body className={inter.className}>
        <DarkMode handleSiteMode={changeSiteMode} />
        <ScrollToTop />
        <header>
          <Navbar />
        </header>
        <main>
          {React.cloneElement(children, { isDarkMode })}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
