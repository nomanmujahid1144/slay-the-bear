import Link from "next/link"

export const PostTag = ({tagName}) => {
    return (
        <Link href="#" className="post-tag-four !uppercase">
            {tagName}
        </Link>
    )
}