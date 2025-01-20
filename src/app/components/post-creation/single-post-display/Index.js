import Image from "next/image"
import { Goto } from "../../Buttons/Goto"
import { DateTime } from "../post-date-time/Index"
import { PostDescription } from "../post-description/Index"
import { PostTag } from "../post-tag/Index"
import { PostTitle } from "../post-title/Index"
import Link from "next/link"

export const SinglePostDisplay = ({ postTag, postHeading, postURL, postSource, postImage, postDate, postTime, postDescription, key }) => {
    return (
        <div key={key} className="weekly-post-item-wrap">
            <div className="weekly-post-item weekly-post-four">
                {console.log(postImage)}
                <div className="weekly-post-thumb">
                    {(postImage !== '' || postImage !== null) && (
                        <Link href={postURL} target="_blank">
                            <Image
                                src={postImage}
                                alt={postSource + ' image'}
                                width={440}
                                height={300}
                                quality={85} // Adjust quality if needed
                                priority // Optional for critical images
                                unoptimized
                            />
                        </Link>
                    )}
                </div>
                <div className="weekly-post-content">
                    <PostTag
                        tagName={postTag}
                    />
                    <PostTitle
                        heading={postHeading}
                        headingLink={postURL}
                    />
                    <DateTime
                        date={postDate}
                        time={postTime}
                    />
                    <PostDescription
                        description={postDescription}
                    />
                    <Goto
                        buttonText={'Read More'}
                        goTo={postURL}
                    />
                </div>
            </div>
        </div>
    )
}