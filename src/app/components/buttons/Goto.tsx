import Link from "next/link"

interface GotoProps {
    buttonText: string;
    goTo: string;
}

export const Goto = ({ buttonText, goTo }: GotoProps) => {
    return (
        <div className="view-all-btn">
            <Link href={goTo} className="link-btn">
                {buttonText}
                <span className="svg-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                        <path
                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                            fill="currentColor"
                        />
                        <path
                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                            fill="currentColor"
                        />
                    </svg>
                </span>
            </Link>
        </div>
    )
}