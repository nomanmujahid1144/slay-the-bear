"use client";

import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {

    // useEffect(() => {
    //     try {
    //         (window.adsbygoogle = window.adsbygoogle || []).push({});
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);

    return (
        <>
            <head>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </head>
            <ins
                className="adsbygoogle w-full h-auto"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8108715818808220"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            ></ins>
        </>
    );
};

export default AdBanner;