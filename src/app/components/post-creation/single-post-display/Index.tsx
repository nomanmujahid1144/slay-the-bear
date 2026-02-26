import Image from "next/image";
import Link from "next/link";
import { Goto } from "../../buttons/Goto";
import { DateTime } from "../post-date-time/Index";
import { PostDescription } from "../post-description/Index";
import { PostTag } from "../post-tag/Index";
import { PostTitle } from "../post-title/PostTitle";

interface SinglePostDisplayProps {
    postTag?: string;
    postHeading: string;
    postURL: string;
    postSource?: string;
    postImage?: string;
    postDate?: string;
    postTime?: string;
    postDescription?: string;
}

export const SinglePostDisplay = ({
    postTag,
    postHeading,
    postURL,
    postSource,
    postImage,
    postDate,
    postTime,
    postDescription,
}: SinglePostDisplayProps) => {
    return (
        <div className="weekly-post-item-wrap">
            <div className="weekly-post-item weekly-post-four">
                <div className="weekly-post-thumb">
                    {postImage && (
                        <Link href={postURL} target="_blank">
                            <Image
                                src={postImage}
                                alt={postSource ? `${postSource} image` : 'post image'}
                                width={440}
                                height={300}
                                quality={85}
                                priority
                                unoptimized
                            />
                        </Link>
                    )}
                </div>
                <div className="weekly-post-content">
                    <PostTag tagName={postTag} />
                    <PostTitle heading={postHeading} headingLink={postURL} />
                    <DateTime date={postDate} time={postTime} />
                    <PostDescription description={postDescription} />
                    <Goto buttonText={'Read More'} goTo={postURL} />
                </div>
            </div>
        </div>
    );
};