import Image from "next/image";
import Link from "next/link";
import logo from '../../../../public/assets/img/logo/logo.png';

interface NavLink {
    name: string;
    link: string;
}

const companyPages: NavLink[] = [
    { name: 'Home',           link: '/' },
    { name: 'About Us',       link: '#' },
    { name: 'News Page',      link: '/news' },
    { name: 'Tool Section',   link: '/tools' },
    { name: 'Premium Tools',  link: '/premium-tools' },
    { name: 'Ads Free Version', link: '/pricing' },
    { name: 'Support',        link: '/support' },
];

const markets: NavLink[] = [
    { name: 'Stocks',        link: '/markets/stocks' },
    { name: 'Cryptocurrency', link: '/markets/cryptocurrency' },
    { name: 'Forex',         link: '/markets/forex' },
    { name: 'ETFs',          link: '/markets/etfs' },
    { name: 'Mutual Funds',  link: '/markets/mutual-funds' },
];

const socials = [
    { name: 'Facebook',  href: 'https://www.facebook.com/SlayTheBearApp' },
    { name: 'Twitter',   href: 'https://twitter.com/slaythebearapp' },
    { name: 'Instagram', href: 'https://www.instagram.com/slaythebear/' },
    { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/slaythebear' },
];

export const Footer = () => {
    return (
        <div className="footer-area-four">
            <div className="footer-top footer-top-three">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-7">
                            <div className="footer-widget">
                                <div className="fw-logo">
                                    <Link href="/" className="w-fit flex flex-col items-center justify-center">
                                        <Image src={logo} alt="footer logo" width={100} height={90} />
                                        <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>Providing the tools and knowledge to succeed.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-5 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Company</h4>
                                <div className="footer-link-wrap">
                                    <ul className="list-wrap">
                                        {companyPages.map((page, index) => (
                                            <li key={index}>
                                                <Link href={page.link}>{page.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Get Help</h4>
                                <div className="footer-link-wrap">
                                    <ul className="list-wrap">
                                        {markets.map((market, index) => (
                                            <li key={index}>
                                                <Link href={market.link}>{market.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Follow us On</h4>
                                <div className="footer-link-wrap">
                                    <ul className="list-wrap">
                                        {socials.map((social, index) => (
                                            <li key={index}>
                                                <a
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {social.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
    );
};