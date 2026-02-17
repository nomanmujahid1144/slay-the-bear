'use client';

import { Inter } from "next/font/google";
import { useAuthStore } from '@/stores/useAuthStore';
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
import React, { useEffect } from "react";
import { ScrollToTop } from "./components/scroll-to-top";

import "./components/fontawesomeIcons";
import { DarkModeProvider, useDarkMode } from "./components/dark-mode/DarkModeContext";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { PostHogProvider } from "@/providers/ph-provider";

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
  const initialize = useAuthStore((state) => state.initialize);

  // Public routes where auth check is NOT needed
  const publicRoutes = [
    '/login',
    '/register',
    '/forget-password',
    '/verify-me',
    '/verifyemail',
    '/edit-password',
    '/auth/callback',
    '/pricing',
    '/purchase-success',
    '/news',
    '/support',
    '/terms-and-conditions',
    '/',
  ];

  // Check if current path is public or starts with /tools/
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/tools/') || pathname.startsWith('/tools');

  // Initialize auth ONLY on protected routes
  useEffect(() => {
    if (!isPublicRoute) {
      initialize();
    }
  }, [initialize, isPublicRoute]);

  // Define routes where Navbar/Footer hidden
  const hiddenRoutes = [
    '/login',
    '/register',
  ];
  const hideNavbarFooter = hiddenRoutes.includes(pathname);

  return (
    <html lang="en" tg-theme={isDarkMode ? 'dark' : 'light'}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8108715818808220" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <DarkMode />
        <ScrollToTop />
        <PostHogProvider>
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
        </PostHogProvider>
      </body>
    </html>
  );
}
