interface AuthHeadingProps {
    title: string;
}

export const AuthHeading = ({ title }: AuthHeadingProps) => {
    return (
        <h4 className="title text-center">{title}</h4>
    )
}