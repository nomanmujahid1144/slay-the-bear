// src/app/(public)/(auth)/layout.tsx

import Link from "next/link";
import Image from "next/image";
import logoImage from '../../../../public/assets/img/logo/logo.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="header-style-six">
                <div id="header-fixed-height" />
                <div className="header-logo-area-four">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <Link href="/" className="w-fit flex flex-col items-center justify-center">
                                    <Image src={logoImage} alt="logo" width={80} height={70} />
                                    <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <div className="footer-area-four">
                <div className="footer-bottom footer-bottom-three">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="footer-bottom-menu">
                                    <ul className="list-wrap">
                                        <li>
                                            <Link href="/terms-and-conditions">Terms and conditions</Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">Privacy Policy</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="copyright-text">
                                    <p>© {new Date().getFullYear()} All Rights Reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}