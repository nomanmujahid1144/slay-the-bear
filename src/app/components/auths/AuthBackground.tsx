import { ReactNode } from "react";

interface AuthBackgroundProps {
    children: ReactNode;
    className?: string;
}

export const AuthBackground = ({ children, className = '' }: AuthBackgroundProps) => {
    return (
        <section className="contact-area pt-20 pb-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className={`contact-form ${className}`.trim()}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}