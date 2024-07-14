import Link from "next/link";
import { SlickSlider } from "../slick-slider/SlickSlider";
import { Heading } from "../heading/Heading";

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
        <section className="editor-post-area-three">
            <div className="container">
                <Heading
                    textHeading={'Hot Picks'}
                />
                <div className="row gutter-40 editor-post-active-two">
                    <SlickSlider>
                        {hotPicks.map((hotPick, index) => (
                            <div key={index} className="col-lg-3">
                                <div className="editor-post-three">
                                    <div className="editor-post-thumb-three">
                                        <Link href="/">
                                            <img src="assets/img/blog/politics_post01.jpg" alt />
                                        </Link>
                                        <Link href="/" className="paly-btn popup-video">
                                            <i className="fas fa-play" />
                                        </Link>
                                    </div>
                                    <div className="editor-post-content-three">
                                        <Link href="/" className="post-tag-four">{hotPick.topic}</Link>
                                        <h2 className="post-title">
                                            <Link href="/">{hotPick.headline}</Link>
                                        </h2>
                                        <div className="blog-post-meta">
                                            <ul className="list-wrap">
                                                <li><i className="flaticon-calendar" />{hotPick.date}</li>
                                                <li><i className="flaticon-history" />{hotPick.time}</li>
                                            </ul>
                                        </div>
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