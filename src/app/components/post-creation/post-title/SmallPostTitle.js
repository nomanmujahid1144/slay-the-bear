import Link from "next/link"

export const SmallPostTitle = ({extras, headingLink,title}) => {
    return (
        <h4 className={`post-title ${extras}`}>
            <Link href={`${headingLink}`} target="_blank">
                {title}
            </Link>
        </h4>
    )
}