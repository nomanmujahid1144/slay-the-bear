'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SlickSlider.css';
import type { ReactNode, CSSProperties } from "react";

interface ArrowProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => (
    <div
        className={className}
        style={{ ...style, display: "block", opacity: "0.9", borderRadius: '10%' }}
        onClick={onClick}
    />
);

const PrevArrow = ({ className, style, onClick }: ArrowProps) => (
    <div
        className={className}
        style={{ ...style, display: "block", zIndex: "1", opacity: "0.9", borderRadius: '10%' }}
        onClick={onClick}
    />
);

const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        { breakpoint: 1300, settings: { speed: 1000, slidesToShow: 3, slidesToScroll: 1, initialSlide: 0, variableWidth: false } },
        { breakpoint: 1024, settings: { speed: 1000, slidesToShow: 3, slidesToScroll: 1, initialSlide: 0, variableWidth: false } },
        { breakpoint: 800,  settings: { speed: 1000, slidesToShow: 2, slidesToScroll: 1, initialSlide: 0, variableWidth: false } },
        { breakpoint: 480,  settings: { speed: 1000, slidesToShow: 1, slidesToScroll: 1, initialSlide: 0, variableWidth: false } },
    ],
};

interface SlickSliderProps {
    children: ReactNode;
}

export const SlickSlider = ({ children }: SlickSliderProps) => {
    return (
        <Slider className="w-100" {...settings}>
            {children}
        </Slider>
    );
};