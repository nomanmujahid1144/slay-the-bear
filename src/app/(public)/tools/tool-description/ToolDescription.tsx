interface ToolDescriptionProps {
    title: string;
    details: string;
}

export const ToolDescription = ({ title, details }: ToolDescriptionProps) => {
    return (
        <div className="newsletter-wrap-four">
            <div className="newsletter-content !text-left">
                <h2 className="title">{title}</h2>
                <p>{details}</p>
            </div>
        </div>
    );
};