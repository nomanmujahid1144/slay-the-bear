interface ButtonGoToProps {
    text: string;
    href?: string;
    extras?: string;
    paymentLink?: string;
    onClick: (params: { paymentLink?: string }) => void;
}

export const ButtonGoTo = ({ text, extras, href, paymentLink, onClick }: ButtonGoToProps) => {
    return (
        <button
            type="button"
            onClick={() => onClick({ paymentLink })}
            className={`btn btn-two ${extras ?? ''} w-100 justify-content-center cursor-pointer`}
        >
            {text}
        </button>
    );
};