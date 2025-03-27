import Script from 'next/script';
import React from 'react';

const AdSense = ({ pId }) => {
    return (
        <>
            <Script
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
                crossOrigin='anonymous'
                strategy='afterInteractive'
            />
            {/* <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8108715818808220"
                crossOrigin="anonymous">
            </Script> */}
        </>
    )
}

export default AdSense;