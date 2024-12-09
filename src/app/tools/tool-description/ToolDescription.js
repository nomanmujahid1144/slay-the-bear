export const ToolDescription = ({title, details}) => {
    return (
        <div class="newsletter-wrap-four">
            <div class="newsletter-content !text-left">
                <h2 class="title">{title}</h2>
                <p>
                    {details}
                </p>
            </div>
        </div>
    )
}