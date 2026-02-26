import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Link from "next/link"

interface PostTitleProps {
    heading: string;
    headingLink: string;
    extras?: string;
    isIcon?: boolean;
    icon?: IconProp;
}

export const PostTitle = ({ extras, heading, headingLink, isIcon, icon }: PostTitleProps) => {
    return (
        <h2 className={`post-title ${extras ?? ''} ${isIcon ? '!flex' : ''}`}>
            {isIcon && icon && (
                <FontAwesomeIcon icon={icon} className="!w-3 !mr-3" />
            )}
            <Link href={headingLink} target="_blank">
                {heading}
            </Link>
        </h2>
    )
}