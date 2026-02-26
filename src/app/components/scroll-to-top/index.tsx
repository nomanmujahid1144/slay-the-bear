'use client'

import { useState, useEffect } from "react";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`scroll-top scroll-to-target ${isVisible ? 'open' : ''}`}
            data-target="html"
            onClick={scrollToTop}
        >
            <i className="fas fa-angle-up" />
        </button>
    );
};