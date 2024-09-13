import { Banner } from "../components/ads/Banner";
import { Heading } from "../components/heading/Heading";
import { DateTime } from "../components/post-creation/post-date-time/Index";
import { PostTag } from "../components/post-creation/post-tag/Index";
import { PostTitle } from "../components/post-creation/post-title/Index";
import crypoImage from '../../../public/assets/img/blog/cr_recent_post02.jpg'
import Link from "next/link";
import Image from "next/image";
import { NewsTabs } from "../components/news-page/Index";

export default function NewsPage() {
    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sports-post-wrap">
                            <Heading
                                textHeading={'World Top News'}
                            />
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="sports-post">
                                        <div className="sports-post-thumb">
                                            <Link href="/">
                                                <Image
                                                    src="/assets/img/blog/sports_post01.jpg"
                                                    alt="Sports News"
                                                    width={400}  // adjust dimensions as necessary
                                                    height={300}
                                                    layout="responsive"
                                                />
                                            </Link>
                                        </div>
                                        <div className="sports-post-content">
                                            <PostTag
                                                tagName={'Cryptocurrency'}
                                            />
                                            <PostTitle
                                                extras={'bold-underline'}
                                                heading={'Warns Financial Institutions To Be On Watch For Russian'}
                                                headingLink={'#'}
                                            />
                                            <DateTime
                                                date={'27 AUGUST, 2024'}
                                                time={''}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="sidebar-wrap sidebar-wrap-four">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className="horizontal-post-four horizontal-post-five">
                                                <div className="horizontal-post-thumb-four">
                                                    <Link href="#">
                                                        <Image
                                                            src={crypoImage}
                                                            alt="no image"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="horizontal-post-content-four">
                                                    <PostTag
                                                        tagName={'Forex'}
                                                    />
                                                    <PostTitle
                                                        heading={'The Game Changing Ar Roadeily Breakfast'}
                                                        headingLink={'#'}
                                                    />
                                                    <DateTime
                                                        date={'27 AUGUST, 2024'}
                                                        time={''}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner />
                        <NewsTabs />
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget-three">
                                <Heading
                                    textHeading={'Business'}
                                />
                                <div className="hot-post-wrap">
                                    <div className="hot-post-item hot-post-item-two">
                                        <div className="hot-post-thumb">
                                            <a href="/">
                                                <img src="assets/img/blog/nw_banner_post01.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div className="hot-post-content">
                                            <a href="/" className="post-tag-four">
                                                Audit
                                            </a>
                                            <h4 className="post-title">
                                                <a href="/">
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
                                            <a href="/" className="post-tag-four">
                                                Marketing
                                            </a>
                                            <h4 className="post-title">
                                                <a href="/">
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
                                            <a href="/" className="post-tag-four">
                                                Marketing
                                            </a>
                                            <h4 className="post-title">
                                                <a href="/">
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