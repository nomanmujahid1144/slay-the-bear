interface AuthSubHeadingProps {
    subHeading: string;
}

export const AuthSubHeading = ({ subHeading }: AuthSubHeadingProps) => {
    return (
        <p className="text-center">{subHeading}</p>
    )
}