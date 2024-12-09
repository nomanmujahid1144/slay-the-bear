import Link from "next/link"

export const Banner = () => {
    return (
        <div className="ad-banner-area pt-70 pb-70">
            <div className="container">
                <div className="ad-banner-img">
                    <Link href="#">
                        <img
                            src="assets/img/images/advertisement11.jpg"
                            alt=""
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}