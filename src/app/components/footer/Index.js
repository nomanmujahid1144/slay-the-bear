import Image from "next/image";
import Link from "next/link";
import logo from '../../../../public/assets/img/logo/logo.png';

const companyPages = [
    { name: 'Home', link: '#' },
    { name: 'About Us', link: '#' },
    { name: 'Tool Section', link: '#' },
    { name: 'News Page', link: '#' },
    { name: 'Paid Tool', link: '#' },
    { name: 'Ads Free Version', link: '#' },
    { name: 'Support', link: '/support' },
];

const markets = [
    { name: 'Stocks', link: '#' },
    { name: 'Cryptocurrency', link: '#' },
    { name: 'Forex', link: '#' },
    { name: 'ETFs', link: '#' },
    { name: 'Mutual Funds', link: '#' },
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
                                                width={170}
                                                height={100}
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
                                            Footer description here

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
                                            <li><a href="#">facebook</a></li>
                                            <li><a href="#">Twitter</a></li>
                                            <li><a href="#">Instagram</a></li>
                                            <li><a href="#">Youtube</a></li>
                                            <li><a href="#">Pinterest</a></li>
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
                                    <p>© 2024 All Rights Reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}