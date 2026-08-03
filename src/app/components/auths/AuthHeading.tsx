interface AuthHeadingProps {
    title: string;
    className?: string;
}

export const AuthHeading = ({ title, className = '' }: AuthHeadingProps) => {
    return (
        <h4 className={`title text-center ${className}`.trim()}>{title}</h4>
    )
}