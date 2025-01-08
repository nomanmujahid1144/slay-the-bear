'use client';

import { checkIsLoggedInUser } from "@/helpers/checkLoggedInUser";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { createCheckoutSessionAction } from "./actions";

export default function AuthCallBack() {
    const router = useRouter();
    const pathname = usePathname();

    const fetchUser = async () => {
        const { user, error } = await checkIsLoggedInUser();
        const getStripePaymentLinkAccordingToPeriod = localStorage.getItem('generatePeriodForStripeLink')

        console.log(getStripePaymentLinkAccordingToPeriod, 'getPaymentOption')
        console.log(user, 'user')
        console.log(error, 'error')

        if (error) {
            console.error("Error fetching user:", error);
            router.push("/login");
        }
        if (user) {
            if(getStripePaymentLinkAccordingToPeriod && user?.email){
                const paymentLink = await createCheckoutSessionAction({user, getStripePaymentLinkAccordingToPeriod})
                localStorage.removeItem('generatePeriodForStripeLink')
                window.location.href = paymentLink.url
            }else{
                router.push("/"); 
            }
        } else {
            // Redirect to login if no user is logged in
            router.push("/login");
        }
    };

    useEffect(() => {
        fetchUser();
    }, [pathname, router]);

    return (
        <div className="my-20 h-screen w-full flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
                <h3 className="text-xl font-bold">Redirecting...</h3>
                <p>Please wait</p>
            </div>
        </div>
    );
}
