import { Banner } from "../components/ads/Banner";
import { Heading } from "../components/heading/Heading";
import { HotPicks } from "../components/home/hot-news/Index";
import { Market } from "../components/home/market/Index";

export default function Markets() {
    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <Heading 
                            textHeading="Stock Market"
                            showBtn={true}
                        />
                        <Heading 
                            textHeading="Cryptocurrency Market"
                            showBtn={true}
                        />
                        <Heading 
                            textHeading="Forex Market"
                            showBtn={true}
                        />
                        <Heading 
                            textHeading="ETFs"
                            showBtn={true}
                        />
                        <Heading 
                            textHeading="Mutual Funds"
                            showBtn={true}
                        />
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget-three">
                                <Heading
                                    textHeading={'Business'}
                                    showBtn={false}
                                />
                                <div className="hot-post-wrap">
                                    <div className="hot-post-item hot-post-item-two">
                                        <div className="hot-post-thumb">
                                            <a href="blog-details.html">
                                                <img src="assets/img/blog/nw_banner_post01.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div className="hot-post-content">
                                            <a href="blog.html" className="post-tag-four">
                                                Audit
                                            </a>
                                            <h4 className="post-title">
                                                <a href="blog-details.html">
                                                    Take a Look Back at the Moseret Gala Red Carpet Ever
                                                </a>
                                            </h4>
                                            <div className="blog-post-meta">
                                                <ul className="list-wrap">
                                                    <li>
                                                        <i className="flaticon-calendar" />
                                                        27 August, 2024
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hot-post-item hot-post-item-two">
                                        <div className="hot-post-content">
                                            <a href="blog.html" className="post-tag-four">
                                                Marketing
                                            </a>
                                            <h4 className="post-title">
                                                <a href="blog-details.html">
                                                    Take a Look Back at the Moseret Gala Red Carpet Ever
                                                </a>
                                            </h4>
                                            <div className="blog-post-meta">
                                                <ul className="list-wrap">
                                                    <li>
                                                        <i className="flaticon-calendar" />
                                                        27 August, 2024
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hot-post-item hot-post-item-two">
                                        <div className="hot-post-content">
                                            <a href="blog.html" className="post-tag-four">
                                                Marketing
                                            </a>
                                            <h4 className="post-title">
                                                <a href="blog-details.html">
                                                    Take a Look Back at the Moseret Gala Red Carpet Ever
                                                </a>
                                            </h4>
                                            <div className="blog-post-meta">
                                                <ul className="list-wrap">
                                                    <li>
                                                        <i className="flaticon-calendar" />
                                                        27 August, 2024
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <a href="#">
                                        <img src="assets/img/images/sidebar_img06.jpg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}