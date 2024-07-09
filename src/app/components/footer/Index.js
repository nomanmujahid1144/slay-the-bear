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
];

const markets = [
    {name: 'Stocks', link: '#'},
    {name: 'Cryptocurrency', link: '#'},
    {name: 'Forex', link: '#'},
    {name: 'ETFs', link: '#'},
    {name: 'Mutual Funds', link: '#'},
]

export const Footer = () => {
    return (
        <div className="footer-area">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-7">
                            <div className="footer-widget">
                                <div className="fw-logo">
                                    <Link href={'/'}>
                                        <Image
                                            src={logo}
                                            alt="footer logo"
                                            width={170}
                                            height={100}
                                        />
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>
                                        Footer description here
                                    </p>
                                </div>
                            </div>    
                        </div>
                        <div className="col-lg-2 col-md-5 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Company</h4>
                                <div className="footer-link-wrap">
                                    <ul className="list-wrap">
                                        {companyPages.map((companyPage, index) => (
                                            <li key={index}>
                                                <Link href={companyPage.link}>{companyPage.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Markets</h4>
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
                        {/* <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Explore</h4>
                                <div className="footer-link-wrap">
                                <ul className="list-wrap">
                                    <li><a href="contact.html">The Shop</a></li>
                                    <li><a href="contact.html">Recipes</a></li>
                                    <li><a href="contact.html">Food</a></li>
                                    <li><a href="contact.html">Travel</a></li>
                                    <li><a href="contact.html">Hotline</a></li>
                                </ul>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">Follow us On</h4>
                                <div className="footer-link-wrap">
                                <ul className="list-wrap">
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
                <div className="footer-shape" data-background="assets/img/images/footer_shape.png" />
            </div>
            <div className="footer-bottom">
                <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <div className="footer-bottom-menu">
                        <ul className="list-wrap">
                        <li><a href="contact.html">Privacy Policy &amp; Terms</a></li>
                        <li><a href="contact.html">Site Credits</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="copyright-text">
                        <p>© 2024 All Rights Reserved</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}