import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export const PostTitle = ({extras, heading, isIcon, icon}) => {
    return (
        <h2 className={`post-title ${extras} ${isIcon && '!flex'}`}>
            {isIcon && (
                <FontAwesomeIcon icon={icon} className="!w-3 !mr-3" />
            )}
            <Link href="#">
                {heading}
            </Link>
        </h2>
    )
}