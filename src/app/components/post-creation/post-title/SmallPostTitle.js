import Link from "next/link"

export const SmallPostTitle = ({extras ,title}) => {
    return (
        <h4 className={`post-title ${extras}`}>
            <Link href="#">
                {title}
            </Link>
        </h4>
    )
}