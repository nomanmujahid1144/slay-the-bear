'use client'

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import loadingAnimation from '../../../../public/assets/animation/loading.json';

export const LottieLoader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="w-20 h-20">
                <Lottie animationData={loadingAnimation} loop={true} />
            </div>
        </div>
    )
}