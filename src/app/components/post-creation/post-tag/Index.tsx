import Link from "next/link";

interface PostTagProps {
    tagName?: string;
}

export const PostTag = ({ tagName }: PostTagProps) => {
    if (!tagName) return null;
    return (
        <Link href="#" className="post-tag-four !uppercase">
            {tagName}
        </Link>
    );
};