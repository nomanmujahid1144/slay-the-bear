import Link from "next/link";

export const TermAndConditionTxt = ({text}) => {
    return (
        <p className="text-xs flex justify-center text-slate-400">
            By {text} you agree to our&nbsp;
            <Link className="!text-primary hover:!text-secondary" href={'/terms-and-conditions'}>Terms & Conditions</Link>
            &nbsp;and&nbsp;
            <Link className="!text-primary hover:!text-secondary" href={'/privacy-policy'}>Privacy Policy</Link>
        </p>
    );
};
