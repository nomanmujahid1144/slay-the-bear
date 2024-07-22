import Image from "next/image"
import { Goto } from "../../Buttons/Goto"
import { DateTime } from "../post-date-time/Index"
import { PostDescription } from "../post-description/Index"
import { PostTag } from "../post-tag/Index"
import { PostTitle } from "../post-title/Index"
import Link from "next/link"

export const SinglePostDisplay = ({postTag, postHeading, postImage, postDate, postTime, postDescription, key}) => {
    return (
        <div key={key} className="weekly-post-item-wrap">
            <div className="weekly-post-item weekly-post-four">
                <div className="weekly-post-thumb">
                    <Link href="#">
                        <Image 
                            src={postImage}
                            alt="no image"
                            layout="responsive"
                            width={50}
                            height={50} 
                        />
                    </Link>
                </div>
                <div className="weekly-post-content">
                    <PostTag 
                        tagName={postTag}
                    />
                    <PostTitle 
                        heading={postHeading}
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
                    />
                </div>
            </div>
        </div>
    )
}