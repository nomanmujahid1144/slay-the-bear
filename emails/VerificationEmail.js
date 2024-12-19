import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.DOMAIN ? `${process.env.DOMAIN}` : "";

export const VerificationEmail = ({ username, hashedToken }) => {

  const url = baseUrl + '/verifyemail?token=' + hashedToken;

  return (
    <Html>
      <Head />
      <Preview>Slaythebear Verify your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://react-email-demo-hich02t6q-resend.vercel.app/static/dropbox-logo.png`}
            width="40"
            height="33"
            alt="slaythebear"
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Welcome to Slaythebear! To complete your sign-up process and verify your email address,
              please click the button below. This will confirm that this email belongs to you and activate your account:
            </Text>
            <Button style={button} href={url}>
              Verify Email
            </Button>
            <Text style={text}>
              If the button doesn&apos;t work, please copy the link below
              and paste it into your browser to complete the verification process.
            </Text>
            <Text>
              {url}
            </Text>
            <Text style={text}>Happy Slaythebear!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
