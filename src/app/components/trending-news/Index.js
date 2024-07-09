import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/autoplay'; // Import Swiper styles


export const TrendingNews = () => {
    
    const news = [
        {newsHeading: 'Here area brands and designers to look out for next year 2023', newsLink: '#'},
        {newsHeading: 'Here area brands and designers to look out for next year 2023', newsLink: '#'},
        {newsHeading: 'Here area brands and designers to look out for next year 2023', newsLink: '#'},
        {newsHeading: 'Here area brands and designers to look out for next year 2023', newsLink: '#'},
        {newsHeading: 'Here area brands and designers to look out for next year 2023', newsLink: '#'},
        {newsHeading: 'Here area brands and designers to look out for next year 2023', newsLink: '#'}
    ]

    return (
        <>
            <div className="header-top-wrap-four">
                <div className="container">
                <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="header-top-left-four">
                                <div className="trending-box">
                                    <div className="icon">
                                        <img src="assets/img/icon/trending_icon.svg" alt="" />
                                    </div>
                                    <span>Trending</span>
                                    <div className="shape">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 122 36"
                                        preserveAspectRatio="none"
                                        fill="none"
                                    >
                                        <path
                                            d="M0 18C0 8.05888 8.05887 0 18 0H110L121.26 16.8906C121.708 17.5624 121.708 18.4376 121.26 19.1094L110 36H18C8.05888 36 0 27.9411 0 18Z"
                                            fill="url(#trending_shape)"
                                        />
                                            <defs>
                                                <linearGradient
                                                    id="trending_shape"
                                                    x1={12}
                                                    y1={36}
                                                    x2={132}
                                                    y2={36}
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop offset={0} stopColor="#3F6088" />
                                                    <stop offset={1} stopColor="#2A4970" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div className="swiper-container ta-trending-slider">
                                    <Swiper
                                        direction="vertical"
                                        slidesPerView={1}
                                        spaceBetween={0}
                                        loop={true}
                                        modules={[Autoplay]}
                                        autoplay={{
                                            delay: 3000, // Adjust autoplay delay as needed
                                            disableOnInteraction: false,
                                        }}
                                        className="swiper-wrapper"
                                    >
                                        {news.map((item, index) => (
                                            <SwiperSlide key={index} className="swiper-slide" style={{ height: '40px' }}>
                                                <div className="trending-content">
                                                    <a href={item.newsLink}>{item.newsHeading}</a>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="header-top-social header-top-social-two">
                                <h5 className="title">Follow Us:</h5>
                                <ul className="list-wrap">
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}