"use client";

import { Container, Header, Navbar } from "@medlinked/components";
import { TokenData } from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { ContentContainer } from "./styles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <title>MedLinked - Agenda</title>
      </head>
      <ContentContainer>
        <Navbar />
        <Header username={jwt_decode<TokenData>(Cookies.get("token")!).nome}>
          <Container>{children}</Container>
        </Header>
      </ContentContainer>
    </>
  );
}
