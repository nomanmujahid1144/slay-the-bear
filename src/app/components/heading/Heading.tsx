'use client'

import { Goto } from "../buttons/Goto"

interface HeadingProps {
    textHeading: string;
    showBtn?: boolean;
    goTo?: string;
}

export const Heading = ({ textHeading, showBtn, goTo }: HeadingProps) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="section-title-wrap mb-30">
                    <div className="section-title section-title-four">
                        <h2 className="title">{textHeading}</h2>
                        <div className="editor-nav-two" />
                    </div>
                    {showBtn && goTo && (
                        <Goto
                            buttonText={'Visit Market'}
                            goTo={goTo}
                        />
                    )}
                    <div className="section-title-line" />
                </div>
            </div>
        </div>
    )
}