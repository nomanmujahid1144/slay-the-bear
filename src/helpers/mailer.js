import User from '@/models/user.model';
import bcryptjs from 'bcryptjs';
import { Resend } from 'resend';
import { VerificationEmail } from '../../emails/VerificationEmail';
import { ResetPassword } from '../../emails/ResetPassword';
import { MessageOnPasswordChange } from '../../emails/MessageOnPasswordChange';
// import { google } from 'googleapis';
// const OAuth2 = google.auth.OAuth2;

export const sendEmail = async ({ email, emailType, userId, username }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        }

        // const oauth2Client = new OAuth2(
        //     process.env.CLIENT_ID, // ClientID
        //     process.env.CLIENT_SECRET, // Client Secret
        //     process.env.REDIRECT_URL // Redirect URL
        // );
        // oauth2Client.setCredentials({
        //     refresh_token: process.env.REFRESH_TOKEN,
        // });

        // const accessToken = oauth2Client.getAccessToken();

        // // Looking to send emails in production? Check out our Email API/SMTP product!
        // var transport = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         type: "OAuth2",
        //         user: process.env.EMAIL,
        //         clientId: process.env.CLIENT_ID,
        //         clientSecret: process.env.CLIENT_SECRET,
        //         refreshToken: process.env.REFRESH_TOKEN,
        //         accessToken: accessToken,
        //     },
        // });

        // const mailOptions = {
        // from: 'nomanmujahid.cs@gmail.com',
        // to: email,
        // subject: emailType === 'VERIFY' ? "Verify your email" : 'Reset your password',
        //     html: emailType === 'VERIFY' ? verificationEmailResponse : resetEmailResponse,
        // }

        // const mailResponse = await transport.sendMail(mailOptions).catch(err => {
        //     console.error("SMTP Error:", err);
        //     throw err;
        // });

        // console.log(mailResponse, 'mailResponse')

        const subject = emailType === 'VERIFY' ? `${username + " " }, Please verify your email address` :
                        emailType === 'RESET' ? `${username + " " }, Reset your Slaythebear.com password` :
                        emailType === 'CHANGE_PASSWORD' ? `${username + " " }, your Slaythebear.com password has been changed` : "Hey, this email is from Slaythebear";
       
        const body = emailType === 'VERIFY' ?  <VerificationEmail username={username} hashedToken={hashedToken} />:
                        emailType === 'RESET' ? <ResetPassword username={username} hashedToken={hashedToken} /> :
                        emailType === 'CHANGE_PASSWORD' ? <MessageOnPasswordChange username={username} /> : "<p>This is the message body</p>"


        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_SENDDER_EMAIL,
            to: email,
            subject: subject,
            react: body
        });

        if (error) {
            return error
        }

        return data;

    } catch (err) {
        throw new Error(err.message)
    }
}