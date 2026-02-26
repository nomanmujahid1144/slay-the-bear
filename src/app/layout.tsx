// src/app/layout.tsx

'use client';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { Inter } from 'next/font/google';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { DarkModeProvider, useDarkMode } from './components/dark-mode/DarkModeContext';
import { PostHogProvider } from '@/providers/ph-provider';
import { AppToaster } from './components/sonner';
import { Navbar } from './components/navbar/Index';
import { Footer } from './components/footer/Index';
import { DarkMode } from './components/dark-mode/Index';
import { ScrollToTop } from './components/scroll-to-top';
import './components/fontawesomeIcons';

// CSS
import '../../public/assets/css/bootstrap.min.css';
import '../../public/assets/css/animate.min.css';
import '../../public/assets/css/magnific-popup.css';
import '../../public/assets/css/fontawesome-all.min.css';
import '../../public/assets/css/flaticon.css';
import '../../public/assets/css/slick.css';
import '../../public/assets/css/default.css';
import '../../public/assets/css/stylee.css';
import '../../public/assets/css/responsive.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Auth pages — hide Navbar/Footer AND skip initialize() on these
const AUTH_ROUTES = [
    '/login',
    '/register',
    '/forget-password',
    '/verify-me',
    '/verifyemail',
    '/edit-password',
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <DarkModeLayout>{children}</DarkModeLayout>
        </DarkModeProvider>
    );
}

function DarkModeLayout({ children }: { children: React.ReactNode }) {
    const { isDarkMode } = useDarkMode();
    const pathname = usePathname();
    const initialize = useAuthStore((state) => state.initialize);

    // Ref prevents initialize() from running more than once per session
    const initialized = useRef(false);

    const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    useEffect(() => {
        // Skip on auth pages — user is not logged in there
        // Skip if already initialized — prevents re-running on route changes
        if (isAuthPage || initialized.current) return;

        initialized.current = true;
        initialize();
    }, [initialize, isAuthPage]);

    return (
        <html lang="en" tg-theme={isDarkMode ? 'dark' : 'light'}>
            <head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8108715818808220"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={inter.className}>
                <DarkMode />
                <ScrollToTop />
                <PostHogProvider>
                    {!isAuthPage && (
                        <header>
                            <Navbar />
                        </header>
                    )}
                    <main>{children}</main>
                    <AppToaster />
                    {!isAuthPage && (
                        <footer>
                            <Footer />
                        </footer>
                    )}
                </PostHogProvider>
            </body>
        </html>
    );
}