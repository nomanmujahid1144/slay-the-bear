import { ButtonGoTo } from "../../Buttons/ButtonGoTo"
import { Goto } from "../../Buttons/Goto"
import { InvoiceHistory } from "./InvoiceHistory"

export const Billing = () => {
    return (
        <>
            <div className="pt-4">
                <div className="flex justify-between">
                    <h1 className="py-2 text-2xl font-semibold">Billings</h1>
                    <div className="w-auto">
                        {console.log(process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL, 'process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL_DEV')}
                        <Goto
                            buttonText={'Billing Dashboard'}
                            goTo={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}
                        />
                    </div>
                </div>
                {/* <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <InvoiceHistory />
        </>
    )
}