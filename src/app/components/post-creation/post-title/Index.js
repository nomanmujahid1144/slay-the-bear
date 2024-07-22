import Link from "next/link"

export const PostTitle = ({extras, heading}) => {
    return (
        <h2 className={`post-title ${extras}`}>
            <Link href="#">
                {heading}
            </Link>
        </h2>
    )
}