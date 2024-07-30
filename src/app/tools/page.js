import { PostDescription } from "../components/post-creation/post-description/Index";
import { PostTitle } from "../components/post-creation/post-title/Index";
import calculatorImage from '../../../public/assets/img/blog/loan-calculator.jpg';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import FontAwsomeIcons
import "../components/fontawesomeIcons";

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
        calculatorImage: calculatorImage },
    { 
        calculatorName: 'Compound interest', 
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.', 
        gotoLink: '#', 
        calculatorImage: calculatorImage },
    { 
        calculatorName: 'Amortization', 
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.', 
        gotoLink: '#', 
        calculatorImage: calculatorImage },
    { 
        calculatorName: 'Bond price/yield', 
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.', 
        gotoLink: '#', 
        calculatorImage: calculatorImage },
    { 
        calculatorName: 'IRR (Internal Rate of Return)', 
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.', 
        gotoLink: '#', 
        calculatorImage: calculatorImage },
    { 
        calculatorName: 'NPV (Net Present Value)', 
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.', 
        gotoLink: '#', 
        calculatorImage: calculatorImage },
    { 
        calculatorName: 'ROI (Return on Investment)', 
        calculatorDescription: 'This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.', 
        gotoLink: '#', 
        calculatorImage: calculatorImage },
]

export default function Tools() {
    return (
        <section className="contact-area pt-50 pb-50">
            <div className="container">
                <div className="contact-info-wrap">
                    <div className="row justify-content-center">
                        {calculations.map((calculator, index) => (
                            <div key={index} className="col-xl-4 col-lg-6">
                                <div className="contact-info-item !bg-transparent">
                                    <div className="hot-post-wrap">
                                        <div className="hot-post-item">
                                            <div className="hot-post-thumb border-deault">
                                                <Link href={calculator.gotoLink}>
                                                    <Image 
                                                        src={calculator.calculatorImage}
                                                        width={798}
                                                        height={538} 
                                                        alt={`${calculator.calculatorName} + ' Image Missing'`} 
                                                    />
                                                </Link>
                                            </div>
                                            <div className="hot-post-content">
                                                <PostTitle
                                                    isIcon={true}
                                                    icon={'fa-solid fa-calculator'}
                                                    heading={calculator.calculatorName}
                                                />
                                                <PostDescription
                                                    description={`This tool allows you to receive pivot points in four different popular systems, by filling in the previous days’ high, low, and close. It is helpful for determining support, resistance entry and exit points.`}
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