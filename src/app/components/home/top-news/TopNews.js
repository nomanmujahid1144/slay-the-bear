import { Banner } from "../../ads/Banner"
import { DateTime } from "../../post-creation/post-date-time/Index"
import { Heading } from "../../heading/Heading"
import { PostDescription } from "../../post-creation/post-description/Index"
import { PostTag } from "../../post-creation/post-tag/Index"
import { PostTitle } from "../../post-creation/post-title/Index"
import { HotPicks } from "../hot-news/Index"
import { Market } from "../market/Index";
import horizentalImage from '../../../../../public/assets/img/blog/cr_recent_post03.jpg';
import { SmallPostTitle } from "../../post-creation/post-title/SmallPostTitle"
import Link from "next/link"
import Image from "next/image"
import { Goto } from "../../Buttons/Goto"

const horizentalPosts = [
    {postTitle: 'Using Instagram Tawo Promote Your', postTag: 'CRYPTOCURRENCY', postDate: '27 AUGUST, 2024', postTime: '', postImage: horizentalImage},
    {postTitle: 'Using Instagram Tawo Promote Your', postTag: 'CRYPTOCURRENCY', postDate: '27 AUGUST, 2024', postTime: '', postImage: horizentalImage},
    {postTitle: 'Using Instagram Tawo Promote Your', postTag: 'CRYPTOCURRENCY', postDate: '27 AUGUST, 2024', postTime: '', postImage: horizentalImage}
]

export const TopNews = () => {
    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <Heading
                                    textHeading={'World Top News'}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                            <div className="top-news-post">
                                <div className="top-news-post-thumb">
                                <Link href="/">
                                    <img src="assets/img/blog/top_news_post01.jpg" alt="" />
                                </Link>
                                <a
                                    href="https://www.youtube.com/watch?v=G_AEL-Xo5l8"
                                    className="paly-btn popup-video"
                                >
                                    <i className="fas fa-play" />
                                </a>
                                </div>
                                <div className="top-news-post-content">
                                <PostTag 
                                    tagName={'Sports'}
                                />
                                <PostTitle 
                                    extras={'bold-underline'}
                                    heading={'How To Protect Your App With Threat Model Based On JSONDiff'}
                                />
                                <DateTime 
                                    date={'27 August, 2024'}
                                    time={'20 Mins'}
                                />
                                <PostDescription 
                                    description={`
                                        Browned butter and brown sugar caramelly oodness crispyedgesthick and 
                                        soft centers and melty little puddles of chocolate y first favorite.
                                        Browned butter brown sugar caramelly oodness.
                                    `}
                                />
                                <div className="view-all-btn">
                                    <Goto 
                                        buttonText={'Read More'}
                                        goTo={'/'}
                                    />
                                </div>
                                </div>
                            </div>
                            </div>
                            {horizentalPosts.map((horizentalPost, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="horizontal-post-four">
                                        <div className="horizontal-post-thumb-four">
                                            <Link href="#">
                                                <Image 
                                                    src={horizentalPost.postImage}
                                                    layout="responsive"
                                                    width={100}
                                                    height={150}
                                                    alt="no image" 
                                                />
                                            </Link>
                                        </div>
                                        <div className="horizontal-post-content-four">
                                            <PostTag 
                                                tagName={horizentalPost.postTag}
                                            />
                                            <SmallPostTitle 
                                                title={horizentalPost.postTitle}
                                            />
                                            <DateTime 
                                                date={horizentalPost.postDate}
                                                time={horizentalPost.postTime}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Banner />
                        <HotPicks />
                        <Market 
                            market="Markets"
                        />
                        <Banner />
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