"use client";

import { Container, Header, Navbar } from "@medlinked/components";
import { TokenData } from "@medlinked/types";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { ContentContainer } from "./styles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const token = localStorage.getItem("token");
  const tokenData: TokenData = jwt_decode<TokenData>(token || "");

  if (!token || Date.now() >= tokenData.exp * 1000) {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <>
      <head>
        <title>MedLinked - Agenda</title>
      </head>
      <body>
        <ContentContainer>
          <Navbar />
          <Header username={tokenData.nome}>
            <Container>{children}</Container>
          </Header>
        </ContentContainer>
      </body>
    </>
  );
}
