import Script from 'next/script';
import React from 'react';

const AdSense = ({ pId }) => {
    return (
        <>
            <Script
                id="adsbygoogle-init"
                strategy="afterInteractive"
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
                crossOrigin="anonymous"
                onError={(e) => {
                    console.error('AdSense script failed to load', e);
                }}
            />
        </>
    );
};

export default AdSense;