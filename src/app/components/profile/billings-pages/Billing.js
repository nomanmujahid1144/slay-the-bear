import { InvoiceHistory } from "./InvoiceHistory"

export const Billing = () => {
    return (
        <>
            <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Invoice History</h1>
                {/* <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <InvoiceHistory />
        </>
    )
}