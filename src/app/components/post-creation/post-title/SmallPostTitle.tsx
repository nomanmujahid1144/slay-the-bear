import Link from "next/link"

interface SmallPostTitleProps {
    title: string;
    headingLink?: string;
    extras?: string;
}

export const SmallPostTitle = ({ extras, headingLink, title }: SmallPostTitleProps) => {
    return (
        <h4 className={`post-title ${extras ?? ''}`}>
            {headingLink ? (
                <Link href={headingLink} target="_blank">
                    {title}
                </Link>
            ) : (
                title
            )}
        </h4>
    )
}