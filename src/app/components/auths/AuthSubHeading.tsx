interface AuthSubHeadingProps {
    subHeading: string;
    className?: string;
}

export const AuthSubHeading = ({ subHeading, className = '' }: AuthSubHeadingProps) => {
    return (
        <p className={`text-center ${className}`.trim()}>{subHeading}</p>
    )
}