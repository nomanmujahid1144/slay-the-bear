'use client'

import { PostDescription } from "../components/post-creation/post-description/Index";
import { PostTitle } from "../components/post-creation/post-title/Index";
import calculatorImage from '../../../public/assets/img/blog/loan-calculator.jpg';
import Link from "next/link";
import Image from "next/image";

// Import FontAwsomeIcons
import "../components/fontawesomeIcons";
import { Heading } from "../components/heading/Heading";

const calculations = [
    {
        calculatorName: 'Loan calculations',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Investment growth',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Compound interest',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Amortization',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Bond price/yield',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'IRR (Internal Rate of Return)',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'NPV (Net Present Value)',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'ROI (Return on Investment)',
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
];


const paidTools = [
    {
        calculatorName: 'Portfolio Optimizer',
        calculatorDescription: 'The Portfolio Optimizer is a robust tool designed to help investors build diversified portfolios aligned with their financial goals and risk preferences. It leverages advanced models and market data to provide optimal asset allocation, ensuring weights total 100% and avoid over-concentration. Customization options include inputs for investment amount, risk-free rate, and target return, with flexibility for short- or long-term strategies. The tool analyzes risk versus return, highlights diversification opportunities, and simulates historical performance (5-year) to offer actionable insights for achieving maximum efficiency and minimizing volatility.',
        gotoLink: '/premium-tools/portfolio-optimizer',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Stock Analyzer',
        calculatorDescription: "A Stock Analyzer is a comprehensive tool designed to help investors evaluate and understand the performance and potential of a stock. It provides detailed insights into a company's financial health, market position, and future growth prospects by analyzing key metrics and trends. This tool is ideal for both novice and experienced investors looking to make informed decisions about buying, holding, or selling stocks.",
        gotoLink: '/premium-tools/stock-analyzer',
        calculatorImage: calculatorImage
    },
];


export default function PaidTools() {
    return (
        <section className="top-news-post-area pt-50 pb-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="sidebar-wrap">
                                <Heading
                                    textHeading="Paid Calculators"
                                    showBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {paidTools.map((calculator, index) => (
                            <div key={index} className="col-xl-4 col-lg-6">
                                <div className="contact-info-item !bg-transparent">
                                    <div className="hot-post-wrap">
                                        <div className="hot-post-item">
                                            {/* <div className="hot-post-thumb border-deault">
                                                <Link href={calculator.gotoLink}>
                                                    <Image
                                                        src={calculator.calculatorImage}
                                                        width={798}
                                                        height={538}
                                                        alt={`${calculator.calculatorName} Image`}
                                                    />
                                                </Link>
                                            </div> */}
                                            <div className="hot-post-content">
                                                <PostTitle
                                                    isIcon={true}
                                                    icon={'fa-solid fa-calculator'}
                                                    heading={calculator.calculatorName}
                                                    headingLink={calculator.gotoLink}
                                                />
                                                <PostDescription
                                                    description={calculator.calculatorDescription}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}