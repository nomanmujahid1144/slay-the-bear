import Image from "next/image";
import slideBarImage from '../../../../public/assets/img/images/sidebar_img06.jpg';
import { useTradingViewWidgets } from "@/app/hooks/useTradingViewWidgets";

export const CalculatorSidebar = () => {

    useTradingViewWidgets();

    return (
        <div className="col-xl-3 col-lg-8">
            <div className="sidebar-wrap-three">
                <div className="h-[36rem] w-full" id="tradingview-widget-market-stocks-overview">
                    <div className="tradingview-widget-market-stocks-overview h-full w-full"></div>
                </div>
                <hr className="my-3" />
                <div className="sidebar-widget sidebar-widget-two">
                    <div className="sidebar-img">
                        <a href="#">
                            <Image
                                src={slideBarImage}
                                alt="no image found"
                                className="w-full h-auto"
                                unoptimized
                            />
                        </a>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="h-[34rem] w-full" id="tradingview-widget-market-stocks-news">
                    <div className="tradingview-widget-market-stocks-news h-full w-full"></div>
                </div>
            </div>
        </div>
    );
};