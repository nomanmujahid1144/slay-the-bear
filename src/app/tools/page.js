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


const loadAndMortgage = [
    {
        calculatorName: 'Loan Amortization Calculator',
        calculatorDescription: 'Get a detailed breakdown of loan payments, showing how much goes toward interest and principal over time. Helps you visualize the impact of extra payments on reducing interest.',
        gotoLink: '/tools/loan-amortization',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Mortgage Calculator',
        calculatorDescription: 'Calculate monthly mortgage payments by inputting loan amount, interest rate, and loan term. See how your payment is split between principal and interest.',
        gotoLink: '/tools/mortgage-calculator',
        calculatorImage: calculatorImage
    },
];

const investmentAndSavingCalculator = [
    {
        calculatorName: 'Retirement Calculator',
        calculatorDescription: "Estimate how much you need for retirement based on your savings, contributions, and expected retirement age. Helps you determine if you're on track to meet your retirement goals.",
        gotoLink: '/tools/retirement-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Investment Return Calculator',
        calculatorDescription: 'Calculate the potential return on your investments over a specific period, helping you compare options and make informed decisions.',
        gotoLink: '/tools/investment-return-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Compound Interest Calculator',
        calculatorDescription: 'See how your investment or savings grow over time with compounding interest. Understand the impact of different compounding frequencies.',
        gotoLink: '/tools/compound-interest-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Savings Goal Calculator',
        calculatorDescription: 'Plan and achieve your savings goals by calculating required contributions over a given period. Provides a clear savings strategy to meet your financial targets.',
        gotoLink: '/tools/saving-goal-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Rule of 72 Calculator',
        calculatorDescription: 'Quickly estimate how many years it will take for your investment to double based on a fixed annual interest rate.',
        gotoLink: '/tools/rule-of-72-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Dividend Calculator',
        calculatorDescription: 'Estimate the income generated from dividend-paying stocks. Helps you plan for the cash flow from dividends in your portfolio.',
        gotoLink: '/tools/dividend-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'CD Calculator',
        calculatorDescription: 'Estimate the future value of a Certificate of Deposit (CD) based on the initial deposit, interest rate, and time until maturity.',
        gotoLink: '/tools/certificate-of-deposite-calculator',
        calculatorImage: calculatorImage
    },
];

const budgetingAndFinancialPlanningCalculator = [
    {
        calculatorName: 'Budget Calculator',
        calculatorDescription: 'Manage your income and expenses by creating a budget. Track spending and identify areas where you can cut costs or allocate more towards savings.',
        gotoLink: '/tools/budget-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Net Worth Calculator',
        calculatorDescription: 'Calculate your net worth by subtracting liabilities from assets. Get a clear picture of your financial health and identify areas for improvement.',
        gotoLink: '/tools/net-worth-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Debt-to-Income Ratio Calculator',
        calculatorDescription: 'Assess your debt level compared to your income. Calculate your debt-to-income ratio to understand your eligibility for loans and ensure your debt is manageable.',
        gotoLink: '/tools/debt-to-income-ratio-calculator',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Credit Card Payoff Calculator',
        calculatorDescription: 'Estimate the time and interest required to pay off credit card debt. Develop a debt repayment strategy that helps you pay off debt more quickly and minimizes interest costs.',
        gotoLink: '/tools/credit-pay-off-calculator',
        calculatorImage: calculatorImage
    },
];

const currencyAndBusinessCalculators = [
    {
        calculatorName: 'Currency Converter',
        calculatorDescription: 'Convert the value of one currency into another using real-time exchange rates. Ideal for international transactions and travel.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Break-Even Analysis Calculator',
        calculatorDescription: 'Determine the number of units needed to sell to cover costs. Useful for businesses in setting pricing strategies and controlling costs for profitability.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
];

const bondCalculator = [
    {
        calculatorName: 'Modified Duration Calculator',
        calculatorDescription: 'Measure a bond’s price sensitivity to interest rate changes. Helps investors manage interest rate risk in their bond portfolios.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Bond Yield to Maturity (YTM) Calculator',
        calculatorDescription: 'Estimate the total return on a bond if held until maturity. Compare bonds based on expected returns and make informed investment decisions.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
    {
        calculatorName: 'Bond Price Calculator',
        calculatorDescription: 'Determine the current market price of a bond by discounting its future cash flows. Ensures fair pricing for buying or selling bonds.',
        gotoLink: '#',
        calculatorImage: calculatorImage
    },
];



export default function Tools() {
    return (
        <section className="top-news-post-area pt-50 pb-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="sidebar-wrap">
                                <Heading
                                    textHeading="Loan and Mortgage Calculators"
                                    showBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loadAndMortgage.map((calculator, index) => (
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
                                                        alt={`${calculator.calculatorName} Image`}
                                                    />
                                                </Link>
                                            </div>
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
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="sidebar-wrap">
                                <Heading
                                    textHeading="Investment and Savings Calculators"
                                    showBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {investmentAndSavingCalculator.map((calculator, index) => (
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
                                                        alt={`${calculator.calculatorName} Image`}
                                                    />
                                                </Link>
                                            </div>
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
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="sidebar-wrap">
                                <Heading
                                    textHeading="Budgeting and Financial Planning Calculators"
                                    showBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {budgetingAndFinancialPlanningCalculator.map((calculator, index) => (
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
                                                        alt={`${calculator.calculatorName} Image`}
                                                    />
                                                </Link>
                                            </div>
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
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="sidebar-wrap">
                                <Heading
                                    textHeading="Currency and Business Calculators"
                                    showBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {currencyAndBusinessCalculators.map((calculator, index) => (
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
                                                        alt={`${calculator.calculatorName} Image`}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="hot-post-content">
                                                <PostTitle
                                                    isIcon={true}
                                                    icon={'fa-solid fa-calculator'}
                                                    heading={calculator.calculatorName}
                                                    headingLink={'#'}
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
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="sidebar-wrap">
                                <Heading
                                    textHeading="Bond Calculators"
                                    showBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {bondCalculator.map((calculator, index) => (
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
                                                        alt={`${calculator.calculatorName} Image`}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="hot-post-content">
                                                <PostTitle
                                                    isIcon={true}
                                                    icon={'fa-solid fa-calculator'}
                                                    heading={calculator.calculatorName}
                                                    headingLink={'#'}
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