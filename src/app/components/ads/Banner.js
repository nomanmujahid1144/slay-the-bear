// import Image from "next/image"
// import Link from "next/link"
// import advImage from '../../../../public/assets/img/images/advertisement11.jpg';
import AdBanner from "./AdBanner";

export const Banner = () => {
    return (
        <div className="ad-banner-area pt-70 pb-70">
            <div className="container">
                <div className="ad-banner-img bg-black">
                    <AdBanner 
                        dataAdFormat={'auto'} 
                        dataFullWidthResponsive={true}
                        dataAdSlot={'7915411789'}
                    />
                    {/* <Link href="#">
                        <Image
                            src={advImage}
                            alt="no-advertisement image"
                            className="w-full h-auto"
                            width={100}
                            height={100}
                            unoptimized
                        />
                    </Link> */}
                </div>
            </div>
        </div>
    )
}