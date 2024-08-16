import Link from "next/link";

export default function Support() {
    return (
        <div className="container">
            <div className="row justify-content-center my-20">
                <div className="col-md-9 col-10">
                    <div className="section-title-five text-start mb-30">
                        <h2 className="title capitalize">Welcome to the Support Page</h2>
                    </div>
                    <div>
                        <p className="text-sm my-4">
                            We&apos;re here to help you make the most of
                            <span className="font-bold">
                                <a href=""> Slay The Bear</a>
                            </span>
                            , our web-based and mobile platform
                            designed to empower you with tools, news, and research to navigate the world of finance.
                            Whether you&apos;re having trouble with the platform, need assistance with your account, or just have
                            a question, you&apos;ll find everything you need right here.
                        </p>
                        <ol className="list-decimal" type="1">
                            <section id="accounts">
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Getting Started</h3>
                                    <ol className="list-disc">
                                        <section id="accounts">
                                            <li>
                                                <h3 className="font-medium">Account Setup</h3>
                                                <p className="text-sm my-1">
                                                    Learn how to create and set up your account on Slay The Bear, whether
                                                    you&apos;re on the web or mobile.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Navigating the Platform</h3>
                                                <p className="text-sm my-1">
                                                    A quick guide to help you understand the platform&apos;s features
                                                    and tools on both web and mobile.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Personalizing Your Experience</h3>
                                                <p className="text-sm my-1">
                                                    How to customize your settings for a personalized
                                                    experience across devices.
                                                </p>
                                            </li>
                                        </section>
                                    </ol>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Account Management</h3>
                                    <ol className="list-disc">
                                        <section id="accounts">
                                            <li>
                                                <h3 className="font-medium">Sign-In Help</h3>
                                                <p className="text-sm my-1">
                                                    Trouble signing in? Visit our
                                                    <Link href="/login"> Sign-In </Link>
                                                    Portal for assistance
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Password Reset</h3>
                                                <p className="text-sm my-1">
                                                    Forgotten your password? Here’s how to reset it.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Updating Account Information</h3>
                                                <p className="text-sm my-1">
                                                    Step-by-step guide to update your profile, email, and
                                                    other personal details.
                                                </p>
                                            </li>
                                        </section>
                                    </ol>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Using the Platform</h3>
                                    <ol className="list-disc">
                                        <section id="accounts">
                                            <li>
                                                <h3 className="font-medium">Tools Overview</h3>
                                                <p className="text-sm my-1">
                                                    Detailed descriptions of the financial tools available on Slay The Bear.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">News Feed</h3>
                                                <p className="text-sm my-1">
                                                    Stay updated with the latest news and research tailored to your interests.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Research Section</h3>
                                                <p className="text-sm my-1">
                                                    How to access and utilize our research materials to enhance your
                                                    financial knowledge.
                                                </p>
                                            </li>
                                        </section>
                                    </ol>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Subscription and Billing</h3>
                                    <ol className="list-disc">
                                        <section id="accounts">
                                            <li>
                                                <h3 className="font-medium">Subscription Plans</h3>
                                                <p className="text-sm my-1">
                                                    Overview of the available subscription plans for both web and
                                                    mobile users.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Billing Information</h3>
                                                <p className="text-sm my-1">
                                                    How to update your billing details and manage payments.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Ad-Free Version</h3>
                                                <p className="text-sm my-1">
                                                    Learn about our ad-free experience and how to upgrade.
                                                </p>
                                            </li>
                                        </section>
                                    </ol>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Frequently Asked Questions (FAQ)</h3>
                                    <section id="accounts">
                                        <p className="text-sm my-1">
                                            Have a question? Check out our <Link href={&apos;/&apos;}>FAQ</Link> section for quick answers to the most common queries.
                                        </p>
                                    </section>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Troubleshooting</h3>
                                    <ol className="list-disc">
                                        <section id="accounts">
                                            <li>
                                                <h3 className="font-medium">Platform Performance Issues</h3>
                                                <p className="text-sm my-1">
                                                    Tips to resolve common issues like slow performance or
                                                    bugs on both web and mobile.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Tool Errors</h3>
                                                <p className="text-sm my-1">
                                                    What to do if a tool isn&apos;t working correctly.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">News Feed Problems</h3>
                                                <p className="text-sm my-1">
                                                    How to refresh your news feed or fix loading issues.
                                                </p>
                                            </li>
                                        </section>
                                    </ol>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Contact Support</h3>
                                    <section id="accounts">
                                        <p className="text-sm my-1">
                                            Still need help? Our support team is here to assist you.
                                        </p>
                                    </section>
                                    <ol className="list-disc">
                                        <section id="accounts">
                                            <li>
                                                <h3 className="font-medium">Email Support</h3>
                                                <p className="text-sm my-1">
                                                    Reach out to us at support@youremail.com.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Live Chat</h3>
                                                <p className="text-sm my-1">
                                                    Chat with our support team directly through the platform for immediate assistance.
                                                </p>
                                            </li>
                                            <li>
                                                <h3 className="font-medium">Community Forum</h3>
                                                <p className="text-sm my-1">
                                                    Join our user community to get help from other users or share your experiences.
                                                </p>
                                            </li>
                                        </section>
                                    </ol>
                                </li>
                                <hr />
                                <li className="my-5">
                                    <h3 className="font-extrabold">Sign-In Portal</h3>
                                    <section id="accounts">
                                        <p className="text-sm my-1">
                                            Access your account, manage your subscriptions, and explore personalized content by signing in here.
                                        </p>
                                    </section>
                                </li>
                            </section>
                        </ol>
                        <hr />
                        <p className="text-sm my-5">
                            Thank you for using Slay The Bear! We&apos;re committed to helping you succeed on your financial
                            journey. If you have any suggestions on how we can improve our service, please don&apos;t hesitate to
                            contact us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}