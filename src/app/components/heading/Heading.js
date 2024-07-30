import { Goto } from "../Buttons/Goto"

export const Heading = ({ textHeading, showBtn }) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="section-title-wrap mb-30 ">
                    <div className="section-title section-title-four">
                        <h2 className="title">{textHeading}</h2>
                        <div className="editor-nav-two" />
                    </div>
                    {showBtn && (
                        <Goto 
                            buttonText={'Visit Market'}
                        />
                    )}
                    <div className="section-title-line" />
                </div>
            </div>
        </div>
    )
}