'use client'

import { useState } from "react";
import { DefaultButton } from "../components/Buttons/Default";
import { useDarkMode } from "../components/dark-mode/DarkModeContext";

export default function Pricing() {

    const [isAnnual, setIsAnnual] = useState(true);
    const { isDarkMode } = useDarkMode();


    return (
        <div className="relative font-inter antialiased">
            <main className="relative min-h-screen flex flex-col justify-center contact-area overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                    {/* Pricing table component */}
                    <div>
                        {/* Pricing toggle */}
                        <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
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
                        </div>

                        <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none pt-10">
                            {/* Pricing tab 1 */}
                            <div className="h-full">
                                {/* bg-white border border-slate-200  */}
                                {console.log(isDarkMode, 'isDarkMode')}
                                <div className={`relative contact-form flex flex-col h-full p-6 rounded-2xl border ${isDarkMode ? '!border-slate-800' : 'border-slate-200'} shadow shadow-slate-950/5`}>
                                    <div class="blog-details-inner-content">
                                        <div className="mb-5">
                                            <h1 className="title-two font-semibold mb-1">
                                                Essential
                                            </h1>
                                            <div className="inline-flex items-baseline mb-2">
                                                <h3 className="title-two font-bold text-4xl">
                                                    ${isAnnual ? "29" : "35"}
                                                    <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                </h3>
                                            </div>
                                            <p >
                                                There are many variations available, but the majority have
                                                suffered.
                                            </p>
                                            <DefaultButton
                                                type={'button'}
                                                text={'Purchase Plan'}
                                            />
                                        </div>
                                        <ul class="list-wrap">
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full">
                                {/* bg-white border border-slate-200  */}
                                {console.log(isDarkMode, 'isDarkMode')}
                                <div className={`relative contact-form flex flex-col h-full p-6 rounded-2xl border ${isDarkMode ? '!border-slate-800' : 'border-slate-200'} shadow shadow-slate-950/5`}>
                                    <div class="blog-details-inner-content">
                                        <div className="mb-5">
                                            <h1 className="title-two font-semibold mb-1">
                                                Essential
                                            </h1>
                                            <div className="inline-flex items-baseline mb-2">
                                                <h3 className="title-two font-bold text-4xl">
                                                    ${isAnnual ? "29" : "35"}
                                                    <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                </h3>
                                            </div>
                                            <p >
                                                There are many variations available, but the majority have
                                                suffered.
                                            </p>
                                            <DefaultButton
                                                type={'button'}
                                                text={'Purchase Plan'}
                                            />
                                        </div>
                                        <ul class="list-wrap">
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full">
                                {/* bg-white border border-slate-200  */}
                                {console.log(isDarkMode, 'isDarkMode')}
                                <div className={`relative contact-form flex flex-col h-full p-6 rounded-2xl border ${isDarkMode ? '!border-slate-800' : 'border-slate-200'} shadow shadow-slate-950/5`}>
                                    <div class="blog-details-inner-content">
                                        <div className="mb-5">
                                            <h1 className="title-two font-semibold mb-1">
                                                Essential
                                            </h1>
                                            <div className="inline-flex items-baseline mb-2">
                                                <h3 className="title-two font-bold text-4xl">
                                                    ${isAnnual ? "29" : "35"}
                                                    <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                </h3>
                                            </div>
                                            <p >
                                                There are many variations available, but the majority have
                                                suffered.
                                            </p>
                                            <DefaultButton
                                                type={'button'}
                                                text={'Purchase Plan'}
                                            />
                                        </div>
                                        <ul class="list-wrap">
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                            <li><i class="fas fa-check"></i>Gutenberg Integration</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}