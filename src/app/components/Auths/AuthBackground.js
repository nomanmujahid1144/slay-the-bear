export const AuthBackground = ({children}) => {
    return (
        <section className="contact-area pt-80 pb-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="contact-form">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}