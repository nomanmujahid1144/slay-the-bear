import Image from "next/image";
import Link from "next/link";
import logo from '../../../../public/assets/img/logo/logo.png';

const companyPages = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '#' },
    { name: 'News Page', link: '/news' },
    { name: 'Tool Section', link: '/tools' },
    { name: 'Paid Tool', link: '/paid-tools' },
    { name: 'Ads Free Version', link: '/pricing' },
    { name: 'Support', link: '/support' },
];

const markets = [
    { name: 'Stocks', link: '/markets/stocks' },
    { name: 'Cryptocurrency', link: '/markets/cryptocurrency' },
    { name: 'Forex', link: '/markets/forex' },
    { name: 'ETFs', link: '/markets/etfs' },
    { name: 'Mutual Funds', link: '/markets/mutual-funds' },
]

export const Footer = () => {
    return (
        <>
            <div class="footer-area-four">
                <div class="footer-top footer-top-three">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-md-7">
                                <div class="footer-widget">
                                    <div class="fw-logo">
                                        <Link href={'/'} className="w-fit flex flex-col items-center justify-center">
                                            <Image
                                                src={logo}
                                                alt="footer logo"
                                                width={100}
                                                height={90}
                                            />
                                            <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                                        </Link>
                                    </div>
                                    <div class="fw-logo d-none">
                                        <Link href={'/'}>
                                            <Image
                                                src={logo}
                                                alt="footer logo"
                                                width={170}
                                                height={100}
                                            />
                                        </Link>
                                    </div>
                                    <div class="footer-content">
                                        <p>
                                            Providing the tools and knowledge to succeed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-5 col-sm-6">
                                <div class="footer-widget">
                                    <h4 class="fw-title">Company</h4>
                                    <div class="footer-link-wrap">
                                        <ul class="list-wrap">
                                            {companyPages.map((companyPage, index) => (
                                                <li key={index}>
                                                    <Link href={companyPage.link}>{companyPage.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6">
                                <div class="footer-widget">
                                    <h4 class="fw-title">Get Help</h4>
                                    <div class="footer-link-wrap">
                                        <ul class="list-wrap">
                                            {markets.map((market, index) => (
                                                <li key={index}>
                                                    <Link href={market.link}>{market.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="footer-widget">
                                    <h4 class="fw-title">Explore</h4>
                                    <div class="footer-link-wrap">
                                        <ul class="list-wrap">
                                            <li><a href="contact.html">The Shop</a></li>
                                            <li><a href="contact.html">Recipes</a></li>
                                            <li><a href="contact.html">Food</a></li>
                                            <li><a href="contact.html">Travel</a></li>
                                            <li><a href="contact.html">Hotline</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="footer-widget">
                                    <h4 class="fw-title">Follow us On</h4>
                                    <div class="footer-link-wrap">
                                        <ul class="list-wrap">
                                            <li><a target="_blank" href="https://www.facebook.com/SlayTheBearApp">facebook</a></li>
                                            <li><a target="_blank" href="https://twitter.com/slaythebearapp">Twitter</a></li>
                                            <li><a target="_blank" href="https://www.instagram.com/slaythebear/">Instagram</a></li>
                                            <li><a target="_blank" href="https://www.linkedin.com/company/slaythebear">LinkedIn</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom footer-bottom-three">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="footer-bottom-menu">
                                    <ul class="list-wrap">
                                        <li>
                                            <Link href="/terms-and-conditions">
                                                Terms and conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="copyright-text">
                                    <p>© {new Date().getFullYear()} All Rights Reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}