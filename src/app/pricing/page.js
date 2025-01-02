'use client'

import { usePathname, useRouter } from "next/navigation";
import { ButtonGoTo } from "../components/Buttons/ButtonGoTo";
import { useDarkMode } from "../components/dark-mode/DarkModeContext";
import { checkIsLoggedInUser } from "@/helpers/checkLoggedInUser";
import { useEffect, useState } from "react";


export default function Pricing() {

    const { isDarkMode } = useDarkMode();
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedInUser, setIsLoggedInUser] = useState(null);

    const getUsersData = async () => {
        const response = await checkIsLoggedInUser();
        if (response.success) {
            setIsLoggedInUser(response.data);
        } else {
            setIsLoggedInUser(null)
        }
    }

    useEffect(() => {
        getUsersData();
    }, [pathname])

    const pricingsList = [
        {
            title: 'Monthly',
            desciption: 'There are many variations available, but the majority have suffered.',
            price: 6,
            discount: '',
            discountedPrice: '',
            href: '/login',
            paymentLink: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK,
            features: [
                "Gutenberg Integration",
                "Gutenberg Integration",
                "Gutenberg Integration"
            ]
        },
        {
            title: 'Yearly',
            desciption: 'There are many variations available, but the majority have suffered.',
            price: 60,
            discount: '12% off',
            discountedPrice: '72',
            href: '/login',
            paymentLink: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK,
            features: [
                "Gutenberg Integration",
                "Gutenberg Integration",
                "Gutenberg Integration"
            ]
        },
    ]

    const handlePricingNavigator = ({paymentLink}) => {
        if(isLoggedInUser == null){
            router.push(`/login?redirect_url=${encodeURIComponent(paymentLink)}`)
        }else{
            router.push(paymentLink + `?prefilled_email=${isLoggedInUser?.email}`)
        }
    }

    return (
        <div className="relative font-inter antialiased">
            <main className="relative min-h-screen flex flex-col justify-center contact-area overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                    {/* Pricing table component */}
                    {console.log(isLoggedInUser, 'isLoggedInUser')}
                    <div>
                        {/* Pricing toggle */}
                        {/* <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
                            <div className={`relative flex w-full p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-full`}>
                                <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true" >
                                    <span className={`absolute inset-0 w-1/2 btn btn-two z-0 p-0 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${isAnnual ? "translate-x-0" : "translate-x-full"}`}></span>
                                </span>
                                <button
                                    className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${isAnnual ? "text-white" : "text-slate-500 "}`}
                                    onClick={() => setIsAnnual(true)}
                                    aria-pressed={isAnnual}
                                >
                                    Yearly{" "}
                                    <span
                                        className={`${isAnnual ? "text-indigo-200" : "text-slate-400"}`} >
                                        -20%
                                    </span>
                                </button>
                                <button
                                    className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${isAnnual ? "text-slate-500" : "text-white"}`}
                                    onClick={() => setIsAnnual(false)}
                                    aria-pressed={!isAnnual} >
                                    Monthly
                                </button>
                            </div>
                        </div> */}

                        <div className="max-w-sm mx-auto lg:flex gap-6 justify-center items-start lg:max-w-none pt-10">
                            {/* Pricing tab 1 */}
                            {pricingsList.map((priceItem, index) => (
                                <div key={index} className="h-full lg:!max-w-sm text-start">
                                    <div className={`relative contact-form flex flex-col h-full p-6 rounded-2xl border ${isDarkMode ? '!border-slate-800' : 'border-slate-200'} shadow shadow-slate-950/5`}>
                                        <div class="blog-details-inner-content">
                                            <div className="mb-5">
                                                <div className="flex justify-between">
                                                    <h1 className="title-two font-semibold mb-1">
                                                        {priceItem.title}
                                                        <sup className="ml-2">
                                                            {priceItem.discount.length > 0 && (
                                                                <span className={`inline-flex items-center rounded-full ${isDarkMode ? 'bg-black-300' : 'bg-indigo-100'}  px-2 text-xs font-medium !text-primary ring-1 ring-inset ring-primary`}>{priceItem.discount}</span>
                                                            )}
                                                        </sup>
                                                    </h1>

                                                    {priceItem.discount.length > 0 && (
                                                        <span className={`inline-flex items-center rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-indigo-100'}  px-2 py-1 text-xs font-bold !text-primary ring-1 ring-inset ring-primary`}>Most Popular</span>
                                                    )}
                                                </div>
                                                <div className="inline-flex items-baseline mb-2 gap-1">
                                                    {priceItem.discount.length > 0 && (
                                                        <>
                                                            <h3 className="title-two font-semibold !text-base line-through">
                                                                {priceItem.discountedPrice}
                                                                <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                            </h3>
                                                        </>
                                                    )}
                                                    <h3 className="title-two font-bold text-4xl">
                                                        {priceItem.price}
                                                        <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                    </h3>
                                                </div>
                                                <p >{priceItem.desciption}</p>
                                                <ButtonGoTo
                                                    href={priceItem.href || ''}
                                                    onClick={handlePricingNavigator}
                                                    paymentLink={priceItem.paymentLink}
                                                    type={'button'}
                                                    text={'Purchase Plan'}
                                                />
                                            </div>
                                            <ul class="list-wrap">
                                                {priceItem.features.map((feature, index) => (
                                                    <li key={index}><i class="fas fa-check"></i>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}