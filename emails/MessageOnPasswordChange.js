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

export const MessageOnPasswordChange = ({ username }) => {

  const url = baseUrl + '/login';

  return (
    <Html>
      <Head />
      <Preview>Slaythebear</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.72b4bc1d.png&w=256&q=75`}
            width="40"
            height="33"
            alt="slaythebear"
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              We wanted to let you know that your password has been successfully changed.
              If you didn&apos;t make this change or suspect any unauthorized access to your account,
              please contact us immediately.
            </Text>
            <Text style={text}>
              You can securely access your account by clicking the button below.
            </Text>
            <Button style={button} href={url}>
              Login Slaythebear
            </Button>
            <Text style={text}>Thank you</Text>
            <Text style={text}>The Slaythebear Team</Text>
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
