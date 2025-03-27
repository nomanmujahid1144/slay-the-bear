"use client";

import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {

    useEffect(() => {

        const scriptElement = document.querySelector(
            `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8108715818808220"]`
        )

        const handleScriptLoad = () => {
            try {
                if(window.adsbygoogle){
                    console.log('Pushing Ads')
                    adsbygoogle.push({});
                }else{
                    scriptElement.addEventListener('load', handleScriptLoad)
                    console.log('Waiting until adsense lib is loaded')
                }
            } catch (err) {
                console.error("Err in Adsense " + err);
            }
        }

        handleScriptLoad();

        return() => {
            if(scriptElement){
                scriptElement.removeEventListener("load", handleScriptLoad);
            }
        }

    }, []);

    return (
        <>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8108715818808220"
                data-ad-slot={'7915411789'}
                data-ad-format={'auto'}
                data-full-width-responsive={'true'}
            ></ins>
        </>
    );
};

export default AdBanner;