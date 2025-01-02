import Link from "next/link";

export const ButtonGoTo = ({ text, extras, href, paymentLink, onClick }) => {
    return (
        <button
            type="button"
            onClick={() => onClick({paymentLink})}
            className={`btn btn-two ${extras} w-100 justify-content-center cursor-pointer`}
            // target="_blank" // Optional: Open in a new tab
            // rel="noopener noreferrer" // Recommended for external links
        >
            {text}
        </button>
    );
};
