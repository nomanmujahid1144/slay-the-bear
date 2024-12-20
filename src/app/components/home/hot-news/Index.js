import Link from "next/link";
import { SlickSlider } from "../../slick-slider/SlickSlider";
import { Heading } from "../../heading/Heading";
import { PostTag } from "../../post-creation/post-tag/Index";
import { SmallPostTitle } from "../../post-creation/post-title/SmallPostTitle";
import { DateTime } from "../../post-creation/post-date-time/Index";
import politicsImage from '../../../../../public/assets/img/blog/politics_post01.jpg';
import Image from "next/image";

const hotPicks = [
    {
      headline: 'Warns Financial Institutions To Be On Watch For Russian',
      topic: 'Politics',
      date: '27 AUGUST, 2024',
      time: '20 Mins'
    },
    {
      headline: 'Warns Financial Institutions To Be On Watch For Russian',
      topic: 'Politics',
      date: '27 AUGUST, 2024',
      time: '20 Mins'
    },
    {
      headline: 'Warns Financial Institutions To Be On Watch For Russian',
      topic: 'Politics',
      date: '27 AUGUST, 2024',
      time: '20 Mins'
    },
    {
      headline: 'Warns Financial Institutions To Be On Watch For Russian',
      topic: 'Politics',
      date: '27 AUGUST, 2024',
      time: '20 Mins'
    },
    {
      headline: 'Warns Financial Institutions To Be On Watch For Russian',
      topic: 'Politics',
      date: '27 AUGUST, 2024',
      time: '20 Mins'
    },
  ];

export const HotPicks = () => {
    return (
        <section className="editor-post-area-three !bg-transparent">
            <div className="container">
                <Heading
                    textHeading={'Hot Picks'}
                />
                <div className="row editor-post-active-two">
                    <SlickSlider>
                        {hotPicks.map((hotPick, index) => (
                            <div key={index} className="col-lg-3">
                                <div className="editor-post-three">
                                    <div className="editor-post-thumb-three">
                                        <Link href="/">
                                            <Image
                                                src={politicsImage} 
                                                alt="no image found" 
                                                className="w-full h-auto"
                                                unoptimized
                                            />
                                        </Link>
                                        <Link href="/" className="paly-btn popup-video">
                                            <i className="fas fa-play" />
                                        </Link>
                                    </div>
                                    <div className="editor-post-content-three">
                                        <PostTag 
                                            tagName={hotPick.topic}
                                        />
                                        <SmallPostTitle 
                                            title={hotPick.headline}
                                        />
                                        <DateTime 
                                            date={hotPick.date}
                                            time={hotPick.time}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </SlickSlider>
                </div>
            </div>
        </section>
    )
}